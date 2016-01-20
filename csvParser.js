var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');


// csv-parse will read csv data and convert to POJO

// [options] : delimiter, rowDelimiter, quote, columns, objname, trim


module.exports = function(path, callback) {

  var parser = parse(
    { columns: true },
    function(err, data){
      if(err) return callback(err);
      callback(null, data);
    });

  fs.createReadStream(path).pipe(parser);
};


