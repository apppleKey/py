from bs4 import BeautifulSoup
import lxml
import queue
import re
import os
import sys
import random
import requests
import threading
import logging
import json
import hashlib
import urllib
import redis
import youtube_dl
import demjson
import time,datetime
from requests.exceptions import ConnectTimeout, ConnectionError, ReadTimeout, SSLError, MissingSchema, ChunkedEncodingError

# redis_client
redis_client = redis.StrictRedis(
    host="localhost", password="123456", port="6379", decode_responses=True, db=0)

# 日志模块
logger = logging.getLogger("AppName")
formatter = logging.Formatter('%(asctime)s %(levelname)-5s: %(message)s')
console_handler = logging.StreamHandler(sys.stdout)
console_handler.formatter = formatter
logger.addHandler(console_handler)
logger.setLevel(logging.INFO)

q = queue.Queue()   # url队列
page_q = queue.Queue()  # 页面

headers = {
    "x-origin": "https://www.youtube.com",
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36'
}
url = "https://www.youtube.com/playlist?list=PL8fVUTBmJhHIvtFOzBpiAYya4t6KCS0zE"

ydl = youtube_dl.YoutubeDL({'outtmpl': '%(id)s%(ext)s'})


def get_m3u8_url(page_url):
    try:
        with ydl:
            result = ydl.extract_info(
                page_url,
                download=False  # We just want to extract the info
            )

        if 'entries' in result:
            video = result['entries'][0]
        else:
            video = result

        video_url = video['url']
    except BaseException:
        video_url = ''
    return video_url


def get_team_name(page_url):
    res = requests.get(page_url).text
    reg = re.compile(r"<title>(.*?)YouTube", re.S)
    name1 = reg.findall(res)[0]
    name2 = name1.replace("VS", "vs")
    name3 = name2.replace("Vs", "vs")
    name4=name3.split('vs')
    return name4





def scrapy():
    try:
        html = requests.get(url, headers=headers).text
    except (ConnectTimeout, ConnectionError):
        print(u"不能访问youtube 请检查网络")
        os._exit(0)
    reg = re.compile(r'"url":"/watch\?v=(.*?)","webPageType"', re.S)

    result = reg.findall(html)
    count = 0
    for v in result:
        id = v.split('\\')[0]
        vurl = "https://www.youtube.com/watch?v=" + id
        team = get_team_name(vurl)
        if len(team) > 1:
            count+=1
            homeTeam = team[0]
            visitingTeam = team[1]
            print(vurl)
            redis_client.lpush("url_list", demjson.encode({'id': id, 'url': get_m3u8_url(vurl), 
                'homeTeam': homeTeam, 'vistingteam': visitingTeam, 
                "startTime":datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}))
        # 存档

    print(r"此次爬去视频列表总数"+str(len(result)))
    print(r"此次爬去视频列表有效总数"+str(count))
    #redis_client.lpush("live_list", demjson.encode({id:id,url:url,name:name,en_name:en_name}))


if __name__ == "__main__":
    redis_client.flushdb()  # 防止上次的数据污染
    count = 0
    while(True):
        count += 1
        print(r'---------第{}次爬取网页---------'.format(count))
        scrapy()
        time.sleep(120)
