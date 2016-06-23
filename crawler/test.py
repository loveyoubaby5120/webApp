import  mysql.connector as connector
import requests
import json

cnx = connector.connect(user='root',password='',host='127.0.0.1',database='weixin')
cursor = cnx.cursor()

cursor.execute('select url from article_profile where id = 1692')
url = cursor.fetchall()[0][0]

r = requests.post("http://wxapi.51tools.info/wx/api.ashx?key=ch_578190611",data= {'url':url})
print(r.text)
r = requests.post("http://wxapi.51tools.info/wx/api.ashx?key=ch_578190611",json= {'url':url})
print(r.text)
#cursor.execute('select url from article_profile where id = 2249')
#url = cursor.fetchall()[0][0]

#r = requests.post("http://wxapi.51tools.info/wx/api.ashx?key=ch_578190611",data = json.dumps({'url':url}))
#print(r.text)
#cursor.execute('select url from article_profile where id = 3377')
#url = cursor.fetchall()[0][0]

#r = requests.post("http://wxapi.51tools.info/wx/api.ashx?key=ch_578190611",data = {'url':url})
#print(r.text)
