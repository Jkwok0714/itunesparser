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

let readXMLString = function(string) {
  return new Promise((resolve, reject) => {
    let parser = new xml2js.Parser();
    parser.parseString(string, function (err, result) {
      let isolatedResults = result.plist.dict[0].dict[0].dict;
      let parsed = rawResultsToObjects(isolatedResults);
      resolve(parsed);
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
  readXML,
  readXMLString
};
