import mysql.connector as connector;
import json
import requests
import time
from datetime import datetime,timedelta,date

end = datetime(year=2016,month=6,day=1)
fro = end-timedelta(hours=1)

from_h = int(fro.timestamp())
end_h = int(end.timestamp())

cnx = connector.connect(user='root',password='',host='127.0.0.1',database='weixin')
cursor = cnx.cursor()

cursor.execute('update zan_num set time=%s where time between %s and %s',[end_h,from_h,end_h])
cnx.commit()

cursor.close()
cnx.close()



