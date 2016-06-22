#! /bin/bash
python3 /home/weixin_info/crawler/get_new_article.py && \
python3 /home/weixin_info/crawler/get_content.py && \
python3 /home/weixin_info/crawler/get_focus_article.py && \
python3 /home/weixin_info/crawler/get_read_zan_num.py && \
python3 /home/weixin_info/crawler/get_article_influence.py && \
python3 /home/weixin_info/crawler/get_gzh_influence.py
