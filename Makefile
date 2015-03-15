DEV_SERVER_BIN=./node_modules/.bin/webpack-dev-server


all: check

build-prod: install-npm
	./node_modules/.bin/webpack -p --config webpack-production.config.js

check: eslint

ctags:
	ctags --recurse=yes --exclude=node_modules .

dev-server:
	@($(DEV_SERVER_BIN) || echo "Run \"npm install\" first.") && exit 1
	$(DEV_SERVER_BIN) --content-base public

eslint:
	./node_modules/.bin/eslint js

install-npm:
	npm install

update-npm-modules:
	[ -f ./node_modules/.bin/npm-check-updates ] || npm install
	./node_modules/.bin/npm-check-updates -u; npm install
