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
    source = requests.get('https://www.dshs.state.tx.us/news/updates.shtm#coronavirus', verify=False)

    text = source.content

    soup = BeautifulSoup(text, 'lxml')

    tbody = soup.find_all('tbody')



    arr = tbody[2].find_all('td')

    i = 0
    caseArr = []

    while i < len(arr):
        county = arr[i].text
        num = arr[i + 1].text
        death = arr[i + 2].text
        print(county)
        print(num)
        print()
        case = {
            "county": county,
            "number": num,
            "death" : death
        }
        caseArr.append(case)
        i += 3

    print(caseArr)
    # with open('corona-data.json', 'w') as outfile:
    #     json.dump(caseArr, outfile)

    # with open('logs/'+current_time+'corona-data.json', 'w') as outfile:
    #     json.dump(caseArr, outfile)
    return caseArr

def totalNum():
    source = requests.get('https://www.dshs.state.tx.us/news/updates.shtm#coronavirus', verify=False)

    text = source.content

    soup = BeautifulSoup(text, 'lxml')

    totalArr = []
    tbody = soup.find_all('tbody')
    arr2 = tbody[1].find_all('td')
    total = arr2[0].text
    totalArr.append(total)
    death = arr2[1].text
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
