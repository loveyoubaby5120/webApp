import mysql.connector as connector;
import json
import requests
import time
from datetime import datetime,timedelta,date
from html.parser import HTMLParser

end = datetime(year=2016,month=6,day=1)
fro = end-timedelta(hours=1)

from_h = int(fro.timestamp())
end_h = int(end.timestamp())

cnx = connector.connect(user='root',password='weixinweixin',host='127.0.0.1',database='weixin')
cursor = cnx.cursor()

cursor.execute('select url,id from article_profile')
lis = cursor.fetchall()
hp = HTMLParser()

for url,aid in lis:
    url = hp.unescape(url)
    cursor.execute('update article_profile set url = %s where id = %s',[url,aid])
    cnx.commit()

cursor.close()
cnx.close()



