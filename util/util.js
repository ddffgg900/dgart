var $moment = require("moment");
var util = {};
var i;
util.write = function (res, ret) {
  var result = {};
  result.status = 1;
  result.result = ret;
  result.errCode = 0;
  result.errMsg = "";
  res.json(result);
};
util.raiseErr = function (res, info) {
  var result = {};
  result.status = 0;
  result.result = "";
  result.errCode = info[0];
  result.errMsg = info[1];
  res.json(result);
};
util.checkParam = function(req, res, needs){
  var result = {};
  var method = req.method;
  var params;
  if(method == "GET"){
    params = req.query;
    //console.log(params);
  } else {
    params = req.body;
    //console.log(params);
  }
  for(i = 0;i < needs.length; i++){
    if(!params[needs[i]]){
      util.raiseErr(res, [100, "missing param:" + needs[i]]);
      return false;
    }
    //result[needs[i]] = params[needs[i]];
  }
  return params;
}
util.filename = function(length){
  var len = length||10;
  var str = "";
  var strPol = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";	// abcdefghijklmnopqrstuvwxyz
  var max = strPol.length;
  for(i=0;i<len;i++){
    str += strPol.charAt(Math.floor(Math.random() * max));
  }
  return str;
}
util.foldername = function(length){
  return $moment().format('YYYY-MM-DD');
}
util.each = function (object, callback, args) {
  //该方法有三个参数:进行操作的对象obj，进行操作的函数fn，函数的参数args
  var name, i = 0,length = object.length;
  if (args) {
    if (length == undefined) {
      for (name in object) {
        if (callback.apply(object[name], args) === false) {
          break;
        }
      }
    } else {
      for (; i < length;) {
        if (callback.apply(object[i++], args) === false) {
          break;
        }
      }
    }
  } else {
    if (length == undefined) {
      for (name in object) {
        if (callback.call(object[name], name, object[name]) === false) {
          break;
        }
      }
    } else {
      for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
    /*object[0]取得jQuery对象中的第一个DOM元素，通过for循环，
    得到遍历整个jQuery对象中对应的每个DOM元素，通过 callback.call( value,i,value);
    将callback的this对象指向value对象，并且传递两个参数,i表示索引值，value表示DOM元素；
    其中callback是类似于 function(index, elem) { ... } 的方法。
    所以就得到 $("...").each(function(index, elem){ ... });
    */
    }
  }
  return object;
}
util.query = function(conn, sql, values, fn){
  var result = {};
  conn.query(sql, values, function(err, rows) {
    
    if(err){
      result = {status:0, info: [201, "query err:" + err]}
    } else {
      result = {status:1, info: rows};
    }
    fn(result);
  });
}


module.exports = util;