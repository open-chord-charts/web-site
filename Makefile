STATIC_DIR=static

all: check test

build-dev:
	./node_modules/.bin/gulp dev

build-prod:
	./node_modules/.bin/gulp prod

check: jshint

check-syntax-errors: clean-pyc
	@# This is a hack around flake8 not displaying E910 errors with the select option.
	test -z "`flake8 --first | grep E901`"

clean: clean-js_dist

clean-js_dist:
	./node_modules/.bin/gulp clean:dist

ctags:
	ctags --recurse=yes --exclude=node_modules --exclude=openfisca_web_ui/static/dist .

jshint: clean-js_dist
	./node_modules/.bin/jsxhint ${STATIC_DIR}/js | sed 's/ line \([0-9]\+\), col \([0-9]\+\), /\1:\2:/'

update-i18n: update-i18n-js

update-i18n-js:
	./openfisca_web_ui/scripts/extract_i18n_json_messages.py --all --no-delete-regex='.+:.+'

watch:
	./node_modules/.bin/gulp watch
