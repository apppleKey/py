
import requests
import random
import threading
import time
import re
import sys
import os
import json
import moment
from concurrent import futures
from fake_useragent import UserAgent
from datetime import datetime
import threading
from bs4 import BeautifulSoup
import queue
import lxml
import execjs
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

caps = DesiredCapabilities.CHROME
caps['loggingPrefs'] = {'performance': 'ALL'}

ua = UserAgent()

headers = {
    "User-Agent": ua.random,
    'Origin': 'https://ustreamyx.com'
}


targetURL = 'https://ustreamyx.com/stream.php?id=rtv-pink&token=fe3-363-9e3-ec5-18d-7b7-eea-693-ff5-1d8-6f'
baseURL = 'https://ustreamyx.com'
targetURL = 'https://ssl.ustreamix.com'


def get_m3u8_page(url):
    # html = requests.get(url, headers=headers)
    browser = webdriver.Chrome(desired_capabilities=caps)

    browser.get(url)
    browser.find_element_by_id("video").click()
    # print(browser.find_element_by_id("video"))
    # print(browser.current_url)

    browser.get_screenshot_as_file("./test2.png")
    # time.sleep(10)
    browser.switch_to.window(browser.window_handles[1])
    browser.find_element_by_class_name("play-wrapper").click()
    with open('./二级.html', "w", encoding='utf-8') as f:
        f.write(browser.page_source)
    # regex = re.compile(r'<script>(?:.*?)<\/script>')
    # time.sleep(10)
    # jsList = regex.findall(browser.page_source)
    # print(browser.current_url)
    time.sleep(5)
    # browser.execute_script(r'console.log(11111111,stream);')
    # print(browser.get_log('browser'))
    browser_logs=browser.get_log('performance')
    logs = json.dumps(browser_logs)
    regex =re.compile(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
    jsList = regex.findall(logs)
    # print(jsList)
    for url in jsList:
        if "m3u8" in url:
            print(url.replace("\\",""))
            break
    # logs = [json.loads(log.get('message')).get('message') for log in browser_logs]
    with open('devtools-log.json', 'w',encoding='UTF-8') as f:
        # f.write(browser_logs )
        f.write(json.dumps( browser_logs, ensure_ascii=False ) )
    
    browser.close()
    # with open('devtools.json', 'w',encoding='UTF-8') as f:
    #     f.write(json.dumps( logs, ensure_ascii=False ) )
        # json.dump(logs, f)
    # for item in jsList:
    #     print(item)


def get_tvs():
    html = requests.get(targetURL, headers=headers)
    # 匹配script
    soup = BeautifulSoup(html.text, "lxml")
    links = soup.find_all("a")
    for link in links:
        if link.span:
            exstring = link.span.string
            url = baseURL+link.get('href')
            text = link.get_text().replace("Live!", "")
            text = link.get_text().replace(exstring, "")
            print(url, "---------", text)
            get_m3u8_page(url)
            # break


get_tvs()
# get_m3u8_page('https://ssl.ustreamix.com/embed.php?id=tv2-malaysia')

# regex=re.compile(r'<script[^>]*>(?:.*?)<\/script>')
# jsList=regex.findall(html.text)
# with open('text.html', 'wb') as file:
#      file.write(html.content)
# for  item in jsList:
#     print(item)
# with open('devtools-log.json',  encoding='utf-8') as f:
#     logs = f.readlines()
#     logs = json.dumps(logs)
#     print(type(logs))
#     f.close()
#     urlList=[]
#     # print(logs)
#     logs = json.dumps(logs)
#     regex =re.compile(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
#     jsList = regex.findall(logs)
#     print(jsList)
#     for url in jsList:
#         if "m3u8" in url:
#             print(url.replace("\\",""))
#             break
        # print(logs)
    # for obj in logs:
    #     print(obj)
    #     print(type(obj))
    #     obj=json.load(obj)
    #     if obj.get('method') :
    #         print(1)
    #         if obj.get('method')=="Network.requestWillBeSent":
    #             print(2)
    #             if obj.get('params') and type(obj.get('params'))==type({}): 
    #                 print(3)
    #                 if obj.get('params').get("request")  and type(obj.get('params').get("request"))==type({}):
    #                     print(4)
    #                     if obj.get('params').get("request").get("headers") and type(obj.get('params').get("request").get("headers"))==type({}):
    #                         if  obj.get('params').get("request").get("headers").get(url) :
    #                             url= obj.get('params').get("request").get("headers").get(url)
    #                             urlList.append(url)
# with open('url-list.json', 'w',encoding='UTF-8') as f:
#     f.write(json.dumps(urlList, ensure_ascii=False ) )