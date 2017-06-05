(function() {
  var Nageland = require('../lib/nageland');
  var nag = new Nageland();
  nag.load("eee.zip", function () {
    nag.readHtml(".source.we", "a", function (d) {
      console.log(d);
    });
  });
})();
