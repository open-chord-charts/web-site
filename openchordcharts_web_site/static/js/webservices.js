'use strict';


function getJSON(url) {
  if (getJSON._cache[url])
    return Promise.resolve(getJSON._cache[url]);

  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.onload = function () {
      if (req.status === 404) {
        reject(new Error('not found'));
      } else {
        // fake a slow response every now and then
        setTimeout(function () {
          var data = JSON.parse(req.response);
          resolve(data);
          getJSON._cache[url] = data;
        }, Math.random() > 0.5 ? 0 : 1000);
      }
    };
    req.open('GET', url);
    req.send();
  });
}
getJSON._cache = {};


function fetchChart(slug) {
  return getJSON(`${global.appconfig.apiBaseUrl}/charts/${slug}`).then((res) => res.chart);
}


function fetchCharts() {
  return getJSON(`${global.appconfig.apiBaseUrl}/charts`).then((res) => res.charts);
}


module.exports = {fetchChart, fetchCharts, getJSON};
