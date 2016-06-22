from gevent import monkey;
monkey.patch_all()
import mysql.connector as connector;
import gevent
import json
import random
import requests
import time
import queue

myqueue = queue.Queue()
cnx = connector.connect(user='root',password='weixinweixin',host='127.0.0.1',database='weixin')
cursor = cnx.cursor()

def insert_data(ctime,aid,read_num,zan_num):
    cursor.execute('insert into read_num(read_num,time,article_id) values(%s,%s,%s)',[read_num,ctime,aid])
    cursor.execute('insert into zan_num(zan_num,time,article_id) values(%s,%s,%s)',[zan_num,ctime,aid])
    cursor.execute('update focus_article set clc_read = 1, clc_zan = 1 where article_id = %s',[aid])
    cnx.commit()

def data_query(url,aid):
    while True:
        try:
            time.sleep(1)
            ctime = int(time.time())
            #r = requests.post("http://182.236.163.121:8099/wx/api.ashx?key=ch_578190611",data = {'url':url},timeout=10)
            r = requests.post("http://wxapi.51tools.info/wx/api.ashx?key=ch_578190611",data = {'url':url},timeout=10)
            j = r.json()
            if j['msg'] != 'succ' or j['data']['readnums'] == -1:
                continue
            else:
                insert_data(ctime,aid,j['data']['readnums'],j['data']['zannums'])
                return
        except:
            continue

def do_task():
    while myqueue.empty() == False:
        url,aid = myqueue.get()
        data_query(url,aid)
    return


select = """select article_id
            from focus_article
            where clc_read is null"""

cursor.execute(select)
lis = cursor.fetchall()
cursor.execute('select id from ban_gzh')
ban_lis = cursor.fetchall()


for aid, in lis:
    cursor.execute('select url,gzh_id from article_profile where id = %s',[aid])
    res = cursor.fetchall()
    if len(res) == 0:
        continue
    url,gid = res[0]
    if (gid,) in  ban_lis:
        continue
    myqueue.put((url,aid))


gevent.joinall([gevent.spawn(do_task) for i in range(3)])
#gevent.joinall([gevent.spawn(do_task) for i in range(10)])

cursor.close()
cnx.close()


