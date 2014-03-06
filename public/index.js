var initialize = function($scope) {
  getSources($scope);
  bindAddKeys($scope);
  bindFormKeys($scope);
}

var refreshDestinations = function($scope, source) {
  var strang;

  $('.menu-item.destination').remove();
  $('.destination-title span').remove();
  $('.zero-state.placeholder').remove();
  $('.destination.placeholder').hide();

  $('.destination-title h3').append("<span>for app [<span class='app-title'>" +
                             source.source.title + "</span>]</span>");

  if (source.destinations.length < 1) {
    $('.destination-inner').append("<div class='zero-state placeholder'><span>No " +
                            "destinations registered</span></div>");
  }

  $.each(source.destinations, function(key, value) {
    strang = value.title + " (" + value.url + ")";
    $('.destination-inner').append("<div class='menu-item destination'>" + strang + "</div>");
  });
  $('.plus-icon.add-destination-icon').show();
}

var resetDestinations = function($scope) {
  $('.menu-item.destination').remove();
  $('.destination-title span').remove();
  $('.plus-icon.add-destination-icon').hide();
  $('.destination.placeholder').show();
}

var refreshSources = function($scope) {
  var strang;

  $('.menu-item.source').remove();

  $.each($scope.sources, function(key, value) {
    strang = value.source.title + " (" + value.source.url + ")";
    $('.source-inner').append("<div class='menu-item source' data-index='" + key + "'>" + strang + "</div>");
  });
}

var selectParent = function($scope) {
  console.log("ID", $scope);
  var index = getIndexFromID($scope);
  console.log("INDEX", index);
  $('.source-inner').find("[data-index=" + index + "]").click();
}

var getSources = function($scope) {
  $.ajax({
    type: 'GET',
    url: '/sources',
    success: function(data) {
      $scope.sources = data;
      refreshSources($scope);
      bindSourceKeys($scope);
      selectParent($scope);
    }
  });
}

var createSource = function($scope) {
  var data = { title: $('#source-title').val(), url: $('#source-url').val() }

  $.post("/source/new",
    data,
    function(result) {
      console.log('Created source:', result);
      hideForms($scope);
      getSources($scope);
      resetDestinations($scope);
    }
  );
}

var createDestination = function($scope) {
  var data = { destination: { title: $('#destination-title').val(), url: $('#destination-url').val() } }
  var path = "/source/" + $scope.selectedSourceID + "/destination/new";

  console.log('Data:', data, 'Path:', path);

  $.post(path,
    data,
    function(result) {
      console.log('Created destination:', result);
      hideForms($scope);
      getSources($scope);
    });
}

var bindFormKeys = function($scope) {
  $('.save-form.source').click(function(event) {
    event.preventDefault();
    createSource($scope);
  });

  $('.save-form.destination').click(function(event) {
    event.preventDefault();
    createDestination($scope);
  });
}

var bindSourceKeys = function($scope) {
  $('.menu-item.source').click(function() {
    var index = $(this).data('index');

    $('.menu-item.source').removeClass('selected');
    $(this).addClass('selected');
    $scope.selectedSourceID = $scope.sources[index].source.id;
    refreshDestinations($scope, $scope.sources[index]);
  });
}

var hideForms = function($scope) {
  $('.add-form input').val('');
  $('.add-form').hide();
  $('.x-icon').removeClass('x-icon');
}

var bindAddKeys = function($scope) {
  $('.plus-icon').click(function() {
    $(this).toggleClass('x-icon');
    $(this).siblings('.add-form').toggle();
  });
}

var getIndexFromID = function($scope) {
  var i = 0,
      x = false;

  while (i < $scope.sources.length && !x) {
    $scope.sources[i].source.id === $scope.selectedSourceID ? x = true: i++;
  }

  return i;
}

$(window).ready(function() {
  $scope = {};
  initialize($scope);
});