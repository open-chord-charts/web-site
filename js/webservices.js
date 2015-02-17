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


// HTTP functions

function xhrPromise(url, options) {
  options = options || {};
  if (options.useCache && xhrPromise.cache[url]) {
    return Promise.resolve(xhrPromise.cache[url]);
  }
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.onload = function() {
      if (req.status === 404) {
        reject(new Error('not found'));
      } else {
        var data = JSON.parse(req.response);
        resolve(data);
        if (options.useCache) {
          xhrPromise.cache[url] = data;
        }
      }
    };
    req.open(options.formData ? 'POST' : 'GET', url);
    if(options.beforeSend) {
      options.beforeSend(req);
    }
    req.send(options.formData);
  });
}
xhrPromise.cache = {};


// Data manipulation

var CHARTS_URL = `${global.appconfig.apiBaseUrl}/charts`;


function deleteChart(slug) {
  var url = `${CHARTS_URL}/${slug}/delete`;
  return xhrPromise(url, {beforeSend: (req) => { req.withCredentials = true; }});
}


function fetchAccount(slug) {
  return fetchCharts().then(
    (charts) => charts.filter((chart) => chart.owner.slug === slug)
  );
}


function fetchChart(slug) {
  return fetchCharts().then(
    (charts) => charts.find((chart) => chart.slug === slug)
  );
}


function fetchCharts(query = null) {
  var url = CHARTS_URL;
  var queryString = '';
  if (query && query.ownerSlug) {
    queryString += `ownerSlug=${query.ownerSlug}`;
  }
  if (queryString) {
    url += `?${queryString}`;
  }
  return xhrPromise(url, {useCache: true}).then((res) => {
    return res.charts;
  });
}


// Authentication

function login() {
  var url = `${global.appconfig.apiBaseUrl}/login`;
  return xhrPromise(url, {beforeSend: (req) => { req.withCredentials = true; }});
}


function logout() {
  var url = `${global.appconfig.apiBaseUrl}/logout`;
  return xhrPromise(url, {beforeSend: (req) => { req.withCredentials = true; }});
}


function register(username, password, email) {
  var url = `${global.appconfig.apiBaseUrl}/register`;
  var formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('email', email);
  return xhrPromise(url, {formData: formData});

}


module.exports = {deleteChart, fetchAccount, fetchChart, fetchCharts, login, logout, register};
