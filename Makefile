STATIC_DIR=openchordcharts_web_site/static

all: check build-dev

build-dev: install
	./node_modules/.bin/gulp dev

build-prod: install
	./node_modules/.bin/gulp prod

check: jshint

clean: clean-js-dist

clean-js-dist:
	./node_modules/.bin/gulp clean:dist

ctags:
	ctags --recurse=yes --exclude=node_modules --exclude=${STATIC_DIR}/dist .

install:
	npm install

jshint: clean-js-dist
	./node_modules/.bin/jsxhint ${STATIC_DIR}/js | sed 's/ line \([0-9]\+\), col \([0-9]\+\), /\1:\2:/'

upgrade:
	npm-check-updates -u; npm install

update-i18n: update-i18n-js

watch:
	./node_modules/.bin/gulp watch
