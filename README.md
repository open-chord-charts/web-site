# Open Chord Charts Web Site

[![Dependency Status](https://david-dm.org/openchordcharts/openchordcharts-web-site.svg)](https://david-dm.org/openchordcharts/openchordcharts-web-site)
[![devDependency Status](https://david-dm.org/openchordcharts/openchordcharts-web-site/dev-status.svg)](https://david-dm.org/openchordcharts/openchordcharts-web-site#info=devDependencies)

## Presentation

Open Chord Charts is a project aiming to provide free (as in free software) chord charts to musicians,
editable in a collaborative way.

This software runs the web site of the Open Chord Charts project.

## Build for production

    npm run build:prod

This will write the build in the `dist` directory and generate a `stats.json` file (see analyze below).

To remove the generated files:

    npm run clean

## Analyze webpack modules

Requires [jq](http://stedolan.github.io/jq/).

    npm run analyze
