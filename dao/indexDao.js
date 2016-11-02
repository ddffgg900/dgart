var $mysql = require('mysql');
var conf = require('../conf/db');
var util = require('../util/util');
var sqlMapping = require('./sqlMapping');
var $async = require('async');
//var debug = require('debug')('indexDao');
// 使用连接池，提升性能
//var pool  = mysql.createPool($util.extend({}, $conf.mysql));
var pool  = $mysql.createPool(conf.mysql);

// 向前台返回JSON方法的简单封装

var methods = {};
var sql = "";
var values = [];
var columns = [];
//登录
methods.login = function (req, res, next) {
  var param = util.checkParam(req, res, ["email", "password_str"]);
  if(!param){
    return false;
  }
  
  pool.getConnection(function(err, conn) {
    if(err){
      return util.raiseErr(res, [200, "conn err:" + err]);
    }
    $async.waterfall(
      [
        function(cb){
          columns = ['user_id'];
          values = [columns, param.email];
          sql = sqlMapping.DG_user.list + "WHERE `email` = ?";
          //console.log(sql);
          util.query(conn, sql, values, function(result){
            if(result.status==0){
              return cb(result.info);
            } else {
              if(!result.info[0].user_id){
                return cb([101, "no user"]);
              }
              return cb(null, result.info[0].user_id);
            }
          });
        },
        function(user_id, cb){
          sql = sqlMapping.DG_user.list+"WHERE `user_id` = ? AND `password` = ?";
          columns = ['user_id', 'privilege'];
          values = [columns, param.password_str];
          //console.log(sql);
          util.query(conn, sql, values, function(result){
            if(result.status==0){
              return cb(result.info);
            } else {
              if(!result.info[0].user_id){
                return cb([102, "wrong password"]);
              }
              req.session.user_id = result.info[0].user_id;
              req.session.privilege = result.info[0].privilege;
              return cb(null, req.session.privilege);
            }
          });
        }
      ], function (err, result){//result is array
        conn.release();
        if(err){
          return util.raiseErr(res, err);
        }
        if(result){
          return util.write(res, result[0]);
        }
      }
    );
  });
}

module.exports = methods;