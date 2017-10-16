let parser = require(__dirname + '/js/parser.js');
// let worker = new Worker(__dirname + '/js/parser.js');

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

  $('#fileLoader').on('change', (event) => {
    $('#scrollbox').empty();
    showLoading();
    let reader = new FileReader();
    let targetFile = event.target.files[0];
    console.log(targetFile.name);
    reader.onload = (function (targetFile) {
      return function(e) {
        console.log(e.target.result);
        $('#loadMessage').text('Parsing XML');
        parser.readXMLString(e.target.result).then((data) => {
          hideLoading();
          for (var i = 0; i < data.length; i++) {
            renderSingleItem(data[i]);
          }
        }).catch((err) => {
          console.error(err);
          window.alert('Error loading');
        });
      }
    })(targetFile);
    reader.readAsText(targetFile);
  });
};

let showLoading = () => {
  let $loadingcat = $('<div class="loadingBox"><img src="./img/loadingCat.gif" class="loadingCat"><span id="loadMessage">Reading XML</span></div>');
  $('#scrollbox').prepend($loadingcat);
};

let hideLoading = () => {
  $('.loadingBox').remove();
};

let renderSingleItem = (item) => {
  let name = item['Name'] || 'Untitled',
      artist = item['Artist'] || 'Unknown Artist',
      kind = item['Kind'] || 'Unknown Kind',
      playCount = item['Play Count'] || 0;

  let $icon = getMediaIcon(kind);
  let $appendable = $(`<div class="entry"><div class="entryTitle"><span class="bold">${artist}</span> - ${name}</div></div>`);
  $appendable.prepend(getMediaIcon(kind));
  $('#scrollbox').append($appendable);
};

let getMediaIcon = (fileType) => {
  let link = '';
  if (fileType.indexOf('video') !== -1) {
    kind = 'video';
  } else if (fileType.indexOf('audio') !== -1) {
    kind = 'audio';
  }
  switch (kind) {
    case 'video':
    link = './img/video.png';
    break;
    case 'audio':
    link = './img/music.png';
    break;
    default:
  }
  return $(`<img src=${link} class="mediaIcon">`);
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
