#!/bin/bash

echo -e 'start add';git add .;echo -e '\nend add\nstart commit';git commit -m 'log';echo -e '\nend commit\nstart push';git push;echo -e '\nend push\n'