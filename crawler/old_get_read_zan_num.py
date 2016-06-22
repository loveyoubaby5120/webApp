from gevent import monkey;
monkey.patch_all()
import mysql.connector as connector;
import gevent
import json
import requests
import time

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
            r = requests.post("http://wxapi.51tools.info/wx/api.ashx?key=ch_578190611",data = {'url':url},timeout=10)
            j = r.json()
            if j['msg'] != 'succ' or j['data']['readnums'] == -1:
                continue
            else:
                insert_data(ctime,aid,j['data']['readnums'],j['data']['zannums'])
                return
        except:
            continue


select = """select article_id
            from focus_article
            where clc_read is null"""

cursor.execute(select)
lis = cursor.fetchall()
print(len(lis))

for aid, in lis:

    cursor.execute('select url from article_profile where id = %s',[aid])
    res = cursor.fetchall()
    if len(res) == 0:
        continue
    url, = res[0]
    data_query(url,aid)
#    task = gevent.spawn(data_query,url,aid)
#    task.start()
    #except:
    #    continue

cursor.close()
cnx.close()


