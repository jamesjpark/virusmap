from bs4 import BeautifulSoup
import requests
import csv
from datetime import datetime
import json
from flask import Flask
from threading import Timer
from flask import jsonify
from flask_cors import CORS
import datetime

def scrape():
    source = requests.get('https://www.livescience.com/texas-coronavirus-updates.html')

    text = source.content

    soup = BeautifulSoup(text, 'html.parser')


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

    soup = BeautifulSoup(text, 'html.parser')
    article = soup.find(id="article-body")

    arr2 = article.find_all('p')
    sentence = arr2[0].text
    print(sentence)
    split = sentence.split("Texas now has ")
    split2 = split[1].split("confirmed")
    total = split2[0]
    sp = sentence.split("least ")
    sp2 = sp[1].split(" people")
    death = sp2[0]

    totalArr = []
    totalArr.append(total)
    totalArr.append(death)

    return totalArr

now = datetime.datetime.now().hour
start = now

case = scrape()
total = totalNum()



application = Flask(__name__)
CORS(application)


@application.route("/")
def my_index():
    if (datetime.datetime.now().hour - start) > 12:
        caseArr = scrape()
    elif (datetime.datetime.now().hour - start) < 0:
        caseArr = scrape()
    else:
        caseArr = case
    return jsonify(caseArr)


@application.route("/total")
def index():
    if (datetime.datetime.now().hour - start) > 12:
        totalArr = totalNum()
    elif (datetime.datetime.now().hour - start) < 0:
        totalArr = totalNum()
    else:
        totalArr = total
    return jsonify(totalArr)

if __name__ == "__main__":
    application.debug = True
    application.run()
