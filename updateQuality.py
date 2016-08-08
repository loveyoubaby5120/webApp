import pymysql
import random
import numpy as np

def main():
    conn = pymysql.Connect(
        host='120.27.26.133',
        port=3306,
        user='root',
        password='admin123',
        db='wechatData',
        charset='utf8',
        use_unicode=True,
        cursorclass=pymysql.cursors.DictCursor
    )
    cursor = conn.cursor()
    errorArr = []
    try:
        sql = "SELECT id,url,zan_num from article_profile"
        cursor.execute(sql)
        row = cursor.fetchall()
        for r in row:
            
            id = r['id']
            url = r['url']
            zan_num = r['zan_num']

            isUrl = url.find('idx=1')
            if isUrl:
                miu, sigma = 25, 10 # mean and standard deviation 
                s = np.random.normal(miu, sigma, 1)
                gaussian_list = s.tolist()
                if gaussian_list <= 5:
                    gaussian_list = random.randint(5, 10)

                if gaussian_list >= 70:
                    gaussian_list = random.randint(50, 70)
            else:
                miu, sigma = 10, 5 # mean and standard deviation 
                s = np.random.normal(miu, sigma, 1)
                gaussian_list=s.tolist()
                if gaussian_list <= 5:
                    gaussian_list = random.randint(5, 10)

                if gaussian_list >= 40:
                    gaussian_list = random.randint(30, 40)

            print(gaussian_list);

            
            # sql2 = "UPDATE article_profile SET follow_index=%d,follow_num=%d WHERE id=%d" % (gaussian_list, (gaussian_list*zan_num), id)
            # try:
            #     cursor.execute(sql2)
            #     conn.commit()
            # except Exception as e:
            #     errorArr.append(id)
            #     print(id)
            #     raise e
    except Exception as e:
        raise e
    finally:
        print(errorArr)
        conn.close()


if __name__ == '__main__':
    main()
