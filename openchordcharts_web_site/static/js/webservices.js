'use strict';


// HTTP functions

function getJSON(url, options) {
  options = options || {};
  if (options.useCache && getJSON._cache[url]) {
    return Promise.resolve(getJSON._cache[url]);
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
          getJSON._cache[url] = data;
        }
      }
    };
    req.open('GET', url);
    if(options.beforeSend) {
      options.beforeSend(req);
    }
    req.send();
  });
}
getJSON._cache = {};


// function post(url, data) {
//   return new Promise((resolve, reject) => {
//     var req = new XMLHttpRequest();
//     req.onload = function() {
//       if (req.status === 404) {
//         reject(new Error('not found'));
//       } else {
//         var data = JSON.parse(req.response);
//         resolve(data);
//       }
//     };
//     req.open('POST', url);
//     req.send();
//   });
// }


// Data manipulation

var CHARTS_URL = `${global.appconfig.apiBaseUrl}/charts`;


function deleteChart(slug) {
  var url = `${CHARTS_URL}/${slug}/delete`;
  return getJSON(url, {beforeSend: (req) => { req.withCredentials = true; }});
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
  return getJSON(url, {useCache: true}).then((res) => {
    return res.charts;
  });
}


// Authentication

function login() {
  var url = `${global.appconfig.apiBaseUrl}/login`;
  return getJSON(url, {beforeSend: (req) => { req.withCredentials = true; }});
}


function logout() {
  var url = `${global.appconfig.apiBaseUrl}/logout`;
  return getJSON(url, {beforeSend: (req) => { req.withCredentials = true; }});
}


module.exports = {deleteChart, fetchAccount, fetchChart, fetchCharts, login, logout};
