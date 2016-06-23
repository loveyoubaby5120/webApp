import time
import mysql.connector as connector
from math import log,exp
from datetime import date,timedelta
from operator import itemgetter

coff_b = 1

cnx = connector.connect(user='root',password='',host='127.0.0.1',database='weixin')
cursor = cnx.cursor()

cursor.execute('select id,type from gzh_profile')
gzh_list = cursor.fetchall()

gzh_ord = []

for gzh_id,gzh_ty, in gzh_list:
    cursor.execute('select id from article_profile where gzh_id = %s',[gzh_id])
    article_list = cursor.fetchall()
    w_index = 0
    for aid, in article_list:
        cursor.execute('select max(quality) from article_influence where article_id = %s',[aid])
        quality = cursor.fetchall()[0][0]
        if quality == None:
            continue
        cursor.execute('select pub_time from article_profile where id = %s',[aid])
        pub = cursor.fetchall()[0][0]
        delta = date.fromtimestamp(pub) - date.today()
        w_index += quality * exp(coff_b * delta.days)
    cursor.execute('insert into gzh_influence(time,gzh_id,w_index) values(%s,%s,%s)',[int(time.time()),gzh_id,w_index])
    cnx.commit()
    gzh_ord.append((gzh_id,w_index,gzh_ty))


cursor.execute('select count(*) from gzh_type')
type_all = cursor.fetchall()[0][0]
type_rank=[1 for x in range(type_all+1)]

gzh_ord.sort(key=itemgetter(1),reverse = True)
for index,item in enumerate(gzh_ord,start=1):
    cursor.execute('insert into gzh_rank(time,gzh_id,rank) values(%s,%s,%s)',[int(time.time()),item[0],index])
    cursor.execute('insert into gzh_type_rank(time,gzh_id,rank,type) values(%s,%s,%s,%s)',[int(time.time()),item[0],type_rank[item[2]],item[2]])
    cnx.commit()
    type_rank[item[2]] += 1

cursor.close()
cnx.close()

