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


var qs = require('querystringify');


var fetch = global.fetch;


// Cache

var dataByUrl = new Map();

function fetchCachedJSON(url, options) {
  if (dataByUrl.has(url)) {
    return Promise.resolve(dataByUrl.get(url));
  } else {
    return fetchJSON(url, options)
      .then(data => {
        dataByUrl.set(url, data);
        return data;
      });
  }
}

function fetchJSON(url, options) {
  return fetch(url, options).then(response => response.json());
}


// Data manipulation

var CHARTS_URL = `${API_BASE_URL}/charts`;


function deleteChart(slug) {
  var url = `${CHARTS_URL}/${slug}/delete`;
  return fetch(url);
  // return fetch(url, {credentials: 'core'});
}


function fetchAccount(slug) {
  return fetchCharts().then(charts => charts.filter(chart => chart.owner.slug === slug));
}


function fetchChart(slug) {
  return fetchCharts().then(charts => charts.find(chart => chart.slug === slug));
}


function fetchCharts(query = {}) {
  var url = CHARTS_URL;
  if (Object.keys(query).length) {
    query = {ownerSlug: query.owner}; // Rename route params to endpoint GET params.
    url += qs.stringify(query, true);
  }
  return fetchCachedJSON(url).then(data => data.charts);
}


// Authentication

function login() {
  var url = `${API_BASE_URL}/login`;
  return fetchJSON(url, {credentials: 'cors'});
}


function logout() {
  var url = `${API_BASE_URL}/logout`;
  return fetchJSON(url, {credentials: 'cors'});
}


function register(username, password, email) {
  var url = `${API_BASE_URL}/register`;
  var formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('email', email);
  return fetchJSON(url, {body: formData, method: 'post'});
}


module.exports = {deleteChart, fetchAccount, fetchChart, fetchCharts, login, logout, register};
