import mysql.connector as connector
from datetime import datetime,timedelta

da = datetime.now() - timedelta(days=30)
time = int(da.timestamp())

cnx = connector.connect(user='root',password='weixinweixin',host='127.0.0.1',database='weixin')
cursor = cnx.cursor()
cursor.execute('truncate focus_article')
cnx.commit()
cursor.execute("""insert into focus_article(article_id)
                select id from article_profile where pub_time > %s""",[time])
cnx.commit()
cursor.close()
cnx.close()

