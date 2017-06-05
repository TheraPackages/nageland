function downLoad (urlString) {
  try {
    var http = require('http');
    var url = require('url');
    var fs = require('fs');
    var u = url.parse(urlString);
    var targetFile = "e.zip"

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
      });
    }

    var request = http.get({
      // host: 'skycloud-oss.cn-shanghai.oss.aliyun-inc.com',
      host: u.host, // 'pre-thera.alibaba-inc.com',
      path: u.path,
      port: 80}, _callback);
  } catch (err) {
    console.log(err);
  }
}

(function () {

  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }

  var http = require('http');
  var querystring = require('querystring');
  var appSecret = "98cc31f1f8ab885b5528c7e39152f541";
  var appKey = "23811930";

  var isEmpty = function (s) {
    if (s == null) {
      return true;
    }

    return s == "";
  };

  var mapToQuery = function (keySort, params) {

    var ret = "";
    for (var i in keySort) {
      if (isEmpty(keySort[i]) || isEmpty(params[keySort[i]])) {
        continue;
      }
      ret += (keySort[i] + params[keySort[i]]);
    }

    return ret;
  };

  var signTopRequest = function (params, appSecret) {
    var keySort = [];
    for (k in params) { keySort.push(k); }
    return require('crypto').
      createHmac('md5', appSecret).update(
        mapToQuery(keySort.sort((a, b) => { return a > b; }), params)).
          digest("hex").toUpperCase(); // 目前 server 判断是大小写敏感的，统一用大写
  };

  var query = {};
  query["method"] = "alibaba.thera.update.get";
  query["app_key"] = appKey;
  query["timestamp"] = new Date().format("yyyy-MM-dd hh:mm:ss");
  query["format"] = "json";
  query["v"] = "2.0";
  query["sign_method"] = "hmac";
  query["systemInfo"] = ""; // 业务参数
  query["sign"] = signTopRequest(query, appSecret); // 签名参数

  var miniMap = function (m) {
      for (var i in m) {
        if (isEmpty(m[i])) {
          delete m[i];
        }
      }
      return m;
  };

  var doNetQuery = function (query) {

    var http = require("http");
    var querystring = require("querystring");
    var postData = querystring.stringify(miniMap(query));

    var options = {
        hostname: "gw.api.taobao.com",
        port: 80,
        path: "/router/rest",
        method: "POST",
        headers: {
          "Host": "gw.api.taobao.com",
          "Accept": "text/xml,text/javascript",
          "User-Agent": "top-sdk-java",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Content-Length": postData.length
        }
    };
    var _datas = [];

    var req = http.request(options, function (res) {
      res.on("data", function (chunk) {
        _datas.push(chunk);
      });

      res.on("end", function () {
        var s = "";
        for (var d of _datas) {
          s += d.toString();
        }

        try {
          console.log(s);
          var data = JSON.parse(JSON.parse(s).alibaba_thera_update_get_response.result.data);
          var urlString = data.docs[0].url;
          downLoad(urlString);
          // downLoad("http://skycloud-oss.cn-shanghai.oss.aliyun-inc.com/thera/nageland/1.0.0/doc.zip");
        } catch (e) {
          console.log(e);
        }

      });

      // console.log(res.statusCode);
    });

    req.on("error", function (err) {
      console.log(err.message);
    });

    req.write(postData);
    req.end();
  };

  doNetQuery(query);
})();
