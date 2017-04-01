'use strict';
var StreamZip = require('node-stream-zip');
var Markdown = require('./lib/markdown.js');

(function () {

  var file = process.argv[2];

  if (!file) {
    console.error("[Zipreader] faid....");
    return;
  }

  var zip = new StreamZip({
    file: file,
    storeEntries: true
  });

  zip.on('error', function(err) {
    /*handle*/
  });

  zip.on('ready', function() {
    console.log('Entries read: ' + zip.entriesCount);
    var entries = zip.entries();

    // 读取manifest文件
    var manifest = zip.entryDataSync("doc/MANIFEST.json").toString('utf8');
    var arrWeList = (manifest = JSON.parse(manifest))['.source.we'];

    for (var i in arrWeList) {
      console.log(arrWeList[i]);
      var data = zip.entryDataSync("doc/" + arrWeList[i]).toString('utf8');
      console.log(JSON.stringify(data));
    }
  });
})();
