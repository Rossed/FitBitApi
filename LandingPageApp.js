(function () {
'use strict';


angular.module('LandingPageApp', [])
.controller('LandingPageController', LandingPageController);

LandingPageController.$inject = ['$scope'];
function LandingPageController($scope) {
  // Make an API request and graph it
  var processResponse = function(res) {
      if (!res.ok) {
          console.log(res.text());
          throw new Error('Fitbit API request failed: ' + res);
      }

      var contentType = res.headers.get('content-type')
      if (contentType && contentType.indexOf("application/json") !== -1) {
          $scope.json = res.json();
          return $scope.json;
      } else {
        throw new Error('JSON expected but received ' + contentType);
      }
  };

  var processSummary = function(summary) {
    console.log(summary);
    return summary['activities-steps']
}

var graphDistances = function(summary) {
    console.log("1: " + summary);
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'steps');

    var arrayOfArrays = [];
    summary.forEach(function(element) {
        arrayOfArrays.push([new Date(element.dateTime), parseInt(element.value)]);
    });
    console.log(arrayOfArrays);

    data.addRows(arrayOfArrays);

    var options = google.charts.Line.convertOptions({
        height: 450
    });

    var chart = new google.charts.Line(document.getElementById('chart'));

    chart.draw(data, options);
}

  var fragmentQueryParameters = {};
  window.location.hash.slice(1).replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) { fragmentQueryParameters[$1] = $3; }
  );

  $scope.fitbitAccessToken = fragmentQueryParameters.access_token;

  var fetchData = fetch (
    'https://api.fitbit.com/1/user/-/activities/steps/date/2017-11-18/7d.json',
    {
        headers: new Headers({
            'Authorization': 'Bearer ' + $scope.fitbitAccessToken
        }),
        mode: 'cors',
        method: 'GET'
    }
  )

  $scope.process = function() {
    fetchData.then(processResponse)
              .then(processSummary)
              .then(graphDistances);
  }

  }

})();
