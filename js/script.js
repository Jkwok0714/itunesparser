let parser = require(__dirname + '/js/parser.js');
$(function(){
  // readSample();
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
    // window.alert('files changed?');
    let reader = new FileReader();
    let targetFile = event.target.files[0];
    console.log(targetFile.name);
    reader.onload = (function (targetFile) {
      return function(e) {
        console.log('Attempting read');
        console.log(e.target.result);
        parser.readXMLString(e.target.result).then((data) => {
          console.log('Attempting render');
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

let getMediaIcon = (kind) => {
  let link = '';
  switch (kind) {
    case 'MPEG-4 video file':
    link = './img/video.png';
    break;
    case 'Purchased AAC audio file':
    case 'Apple Lossless audio file':
    case 'MPEG audio file':
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
