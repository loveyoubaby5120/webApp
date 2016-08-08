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
        sql = "SELECT id,url,zan_num from article_profile_copy where follow_index is null order by id desc limit 0,1000"
        cursor.execute(sql)
        row = cursor.fetchall()
        for r in row:
            
            id = r['id']
            url = r['url']
            zan_num = r['zan_num'] if r['zan_num'] else 0
            isUrl = url.find('idx=1')

            gaussian_list,follow_index = [],0


            if isUrl != -1:
                miu, sigma = 25, 10 # mean and standard deviation 
                s = np.random.normal(miu, sigma, 1)
                gaussian_list = s.tolist()
                if gaussian_list[0] <= 5:
                    follow_index = random.uniform(5, 10)

                elif gaussian_list[0] >= 70:
                    follow_index = random.uniform(50, 70)

                else:
                    follow_index = gaussian_list[0]
            else:
                miu, sigma = 10, 5 # mean and standard deviation 
                s = np.random.normal(miu, sigma, 1)
                gaussian_list=s.tolist()
                if gaussian_list[0] <= 5:
                    follow_index = random.uniform(5, 10)

                elif gaussian_list[0] >= 40:
                    follow_index = random.uniform(30, 40)

                else:
                    follow_index = gaussian_list[0]

            follow_index = round(follow_index,2)

            sql2 = "UPDATE article_profile_copy SET follow_index=%f,follow_num=%f WHERE id=%d" % (follow_index, (follow_index*zan_num), id)

            print(id)

            try:
                cursor.execute(sql2)
                conn.commit()
            except Exception as e:
                errorArr.append(id)
                print(id)
                raise e
    except Exception as e:
        raise e
    finally:
        # print(errorArr)
        conn.close()


if __name__ == '__main__':
    main()
