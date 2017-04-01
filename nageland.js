'use strict';

var StreamZip = require('node-stream-zip');
var Markdown = require('./lib/markdown');

function Nageland() {
  this.ok = false;
  this.zip = null;
  this.manifest = null;
}

Nageland.prototype.load = function (fileName) {

  var zip = new StreamZip({file: fileName, storeEntries: true});
  zip.on('error', function(err) {
    /* handle */
  });

  zip.on('ready', () => {
    this.ok = true;
    console.log('Entries read: ' + zip.entriesCount);
    var entries = zip.entries();
    for (var i in entries) {
      console.log(entries[i].name);
    }

    // 读取manifest文件
    var manifestText = zip.entryDataSync("doc/MANIFEST.json").toString('utf8');
    this.manifest = JSON.parse(manifestText);
  });

  this.zip = zip;
};

Nageland.prototype.getHtml = function (scope, name, callback) {
  if (!this.ok) {
    return null;
  }

  var Markdown = require('./lib/markdown');
  var md = new Markdown();
  md.bufmax = 4096;
  var opts = {};
  md.once('end', function() {
  });


  if (this.manifest[scope] && this.manifest[scope][name]) {
    var data = this.zip.entryDataSync("doc/" + this.manifest[scope][name]).toString('utf8');
    if (data == null) {
      callback(null);
      return;
    }
    md.renderData(data, opts, function(err) {

      if (err) {
        console.error('>>>' + err);
        process.exit();
      }

      // NOTE this important
      // console.log(md.html);
      // md.pipe(process.stdout);
      // console.log(JSON.stringify(data));
      callback(md.html);
    });
  } else {
    callback(null);
  }
};

module.exports = Nageland;
