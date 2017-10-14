$(function(){

  let parser = require(__dirname + '/js/parser.js');

  console.log('Log');
  parser.readXML().then((data) => {
    let $appendable = $('<div>' + JSON.stringify(data) + '</div>');
    $('#app').append($appendable);
    // window.alert('Tried to append');
  }).catch((err) => {
    window.alert('Error loading', err);
  });
});
