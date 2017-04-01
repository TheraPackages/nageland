#!/usr/bin/env node
'use strict';
(function () {
  var Nageland = require('./nageland');
  var nageland = new Nageland();
  nageland.load('doc.zip');
  setTimeout(function () {
    var html = nageland.getHtml('.source.we', 'div', function (data) {
      console.log(data);
    });
  }, 100);
})();

// var Markdown = require('./lib/markdown');
//
// var md = new Markdown();
// md.bufmax = 4096;
// var fileName = process.argv[2];
// var opts = {};
//
// md.once('end', function() {
// });
//
// md.render(fileName, opts, function(err) {
//
//   if (err) {
//     console.error('>>>' + err);
//     process.exit();
//   }
//
//   console.log(md.html);
//   // md.pipe(process.stdout);
// });
