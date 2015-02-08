all: check

build-prod: install-npm-prod clean-js-dist
	./node_modules/.bin/webpack -p --config webpack-production.config.js

check: jshint

clean: clean-js-dist

clean-js-dist:
	rm -rf dist

ctags:
	ctags --recurse=yes --exclude=dist --exclude=node_modules .

install-npm:
	npm install

install-npm-prod:
	npm install --production

jshint:
	./node_modules/.bin/jsxhint js

update-npm-modules:
	[ -f ./node_modules/.bin/npm-check-updates ] || npm install
	./node_modules/.bin/npm-check-updates -u; npm install
