all: check

build-prod: install-npm clean-js-dist
	./node_modules/.bin/webpack -p --config webpack-production.config.js

check: eslint

clean: clean-js-dist

clean-js-dist:
	rm -rf dist

ctags:
	ctags --recurse=yes --exclude=dist --exclude=node_modules .

eslint:
	./node_modules/.bin/eslint js

install-npm:
	npm install

update-npm-modules:
	[ -f ./node_modules/.bin/npm-check-updates ] || npm install
	./node_modules/.bin/npm-check-updates -u; npm install
