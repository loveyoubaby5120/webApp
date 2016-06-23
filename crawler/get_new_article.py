import requests
from time import sleep
import re
import mysql.connector as connector
import json
from html.parser import HTMLParser

def unescape(s):
    return re.sub(r'\\(.)','\g<1>',s)

cnx = connector.connect(user ='root',password='',database = 'weixin',host ='127.0.0.1')
cursor =  cnx.cursor()
hp =  HTMLParser()

insert = """insert into article_profile(url,gzh_id,pub_time,title,cover,digest)
            values(%s,%s,%s,%s,%s,%s)"""

def insert_data(url,gzh_id,pub_time,title,cover,digest):
    url  = hp.unescape(url)
    select_2 = """select * from article_profile where url = %s"""
    global cursor
    cursor.execute(select_2,[url])
    if len(cursor.fetchall()) == 0:
        cursor.execute(insert,[url,gzh_id,time,title,cover,digest])
        cnx.commit()
    return;


select = """select id,biz from gzh_profile"""
cursor.execute(select)
lis = cursor.fetchall()

select_1 = """select id from ban_gzh"""
cursor.execute(select_1)
ban_lis  = cursor.fetchall()
cnt = 0

for gzh_id,biz in lis:
    if (gzh_id,) in ban_lis:
        continue
    sleep(0.5)
    r = requests.post('http://wxapi.51tools.info/wx/apibiz.ashx?key=ch_578190611',data={'biz':biz})
    text = unescape(r.text)
    text = unescape(text)
    text = unescape(text)
    text = hp.unescape(text)
    jso = json.loads(text)
    cnt += 1
    if 'list' in jso:
        for i in jso['list']:
            if 'app_msg_ext_info' in i:
                time =  i['comm_msg_info']['datetime']
                url = i['app_msg_ext_info']['content_url']
                title = i['app_msg_ext_info']['title']
                cover = i['app_msg_ext_info']['cover']
                digest = i['app_msg_ext_info']['digest']
                insert_data(url,gzh_id,time,title,cover,digest)
                if i['app_msg_ext_info']['is_multi'] == 1:
                    for j in i['app_msg_ext_info']['multi_app_msg_item_list']:
                        url = j['content_url']
                        title = j['title']
                        cover = j['cover']
                        digest  = j['digest']
                        insert_data(url,gzh_id,time,title,cover,digest)
    update =  """update focus_gzh  set clc = 1  where gzh_id = %s"""
    cursor.execute(update,[gzh_id])
    cnx.commit()

cursor.close()
cnx.close()
