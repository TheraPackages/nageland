(function () {
  function download (urlString, target, onDone) {
    try {
      var http = require('http');
      var url = require('url');
      var fs = require('fs');
      console.log(urlString);
      var u = url.parse(urlString);
      var targetFile = target;

      function _callback(res) {
        var _datas = [];
        res.on('data', function (data) {
          _datas.push(data);
        });

        res.on('error', function () {
          console.log('error...');
        });

        res.on('end', function () {
          if (fs.existsSync(targetFile)) {
            fs.unlinkSync(targetFile);
          }

          for (var d of _datas) {
            fs.appendFileSync(targetFile, d);
          }

          if (onDone) {
            onDone(true);
          }
        });
      }

      var request = http.get({
        // host: 'skycloud-oss.cn-shanghai.oss.aliyun-inc.com',
        host: u.host, // 'pre-thera.alibaba-inc.com',
        path: u.path,
        port: 80}, _callback);
    } catch (err) {
      if (onDone) {
        onDone(false);
      }
    }
  }
  module.exports = download;
})();
