'use strict';


var $ = require('jquery');


function fetchChart(slug, onSuccess, onError) {
  $.ajax({
    dataType: 'json',
    type: 'GET',
    url: 'http://localhost:8765/api/1/charts/' + slug,
  })
  .done(function(data/*, textStatus, jqXHR*/) {
    onSuccess(data);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    onError(
      errorThrown && jqXHR.responseText ?
        errorThrown + ': ' + jqXHR.responseText :
        errorThrown || jqXHR.responseText
    );
  });
}


module.exports = {fetchChart: fetchChart};
