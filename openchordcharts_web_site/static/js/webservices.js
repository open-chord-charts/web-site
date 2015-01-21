'use strict';


// HTTP functions

function xhrPromise(url, options) {
  options = options || {};
  if (options.useCache && xhrPromise._cache[url]) {
    return Promise.resolve(xhrPromise._cache[url]);
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
          xhrPromise._cache[url] = data;
        }
      }
    };
    req.open(options.formData ? 'POST' : 'GET', url, options.formData ? true : undefined);
    if(options.beforeSend) {
      options.beforeSend(req);
    }
    req.send(options.formData);
  });
}
xhrPromise._cache = {};


// Data manipulation

var CHARTS_URL = `${global.appconfig.apiBaseUrl}/charts`;


function deleteChart(slug) {
  var url = `${CHARTS_URL}/${slug}/delete`;
  return xhrPromise(url, {beforeSend: (req) => { req.withCredentials = true; }});
}


function fetchAccount(slug) {
  return fetchCharts().then((charts) => charts.filter((chart) => chart.owner.slug === slug));
}


function fetchChart(slug) {
  return fetchCharts().then(
    // TODO use Array.find
    (charts) => charts.filter((chart) => chart.slug === slug)[0]
  );
}


function fetchCharts(query) {
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
