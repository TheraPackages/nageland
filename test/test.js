'use strict';
(function () {
  var Nageland = require('../nageland');
  var nageland = new Nageland();
  nageland.load('../doc.zip', function () {
    nageland.readHtml('.source.we', 'div', function (data) {
      // console.log("<meta charset='utf-8' />");
      console.log('<meta http-equiv="content-type" content="text/html;charset=utf-8">');
      console.log(data);
    });
  });
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
