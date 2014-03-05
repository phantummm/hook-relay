var refreshDestinations = function($scope, source) {
  var strang;

  $.each(source.destinations, function(key, value) {
    strang = value.title + " (" + value.url + ")";
    $('.destination-inner').append("<div class='menu-item'>" + strang + "</div>");
  });
}

var refreshSources = function($scope) {

  $.each($scope.sources, function(key, value) {
    strang = value.source.title + " (" + value.source.url + ")";
    $('.source-inner').append("<div class='menu-item'>" + strang + "</div>");
  });
  refreshDestinations($scope, $scope.sources[1]);
}

var getSources = function($scope) {
  $.ajax({
    type: 'GET',
    url: '/sources',
    success: function(data) {
      $scope.sources = data;
      refreshSources($scope);
    }
  });
}

$(window).ready(function() {
  $scope = {};
  getSources($scope);
});