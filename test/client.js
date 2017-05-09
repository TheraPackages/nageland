(function () {
  try {
    var http = require('http');
    function _callback(res) {
      var _datas = [];
      res.on('data', function (data) {
        _datas.push(data);
        // console.log('...');
      });

      res.on('error', function () {
        console.log('error...');
      });

      res.on('end', function () {
        // if (fs.existsSync('e.zip')) {
        //   fs.unlinkSync('e.zip');
        // }
        var s = "";
        for (var d of _datas) {
          s += d.toString();
        //   fs.appendFileSync('e.zip', d);
        }

        _datas = [];
        console.log(s);
      });
    }

    var request = http.get({
      // host: 'skycloud-oss.cn-shanghai.oss.aliyun-inc.com',
      host: 'pre-thera.alibaba-inc.com',
      // path: '/thera/nageland/doc.zip',
      path: '/doc.do',
      port: 80}, _callback);
  } catch (err) {
    console.log(err);
  }
})();
