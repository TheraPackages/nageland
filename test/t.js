/**
 * Remove directory recursively
 * @param {string} dir_path
 * @see http://stackoverflow.com/a/42505874/3027390
 */
function rm(dir_path) {
  var fs = require('fs');
  var path = require('path');
  if (fs.existsSync(dir_path)) {
    fs.readdirSync(dir_path).forEach(function(entry) {
      var entry_path = path.join(dir_path, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        rm(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    fs.rmdirSync(dir_path);
  }
}

rm('./7');
