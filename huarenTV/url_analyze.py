from pyquery import PyQuery
import requests
import random
import threading
import time,re
from concurrent import futures
from fake_useragent import UserAgent
ua = UserAgent()

targetURL='http://www.huaren.tv/sportvs/221905705643016'

def analyze_page() :
    headers = {'User-Agent': ua['random']}
    res=requests.get(targetURL,headers=headers)

    homeTteam=PyQuery(res.content.decode()).find('.live-play-head-info-inner .team_name').eq(0).text()
    visitingTeam=PyQuery(res.content.decode()).find('.live-play-head-info-inner .team_name').eq(1).text()
   
    leagueName=PyQuery(res.content.decode()).find('.live-play-head-info-desc span').text()
    reg=re.compile(r'"m3u8:live","http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+"',re.M )
    m3u8URL=reg.findall(res.text)
    if len(m3u8URL):
        m3u8URL=m3u8URL[0].split(',')[1].replace(r'"','')
    print(homeTteam,visitingTeam,leagueName,m3u8URL)
 


# def getList():




analyze_page()
# getList()