import time
import mysql.connector as connector
from math import log

coff_a = 0.5

cnx = connector.connect(user='root',password='',host='127.0.0.1',database='weixin')
cursor = cnx.cursor()

cursor.execute('select article_id from focus_article')
art = cursor.fetchall()

for aid, in art:
    cursor.execute('select max(read_num) from read_num where article_id = %s',[aid])
    read_num, = cursor.fetchall()[0]
    cursor.execute('select max(zan_num) from zan_num where article_id = %s',[aid])
    zan_num, = cursor.fetchall()[0]
    if read_num == None or zan_num == None or read_num < 0 or zan_num < 0:
        continue
    if read_num == 0:
        read_num += 1
    if zan_num == 0:
        zan_num += 1
    quality = coff_a * log(read_num) + (1-coff_a) * log(zan_num)
    atime = int(time.time())
    cursor.execute('insert into article_influence(time,article_id,quality) values(%s,%s,%s)',[atime,aid,quality])
    cnx.commit()

cursor.close()
cnx.close()


