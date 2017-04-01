var StreamZip = require('node-stream-zip');

var zip = new StreamZip({
    file: 'doc.zip',
    storeEntries: true
});

zip.on('error', function(err) {
  /*handle*/
});

zip.on('ready', function() {
    console.log('Entries read: ' + zip.entriesCount);
    var entries = zip.entries();

    for (var a in entries) {
      if (!entries[a].isDirectory) {
        if ("o/aa.zip" == entries[a].name) {
          continue;
        }

        var fileName = entries[a].name;
        var pos = fileName.lastIndexOf('/');
        if (pos != -1) {
          fileName = fileName.substring(pos + 1);
        }

        console.log("## "+ fileName);

        var actualEentryData = zip.entryDataSync(entries[a].name).toString('utf8');
        console.log(actualEentryData);
      }
    }

    // stream to stdout
    // zip.stream('node/benchmark/net/tcp-raw-c2s.js', function(err, stm) {
    //     stm.pipe(process.stdout);
    // });
    // // extract file
    // zip.extract('node/benchmark/net/tcp-raw-c2s.js', './temp/', function(err) {
    //     console.log('Entry extracted');
    //     consoe.log("djwjdiowjoi!!!!!!jdwdwjidjiwoidiw777");
    // });
    // // extract folder
    // zip.extract('node/benchmark/', './temp/', function(err, count) {
    //     console.log('Extracted ' + count + ' entries');
    //     consoe.log("djwjdiowjoi!!!!!!jdwidiw777");
    // });
    // // extract all
    // zip.extract(null, './temp/', function(err, count) {
    //     console.log('Extracted ' + count + ' entries');
    //     consoe.log("djwjdiowjoi!!!!!!");
    // });
    // // read file as buffer in sync way
    // var data = zip.entryDataSync('README.md');
    // consoe.log("djwjdiowjoi");
});

// zip.on('extract', function(entry, file) {
    // console.log('Extracted ' + entry.name + ' to ' + file);
// });
// zip.on('entry', function(entry) {
    // called on load, when entry description has been read
    // you can already stream this entry, without waiting until all entry descriptions are read (suitable for very large archives)
    // console.log('Read entry ', entry.name);
// });
