const requireTaskPool = require('electron-remote').requireTaskPool;
const Parser = requireTaskPool(require.resolve('./js/parser.js'));
const divConstructor = require('./js/divConstructor.js');

let library = [];
let filteredLibrary = [];
let loadAtOnce = 20;
let loadIndex = 0;
let applicationState = {
  filterBy: 'Name'
};

$(function(){
  setupListeners();
});

let setupListeners = () => {
  $('.dropdown-item').on('click', (e) => {
    e.preventDefault();
    let selected = $(e.target).text();
    $('#myDropdown').toggleClass('show');
    applicationState.filterBy = selected;
    $('.dropdownToggle').text(selected);
  });

  $('#exitButton').on('click', () => {
    window.close();
  });

  $('#clearButton').on('click', () => {
    clearScreen();
    $('#fileLoader').val('');
    $('.filter-tools').addClass('hide');
  });

  $('#filterButton').on('click', () => {
    filterLibrary();
  });

  $('#clearFilterButton').on('click', () => {
    filteredLibrary = library;
    $('#filterInput').val('');
    renderNextPage();
  });

  $('.dropdownToggle').on('click', () => {
    $('#myDropdown').toggleClass('show');
  })

  $('#scrollbox').on('scroll', function() {
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 1) {
        if (loadIndex + 1 < filteredLibrary.length) {
          loadIndex += loadAtOnce;
          renderNextPage();
        }
    }
  })

  $('#fileLoader').on('change', (event) => {
    clearScreen();
    if (event.target.files.length === 0) return;
    showLoading();
    let reader = new FileReader();
    let targetFile = event.target.files[0];
    reader.onload = (function (targetFile) {
      return function(e) {
        $('#loadMessage').text('Parsing XML');
        Parser.readXMLString(e.target.result).then((data) => {
          hideLoading();
          library = data;
          filteredLibrary = library;
          $('.filter-tools').removeClass('hide');
          renderNextPage();
        });
      }
    })(targetFile);
    reader.readAsText(targetFile);
  });
};

let clearScreen = () => {
  $('#scrollbox').empty();
}

let filterLibrary = () => {
  const filter = $('#filterInput').val();
  if (filter === '' || filter === undefined) {
    window.alert('Enter a filter query');
    return;
  }
  clearScreen();
  showLoading();
  console.log('Lib.', library);
  Parser.filterLibrary(library, filter, applicationState.filterBy).then(res => {
    filteredLibrary = res;
    hideLoading();
    renderNextPage();
  }).catch(err => {
    hideLoading();
    window.alert('An error has occurred while filtering. ' + err);
  });
}

let renderLibrary = (max = loadAtOnce) => {
  for (var i = 0; i < max; i++) {
    renderSingleItem(filteredLibrary[i]);
  }
};

let renderNextPage = () => {
  for (var i = loadIndex; i < loadIndex + loadAtOnce; i++) {
    if (i >= filteredLibrary.length) break;
    renderSingleItem(filteredLibrary[i]);
  }
};

let showLoading = () => {
  let $loadingcat = $('<div class="loadingBox"><img src="./img/loadingCat.gif" class="loadingCat"><span id="loadMessage">Reading XML</span></div>');
  $('#scrollbox').prepend($loadingcat);
};

let hideLoading = () => {
  $('.loadingBox').remove();
};

let renderSingleItem = (item) => {
  $appendable = divConstructor.createCard(item);
  $('#scrollbox').append($appendable);
};

//====TEST METHODS====

let displayAThing = () => {
  let $appendable = $('<div style="font-weight: bold">LOADED DATA:</div>');
  $('#scrollbox').prepend($appendable);
};

let readSample = () => {
  Parser.readXML().then((data) => {
    let $appendable = $('<div>' + JSON.stringify(data) + '</div>');
    $('#scrollbox').append($appendable);
  }).catch((err) => {
    window.alert('Error loading', err);
  });
};
