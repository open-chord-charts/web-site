'use strict';

var React = require('react');


var appState = React.PropTypes.shape({
  loading: React.PropTypes.bool,
  loggedInUsername: React.PropTypes.string,
});


var chart = React.PropTypes.shape({
  key: React.PropTypes.string.isRequired,
  composers: React.PropTypes.arrayOf(React.PropTypes.string),
  compositionYear: React.PropTypes.number,
  genre: React.PropTypes.string,
  interpretations: React.PropTypes.arrayOf(React.PropTypes.shape({
    externalLinks: React.PropTypes.arrayOf(React.PropTypes.string),
    interpreterName: React.PropTypes.string,
    year: React.PropTypes.number,
  })),
  owner: React.PropTypes.shape({
    slug: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
  }).isRequired,
  parts: React.PropTypes.object.isRequired,
  slug: React.PropTypes.string.isRequired,
  structure: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  title: React.PropTypes.string.isRequired,
});


var selectedBar = React.PropTypes.shape({
  partIndex: React.PropTypes.number.isRequired,
  partName: React.PropTypes.string.isRequired,
});


module.exports = {appState, chart, selectedBar};
