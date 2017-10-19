const requireTaskPool = require('electron-remote').requireTaskPool;
const parser = requireTaskPool(require.resolve('./js/parser.js'));
// const parser = require('./js/parser.js');
const divConstructor = require('./js/divConstructor.js');

let library = [];
let filteredLibrary = [];
let loadAtOnce = 20;
let loadIndex = 0;

$(function(){
  // readSample();
  // showLoading();
  addButtonListeners();
});

let addButtonListeners = () => {
  $('#exitButton').on('click', () =>{
    window.close();
  });

  $('#clearButton').on('click', () =>{
    $('#scrollbox').empty();
    $('#fileLoader').val('');
  });

  $('#scrollbox').on('scroll', function() {
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 1) {
        // window.alert('end reached');
        if (loadIndex + 1 < filteredLibrary.length) {
          loadIndex += loadAtOnce;
          renderNextPage();
        }
    }
  })

  $('#fileLoader').on('change', (event) => {
    $('#scrollbox').empty();
    if (event.target.files.length === 0) return;
    showLoading();
    let reader = new FileReader();
    let targetFile = event.target.files[0];
    // console.log(targetFile.name);
    reader.onload = (function (targetFile) {
      return function(e) {
        $('#loadMessage').text('Parsing XML');
        parser.readXMLString(e.target.result).then((data) => {
          hideLoading();
          library = data;
          filteredLibrary = library;
          renderNextPage();
        });
      }
    })(targetFile);
    reader.readAsText(targetFile);
  });
};

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
  parser.readXML().then((data) => {
    let $appendable = $('<div>' + JSON.stringify(data) + '</div>');
    $('#scrollbox').append($appendable);
  }).catch((err) => {
    window.alert('Error loading', err);
  });
};
