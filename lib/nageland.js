'use strict';

var StreamZip = require('node-stream-zip');
var download = require('./download');
var fs = require('fs');

function isDirectory(p) {
  var stat = fs.lstatSync(p)
  if (stat && stat.isDirectory()) {
    return true;
  }

  return false;
}

function isFile(p) {
  try {
    var stat = fs.lstatSync(p)
    if (stat && stat.isFile())
      return true;
    return false
  } catch (err) {
    return false;
  }
}

function Nageland() {
  this.ok = false;
  this.zip = null;
  this.manifest = null;
}

Nageland.prototype.local_load = function (fileName, onDone) {
  var zip = new StreamZip({file: fileName, storeEntries: true});
  zip.on('error', function(err) {
    /* handle */
  });

  zip.on('ready', () => {
    this.ok = true;

    // 读取manifest文件
    var manifestText = zip.entryDataSync("doc/MANIFEST.json").toString('utf8');
    this.manifest = JSON.parse(manifestText);
    if (onDone) {
      onDone();
    }

  });

  this.zip = zip;
}

Nageland.prototype.load = function (fileName, onDone) {
  if (isFile(fileName)) {
    this.local_load(fileName, onDone);
  } else {
    download("http://skycloud-oss.cn-shanghai.oss.aliyun-inc.com/thera/nageland/1.0.0/doc.zip", fileName, () => {
      this.local_load(fileName, onDone);
    });
  }
};

Nageland.prototype.readHtml = function (scope, name, callback) {
  if (!this.ok) {
    return null;
  }

  var Markdown = require('./markdown');
  var md = new Markdown();
  md.bufmax = 4096;
  var opts = {};

  md.once('end', function() {
  });

  if (this.manifest[scope] && this.manifest[scope][name]) {
    var data = null;
    try {
      data = this.zip.entryDataSync("doc/" + this.manifest[scope][name]).toString('utf8');
    } catch (e) {
    }

    if (data == null) {
      if (callback) {
        callback(null);
        return;
      }
    }

    md.renderData(data, opts, function(err) {

      if (err) {
        console.error('>>>' + err);
        process.exit();
      }

      callback(md.html);
    });
  } else {
    callback(null);
  }
};

module.exports = Nageland;
