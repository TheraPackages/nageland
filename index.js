#!/usr/bin/env node

var Markdown = require('./lib/markdown').Markdown;
console.log(Markdown);
var md = new Markdown();
md.bufmax = 4096;
var fileName = process.argv[2];
var opts = {};

md.once('end', function() {
});

md.render(fileName, opts, function(err) {

  if (err) {
    console.error('>>>' + err);
    process.exit();
  }

  console.log(md.html);
  // md.pipe(process.stdout);
});
