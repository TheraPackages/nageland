'use strict';

 // (function () {
 //   var Nageland = require('../nageland');
 //   var nageland = new Nageland();
 //   nageland.load('../doc.zip', function () {
 //     nageland.readHtml('.source.we', 'img', function (data) {
 //       // console.log("<meta charset='utf-8' />");
 //       // console.log('<meta http-equiv="content-type" content="text/html;charset=utf-8">');
 //       console.log(data);
 //     });
 //   });
 // })();

(function () {

	/*
  var p = new Promise((resolve, reject) => {
        //做一些异步操作
        setTimeout(function(){
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
    });

    p.then((val) => {
      console.log(val);
    }).then((val) => {
      console.log(val);
    });


  return;

  // http://skycloud-oss.cn-shanghai.oss.aliyun-inc.com/thera/nageland/doc.zip
  var fs = require('fs');
  var http = require('http');
  var rimraf = require('rimraf');

  rimraf('1', function () {
    console.log('done');
  });

  // console.log(ret);

  return;
  */
  try {

    function _callback(res) {
      var _datas = [];

      res.on('data', function (data) {
        _datas.push(data);
      });

      res.on('error', function () {
        console.log('error...');
      });

      res.on('end', function () {
        if (fs.existsSync('e.zip')) {
          fs.unlinkSync('e.zip');
        }

        for (var d of _datas) {
          fs.appendFileSync('e.zip', d);
        }

        _datas = [];
      });
    }

    var request = http.get({
      host: 'skycloud-oss.cn-shanghai.1oss.aliyun-inc.com',
      path: '/thera/nageland/doc.zip',
      port: 80}, _callback);
  } catch (err) {
  }
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
