/*
Open Chord Charts -- Database of free chord charts
By: Christophe Benz <contact@openchordcharts.org>

Copyright (C) 2012, 2013, 2014, 2015 Christophe Benz
https://github.com/openchordcharts/

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


const PT = React.PropTypes;


var appState = PT.shape({
  loading: PT.oneOfType([
    PT.bool,
    PT.string,
  ]),
  loggedInUsername: PT.string,
});


var chart = PT.shape({
  key: PT.string.isRequired,
  composers: PT.arrayOf(PT.string),
  compositionYear: PT.number,
  genre: PT.string,
  interpretations: PT.arrayOf(PT.shape({
    externalLinks: PT.arrayOf(PT.string),
    interpreterName: PT.string,
    year: PT.number,
  })),
  owner: PT.shape({
    slug: PT.string.isRequired,
    username: PT.string.isRequired,
  }).isRequired,
  parts: PT.object.isRequired,
  slug: PT.string.isRequired,
  structure: PT.arrayOf(PT.string).isRequired,
  title: PT.string.isRequired,
});


var selectedBar = PT.shape({
  partIndex: PT.number.isRequired,
  partName: PT.string.isRequired,
});


module.exports = {appState, chart, selectedBar};
