var initialize = function($scope) {
  getSources($scope);
  bindAddKeys($scope);
}

var refreshDestinations = function($scope, source) {
  var strang;

  $('.menu-item.destination').remove();
  $('.destination-title span').remove();

  $('.destination-title h3').append("<span>for app [<span class='app-title'>" +
                             source.source.title + "</span>]</span>");

  $.each(source.destinations, function(key, value) {
    strang = value.title + " (" + value.url + ")";
    $('.destination-inner').append("<div class='menu-item destination'>" + strang + "</div>");
  });
  $('.plus-icon.add-destination-icon').show();
}

var refreshSources = function($scope) {
  var strang;

  $('.menu-item.source').remove();

  $.each($scope.sources, function(key, value) {
    strang = value.source.title + " (" + value.source.url + ")";
    $('.source-inner').append("<div class='menu-item source' data-index='" + key + "'>" + strang + "</div>");
  });
}

var getSources = function($scope) {
  $.ajax({
    type: 'GET',
    url: '/sources',
    success: function(data) {
      $scope.sources = data;
      refreshSources($scope);
      bindSourceKeys($scope);
    }
  });
}

var bindSourceKeys = function($scope) {
  $('.menu-item.source').click(function() {
    var index = $(this).data('index');

    $('.menu-item.source').removeClass('selected');
    $(this).addClass('selected');
    refreshDestinations($scope, $scope.sources[index]);
  });
}

var bindAddKeys = function($scope) {
  $('.plus-icon').click(function() {
    $(this).toggleClass('x-icon');
    $(this).siblings('.add-form').toggle();
  });
}

$(window).ready(function() {
  $scope = {};
  initialize($scope);
});