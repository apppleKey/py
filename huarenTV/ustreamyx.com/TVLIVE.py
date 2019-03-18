
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
from selenium.webdriver.chrome.options import Options

caps = DesiredCapabilities.CHROME
caps['loggingPrefs'] = {'performance': 'ALL'}

ua = UserAgent()
headers = {
    "User-Agent": ua.random,
    'Origin': 'https://ustreamix.com'
}


baseURL = 'https://ustreamix.com'
targetURL = 'https://ssl.ustreamix.com'

chrome_options = Options()
chrome_options.add_argument('--headless') 
chrome_options.add_argument("window-size=1024,768") 
chrome_options.add_argument('--start-maximized') 
chrome_options.add_argument('user-agent="%s"'%ua.random) 
chrome_options.add_argument('log-level=3') 

##		        INFO = 0, 
##              WARNING = 1, 
##              LOG_ERROR = 2, 
##              LOG_FATAL = 3
##              default is 0

# 获取m3u8加密地址
def get_m3u8_page(url):
    # browser = webdriver.Chrome(executable_path=(r'C:\Program Files\Google\Chrome\Application\chromedriver.exe'), chrome_options=chrome_options) #指定浏览器路径
    browser = webdriver.Chrome(desired_capabilities=caps,options=chrome_options)
    try:
        # 进入第一个页面 模拟点击并跳转到播放页面
        browser.get(url)
        browser.find_element_by_id("video").click()

        # browser.get_screenshot_as_file("./test2.png")
        # 切换到第二个页面 播放
        browser.switch_to.window(browser.window_handles[1])
        browser.find_element_by_class_name("play-wrapper").click()
        # time.sleep(5)

        # 获取浏览器内部日志并匹配网址
        browser_logs = browser.get_log('performance')
        logs = json.dumps(browser_logs)
        regex = re.compile(
            r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
        jsList = regex.findall(logs)

        # 过滤有用的地址
        for url in jsList:
            if "m3u8" in url or "M3U8" in url:
                m3u8_url = url.replace("\\", "")
                print(m3u8_url)
                break
    except BaseException as e:
        print(e)
        return None
    browser.close()
    return m3u8_url


def scrapy_tv():
    html = requests.get(targetURL, headers=headers)
    # 匹配script
    soup = BeautifulSoup(html.text, "lxml")
    links = soup.find_all("a")
    tvList = list()
    startTime=time.time()
    faildTimes=0
    print(len(links))
    for link in links:
        if link.span:
            exstring = link.span.string
            url = baseURL+link.get('href')
            text = link.get_text().replace("Live!", "")
            text = link.get_text().replace(exstring, "")
            item_start_time=time.time()
            m3u8_url = get_m3u8_page(url)
            print(url, "---------", text)
            print(m3u8_url)
            item_end_time=time.time()
            interval=int(item_end_time-item_start_time)
            mm=int(interval/60)
            ss=interval%60
            print("本条m3u8抓取用时{0}分：{1}秒".format(mm,ss))
            print()
            if not m3u8_url:
                print('该地址获取失败')
                continue
            tvList.append({
                
                "url": url,
                'name': text,
                "m3u8_url": m3u8_url
            })
    endtime=time.time()
    total_interval=int(endtime-startTime)
    mm=int(total_interval/60)
    ss=total_interval%60
    print("本次抓取用时{0}分：{1}秒".format(mm,ss))

if __name__ == "__main__":
    scrapy_tv()
