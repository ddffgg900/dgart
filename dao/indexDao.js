var $mysql = require('mysql');
var conf = require('../conf/db');
var util = require('../util/util');
var sqlMapping = require('./sqlMapping');
var $async = require('async');
var $moment = require("moment");
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
          values = [columns, user_id, param.password_str];
          util.query(conn, sql, values, function(result){
            if(result.status==0){
              return cb(result.info);
            } else {
              if(!result.info[0].user_id){
                return cb([102, "wrong password"]);
              }
              req.session.user_id = result.info[0].user_id;
              req.session.privilege = result.info[0].privilege;
              return cb(null, user_id);
            }
          });
        },
        function(user_id, cb){
          sql = sqlMapping.DG_user.checkLastLogin;
          values = [{user_id:user_id}];
          util.query(conn, sql, values, function(result){
            if(result.status==0){
              return cb(result.info);
            } else {
              if(result.info[0].cnt == 0){
                sql = sqlMapping.DG_user.addDay;
                util.query(conn, sql, values, function(result){
                  if(result.status==0){
                    return cb(result.info);
                  } else {
                    return cb(null, user_id);
                  }
                }
              }
              return cb(null, user_id);
            }
          });
        },
        function(user_id, cb){
          sql = sqlMapping.DG_user.lastLogin;
          values = [$moment().format("YYYY-MM-DD HH:mm:ss"), user_id];
          util.query(conn, sql, values, function(result){
            if(result.status==0){
              return cb(result.info);
            } else {
              return cb(null, true);
            }
          });
        }
      ], function (err, result){//result is array
        conn.release();
        if(err){
          return util.raiseErr(res, err);
        }
        if(result){
          return util.write(res, true);
        }
      }
    );
  });
}
methods.clock = function (req, res, next) {
  pool.getConnection(function(err, conn) {
    if(err){
      return util.raiseErr(res, [200, "conn err:" + err]);
    }
    var user_id = req.session.user_id;
    $async.waterfall(
      [
        function(cb){
          values = [user_id];
          sql = sqlMapping.DGlog_user_clock.checkClock;
          util.query(conn, sql, values, function(result){
            if(result.status==0){
              return cb(result.info);
            } else {
              if(result.info[0].cnt > 0){
                return cb([301, "已打过卡"]);
              }
              return cb(null);
            }
          });
        },
        function(cb){
          sql = sqlMapping.DGlog_user_clock.insert;
          values = [{user_id:user_id}];
          util.query(conn, sql, values, function(result){
            if(result.status==0){
              return cb(result.info);
            } else {
              return cb(null);
            }
          });
        },
        function(cb){
          sql = sqlMapping.DGlog_user_clock.checkContinueClock;
          values = [{user_id:user_id}];
          util.query(conn, sql, values, function(result){
            if(result.status==0){
              return cb(result.info);
            } else {
              if(result.info[0].cnt == 0){
                sql = sqlMapping.DG_user.clearClock;
              } else {
                sql = sqlMapping.DG_user.addClock;
              }
              return cb(null, sql);
            }
          });
        },
        function(sql, cb){
          util.query(conn, sql, values, function(result){
            if(result.status==0){
              return cb(result.info);
            } else {
              return cb(null, true);
            }
          });
        }
      ], function (err, result){//result is array
        conn.release();
        if(err){
          return util.raiseErr(res, err);
        }
        if(result){
          return util.write(res, true);
        }
      }
    );
  });
}
methods.

module.exports = methods;