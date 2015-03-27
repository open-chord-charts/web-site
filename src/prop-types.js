/*
Open Chord Charts -- Database of free chord charts
By: Christophe Benz <contact@openchordcharts.org>

Copyright (C) 2012, 2013, 2014 Christophe Benz
https://gitorious.org/open-chord-charts/

This file is part of Open Chord Charts.

Open Chord Charts is free software; you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

Open Chord Charts is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

@flow weak
*/


'use strict';


var React = require('react');


var appState = React.PropTypes.shape({
  loading: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
  ]),
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
