let fs = require('fs'),
    xml2js = require('xml2js');

let readXML = function() {
  return new Promise((resolve, reject) => {
    let parser = new xml2js.Parser();
    fs.readFile(__dirname + '/../sample.xml', function(err, data) {
      parser.parseString(data, function (err, result) {
        let isolatedResults = result.plist.dict[0].dict[0].dict;
        // console.dir(isolatedResults);
        // console.log('Done. Extracted', isolatedResults.length, 'items');
        // processResults(isolatedResults);
        let parsed = rawResultsToObjects(isolatedResults);
        // console.dir(parsed);
        resolve(parsed);
      });
    });
  });
}

let rawResultsToObjects = (rawResult) => {
  let resultArray = [];
  for (var obj of rawResult) {
    resultArray.push(processObject(obj));
  }
  return resultArray;
};

let processObject = (obj) => {
  let result = {};
  let currIndex = {
    integer: 0,
    date: 0,
    string: 0,
    boolean: 0
  };

  let typeOfKey;
  for (var key of obj.key) {
    typeOfKey = KEY_TYPE[key];
    if (typeOfKey === 'boolean') {
      result[key] = 'boolean who cares';
    } else {
      result[key] = obj[typeOfKey][currIndex[typeOfKey]];
    }
    currIndex[typeOfKey]++;
  }
  return result;
};

//List of all possible key types and their associated data type
const KEY_TYPE = {
  'Track ID': 'integer',
  'Size': 'integer',
  'Total Time': 'integer',
  'Disc Number': 'integer',
  'Disc Count': 'integer',
  'Track Number': 'integer',
  'Year': 'integer',
  'BPM': 'integer',
  'Date Modified': 'date',
  'Date Added': 'date',
  'Bit Rate': 'integer',
  'Sample Rate': 'integer',
  'Volume Adjustment': 'integer',
  'Play Count': 'integer',
  'Play Date': 'integer',
  'Play Date UTC': 'date',
  'Artwork Count': 'integer',
  'Persistent ID': 'string',
  'Track Type': 'string',
  'File Folder Count': 'integer',
  'Library Folder Count': 'integer',
  'Name': 'string',
  'Artist': 'string',
  'Album Artist': 'string',
  'Composer': 'string',
  'Album': 'string',
  'Grouping': 'string',
  'Genre': 'string',
  'Kind': 'string',
  'Equalizer': 'string',
  'Comments': 'string',
  'Location': 'string',
  'Has Video': 'boolean',
  'Sort Name': 'string',
  'Sort Album': 'string',
  'Sort Artist': 'string',
  'Sort Album Artist': 'string',
  'Sort Composer': 'string',
  'Rating': 'integer'
};

module.exports = {
  readXML
};
/*

Sample data
==== AUDIO ====

{ key:
     [ 'Track ID',
       'Size',
       'Total Time',
       'Disc Number',
       'Disc Count',
       'Track Number',
       'Year',
       'BPM',
       'Date Modified',
       'Date Added',
       'Bit Rate',
       'Sample Rate',
       'Volume Adjustment',
       'Play Count',
       'Play Date',
       'Play Date UTC',
       'Rating',
       'Artwork Count',
       'Persistent ID',
       'Track Type',
       'File Folder Count',
       'Library Folder Count',
       'Name',
       'Artist',
       'Album Artist',
       'Composer',
       'Album',
       'Grouping',
       'Genre',
       'Kind',
       'Equalizer',
       'Equalizer',
       'Comments',
       'Sort Name',
       'Sort Album',
       'Sort Artist',
       'Sort Album Artist',
       'Sort Composer',
       'Location' ],
    integer:
     [ '84',
       '18052029',
       '448235',
       '2',
       '2',
       '1',
       '2015',
       '200',
       '320',
       '44100',
       '-121',
       '1',
       '3590575547',
       '100',
       '1',
       '5',
       '1' ],
    date:
     [ '2017-10-11T21:24:49Z',
       '2017-06-11T03:46:46Z',
       '2017-10-11T21:05:47Z' ],
    string:
     [ 'B6719D1BBCAB751B',
       'File',
       'Shades Of Gray',
       'Amorphis',
       'Amorphis',
       'Koivusaari',
       'Under the Red Cloud JP Edition - Live at Loud Park',
       'Stuff',
       'Melodic Death Metal',
       'MPEG audio file',
       '#!#100#!#',
       'Acoustic',
       'ExactAudioCopy v1.1',
       'Shades',
       'UTRC',
       'AMORPH',
       'AMORPH',
       'Finnish Guy',
       'file:///Users/justinkwok/Music/iTunes/iTunes%20Media/Music/Amorphis/Under%20the%20Red%20Cloud%20JP%20Edition%20-%20Live%20at%20Loud%20Park/2-01%20Shades%20Of%20Gray.mp3' ] },,
==== VIDS ====

{ key:
     [ 'Track ID',
       'Size',
       'Total Time',
       'Date Modified',
       'Date Added',
       'Artwork Count',
       'Persistent ID',
       'Track Type',
       'Has Video',
       'File Folder Count',
       'Library Folder Count',
       'Name',
       'Album Artist',
       'Kind',
       'Location' ],
    integer: [ '82', '41961843', '47848', '1', '3', '1' ],
    date: [ '2017-03-13T03:43:44Z', '2017-03-13T03:43:47Z' ],
    string:
     [ '9390A1F9AD685F4E',
       'File',
       'DroneTest',
       'Justin Kwok',
       'MPEG-4 video file',
       'file:///Users/justinkwok/Music/iTunes/iTunes%20Media/Home%20Videos/DroneTest.m4v' ],
    true: [ '' ] },
*/
