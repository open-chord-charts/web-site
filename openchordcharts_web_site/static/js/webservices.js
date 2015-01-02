'use strict';


// HTTP functions

function getJSON(url, options) {
  options = options || {};
  if ( ! options.noCache && getJSON._cache[url]) {
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
        if ( ! options.noCache) {
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


// Data fetching

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
  var url = `${global.appconfig.apiBaseUrl}/charts`;
  var queryString = '';
  if (query && query.ownerSlug) {
    queryString += `ownerSlug=${query.ownerSlug}`;
  }
  if (queryString) {
    url += `?${queryString}`;
  }
  return getJSON(url).then((res) => {
    return res.charts;
  });
}


// Authenticating

function login(username, password) {
  var url = `${global.appconfig.apiBaseUrl}/login`;
  return getJSON(
    url,
    {
      beforeSend: (req) => req.setRequestHeader('Authorization', 'Basic ' + global.btoa(username + ':' + password)),
      noCache: true,
    }
  );
}


module.exports = {fetchAccount, fetchChart, fetchCharts, login};
