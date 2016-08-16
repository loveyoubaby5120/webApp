import mysql.connector as connector;
import requests
import time
cnx = connector.connect(user='root',password='',host='127.0.0.1',database='weixin')
cursor = cnx.cursor()

select = """select url,id from article_profile where file_name is null order by id desc"""

update = """update article_profile
            set file_name = %s
            where id = %s"""

cursor.execute(select)
lis = cursor.fetchall()
print(len(lis))

for url,id in lis:
    if url == '':
        continue
    try:
        r = requests.get(url)
    except:
        print(url)
        break
    file_name = 'content/' + str(id)
    with open(file_name,'w') as f:
        f.write(url)
        f.write('\n')
        f.write(r.text)
    cursor.execute(update,[file_name,id])
    cnx.commit()

cursor.close()
cnx.close()



