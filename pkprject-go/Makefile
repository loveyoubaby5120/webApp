RED=\033[0;31m
NC=\033[0m

watch_tpl:
	echo 'please run ./node_modules/.bin/webpack --progress --colors --watch --config=tpl/build/<your webpack project config>'
.PHONY: watch_tpl

webpack:
	./node_modules/.bin/webpack --config=tpl/build/saas/entrance.webpack.config.js --bail && \
	./node_modules/.bin/webpack --config=tpl/build/saas/gaokao.webpack.config.js --bail && \
	./node_modules/.bin/webpack --config=tpl/build/saas/survey.webpack.config.js --bail && \
	./node_modules/.bin/webpack --config=tpl/build/saas/questionnaireClient.webpack.config.js --bail
