
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
import queue
ua = UserAgent()

targetURL = 'https://hls.ustreamix.com/RTV-PINK.m3u8?token=d4e-18c-d3c-6f8-31b-15d-da3-7b0-eae-e40-60a-e81-ecd-322-d29-7a1-826-4df-1e9-77c-c6e-0'
# https://hls.ustreamix.com/RTV-PINK.m3u8?token=850-830-b86-77d-0ba-49d-159-3a2-e80-853-5f9-96e-302-781-b5b-bbe-d87-516-98f-9cb-2fb-a
headers = {
    "User-Agent": ua.random,
    'Origin': 'https://ustreamyx.com'
}

has_download_list=set()

def get_down():
    res = requests.get(targetURL, headers=headers)
    # print(res.text)

    pattern = re.compile(r'http[s]?://.*\.png')
    tsList = pattern.findall(res.text)
    # print(tsList)
    print('爬取ts地址成功 {}--个'.format(len(tsList)))
    if not len(tsList):
        raise RuntimeError('没有抓到ts,请检查m3u8地址')
    for download_url in tsList:
        q.put(download_url)

q = queue.Queue()

start = time.time()

threading_is_start = False

def fetch_ts_func(q):
    while True:
        try:
            # 不阻塞的读取队列数据
            download_url = q.get_nowait()
            i = q.qsize()
            download_url = download_url.strip()
            print(r"当前线程 -----{0}".format(threading.currentThread().name))
            folder = os.path.join('m3u8')
            fullPath = folder + '/' + download_url.split(r'/')[-1]+'.ts'
            # if not os.path.exists(fullPath):
            #     os.makedirs(fullPath)
            if download_url in has_download_list:
                print(r"{0} 下载过了。。跳过".format(download_url))
                break
            r = requests.get(download_url, headers=headers).content
            with open(fullPath, 'wb') as file:
                file.write(r)
            print(r"{0} 下载完成 {1}".format(download_url, i))
            has_download_list.add(download_url)
        except BaseException:
            print("队列已空")
            break
      


# 可以开多个线程测试不同效果
while True:
    try:
        get_down()
        if not threading_is_start:
            t1 = threading.Thread(target=fetch_ts_func,
                                  args=(q, ), name="child_thread_1")
            t2 = threading.Thread(target=fetch_ts_func,
                                  args=(q, ), name="child_thread_2")
            t3 = threading.Thread(target=fetch_ts_func,
                                  args=(q, ), name="child_thread_3")
            t4 = threading.Thread(target=fetch_ts_func,
                                  args=(q, ), name="child_thread_3")
            t1.start()
            t2.start()
            t3.start()
            t4.start()
            t1.join()
            t2.join()
            t3.join()
            t4.join()
    except BaseException as e:
        print(e ,'-------爬取中断。。。。。')
        break
    finally:
        time.sleep(5)
