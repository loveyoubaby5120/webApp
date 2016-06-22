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
            ctime = int(time.time())
            r = requests.post("http://182.236.163.121:8099/wx/api.ashx?key=ch_578190611",data = {'url':url},timeout=10)
            j = r.json()
            if j['msg'] != 'succ' or j['data']['readnums'] == -1:
                continue
                print(j)
            else:
                #insert_data(ctime,aid,j['data']['readnums'],j['data']['zannums'])
                return
        except:
            continue

all_task = 0
done_task = 0
def do_task():
    global done_task
    while True:
        time.sleep(1)
        if not myqueue.empty():
            print('do a task')
            url,aid = myqueue.get()
            data_query(url,aid)
            done_task += 1

def gen_task():
    cursor.execute("""select article_id
                from focus_article
                where clc_read is null""")
    lis = cursor.fetchall()
    global all_task
    all_task = len(lis)
    cnt = 0

    for aid, in lis:
        time.sleep(1)
        cnt += 1
        if cnt == 100:
            break
        print('gen a task')
        cursor.execute('select url from article_profile where id = %s',[aid])
        res = cursor.fetchall()
        if len(res) == 0:
            continue
        url, = res[0]
        myqueue.put((url,aid))

def check_done():
    global all_task, done_task
    while True:
        time.sleep(5)
        print('all:',all_task,'done:',done_task)
        if all_task == done_task:
            break
        else:
            continue

gen = gevent.spawn(gen_task)
gen.start()

for i in range(60):
    th = gevent.spawn(do_task)
    th.start()

gevent.joinall([gevent.spawn(check_done)])
#gevent.joinall([gevent.spawn(do_task) for i in range(10)])

cursor.close()
cnx.close()


