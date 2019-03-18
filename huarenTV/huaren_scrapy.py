
import requests
import random
import threading
import time
import re,sys
import json
import moment
from concurrent import futures
from fake_useragent import UserAgent
from datetime import datetime
ua = UserAgent()
sys.path.append("./")

targetURL = 'http://www.huaren.tv/sports'
baseURL = 'http://www.huaren.tv'


def getLiveList():
    resultList = list()
    headers = {'User-Agent': ua['random']}
    res = requests.get(targetURL, headers=headers)

    # 匹配js中的一段代码获取真实数据
    reg = re.compile(r'."sportsclass".+')
    jsval = reg.findall(res.text)
    if len(jsval):
        # 去掉句末分号
        data = json.loads(jsval[0].replace(';', ""))

        # 比赛分类列表
        sportsclass = data.get("sportsclass")

        # 直播列表（含即将直播）
        live_enter = data.get("live_enter")
        for key in live_enter:
            for aclass in sportsclass:
                if str(aclass.get('tid')) == str(key) and not int(key) == 0:
                    for play in live_enter.get(key):
                        # 新的直播信息组装
                        newLive = {}
                        newLive['startTime'] = moment.unix(
                            play.get('time')+8*3600, utc=True).format("YYYY-MM-DD HH:mm:ss")
                        newLive['hostTeam'] = play.get('team')[0]

                        # 客队没有的情况
                        if len(play.get('team')) > 1:
                            newLive['vistingTeam'] = play.get('team')[1]
                        else:
                            newLive['vistingTeam'] = ""

                        # url 没有的情况
                        if play.get("url"):
                            newLive['url'] = play.get("url")
                        else:
                            newLive['url'] = ''

                        newLive['cate'] = play.get('cate')  # 联赛名
                        newLive['className'] = aclass.get('name')  # 赛事分类名称
                        newLive['play_status'] = play.get(
                            'play_status')  # 播放状态  1.未开始 2.比赛中 3.已结束
                        resultList.append(newLive)

    else:
        print("该页面没有匹配到任何可用用数据")
    return resultList


print(getLiveList())
