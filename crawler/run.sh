#!/bin/bash
python3 ./get_new_article.py && \
python3 ./get_content.py && \
python3 ./get_focus_article.py && \
python3 ./get_read_zan_num.py && \
python3 ./get_article_influence.py && \
python3 ./get_gzh_influence.py
