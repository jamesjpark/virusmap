from bs4 import BeautifulSoup
import requests
import csv
from datetime import datetime
import json
import flask
from threading import Timer
from flask import jsonify
from flask_cors import CORS
import datetime

def scrape():
    source = requests.get('https://www.livescience.com/texas-coronavirus-updates.html', verify=False)

    text = source.content

    soup = BeautifulSoup(text, 'lxml')


    article = soup.find(id="article-body")
    tbody = article.find_all('ul')
    arr = tbody[0].find_all('li')
    caseArr = []

    i = 0

    while i < len(arr):
        x = arr[i].text.split(" County: ")

        if len(x) == 1:
            num = 0
            county = arr[i].text.split(" County")[0]
        else:
            num = x[1]
            county = x[0]
        print(county)
        print(num)
        case = {
            "county": county,
            "number": num,
        }
        caseArr.append(case)
        i += 1
    # with open('corona-data.json', 'w') as outfile:
    #     json.dump(caseArr, outfile)

    # with open('logs/'+current_time+'corona-data.json', 'w') as outfile:
    #     json.dump(caseArr, outfile)
    return caseArr

def totalNum():
    source = requests.get('https://www.livescience.com/texas-coronavirus-updates.html', verify=False)

    text = source.content

    soup = BeautifulSoup(text, 'lxml')
    article = soup.find(id="article-body")

    arr2 = article.find_all('p')
    sentence = arr2[1].text
    split = sentence.split("Texas now has ")
    split2 = split[1].split("\xa0confirmed")
    total = split2[0]
    sp = sentence.split("least ")
    sp2 = sp[1].split(" people")
    death = sp2[0]
    print(total)
    print(death)

    totalArr = []
    totalArr.append(total)
    totalArr.append(death)

    return totalArr

now = datetime.datetime.now().hour
start = now
print(now)

case = scrape()
total = totalNum()



app = flask.Flask("__main__")
CORS(app)


@app.route("/")
def my_index():
    print(datetime.datetime.now().hour)
    print(start)
    if (datetime.datetime.now().hour - start) > 12:
        caseArr = scrape()
        print("SCRAPED!!")
    elif (datetime.datetime.now().hour - start) < 0:
        caseArr = scrape()
        print("SCRAPED!!")
    else:
        caseArr = case
    return jsonify(caseArr)


@app.route("/total")
def index():
    if (datetime.datetime.now().hour - start) > 12:
        totalArr = totalNum()
        print("SCRAPED!!")
    elif (datetime.datetime.now().hour - start) < 0:
        totalArr = totalNum()
        print("SCRAPED!!")
    else:
        totalArr = total
    return jsonify(totalArr)

app.run(debug=True)
