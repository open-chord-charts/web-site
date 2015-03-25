all: check

build-prod: install-npm
	./node_modules/.bin/webpack -p --config webpack-production.config.js

check: eslint

ctags:
	ctags --recurse=yes --exclude=node_modules .

eslint:
	./node_modules/.bin/eslint js

install-npm:
	npm install
