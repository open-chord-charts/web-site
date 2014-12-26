STATIC_DIR=openchordcharts_web_site/static

all: check build-dev

build-dev:
	./node_modules/.bin/gulp dev

build-prod:
	./node_modules/.bin/gulp prod

check: jshint

clean: clean-js_dist

clean-js_dist:
	./node_modules/.bin/gulp clean:dist

ctags:
	ctags --recurse=yes --exclude=node_modules --exclude=${STATIC_DIR}/dist .

jshint: clean-js_dist
	./node_modules/.bin/jsxhint ${STATIC_DIR}/js | sed 's/ line \([0-9]\+\), col \([0-9]\+\), /\1:\2:/'

update-i18n: update-i18n-js

watch:
	./node_modules/.bin/gulp watch
