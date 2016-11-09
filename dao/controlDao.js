var $mysql = require('mysql');
var conf = require('../conf/db');
var util = require('../util/util');
var sqlMapping = require('./sqlMapping');
var $async = require('async');
var $multiparty = require('multiparty');
var $fs = require('fs');


//var debug = require('debug')('indexDao');
// 使用连接池，提升性能
//var pool  = mysql.createPool(util.extend({}, $conf.mysql));
var pool  = $mysql.createPool(conf.mysql);

var methods = {};
var sql = "";
var values = [];
var columns = [];
var result = {};



methods.checkLogin = function (req, res, next) {
  result = {};
  if(!req.session.user_id){
    return util.raiseErr(res, [103, "no login"]);
  }
  result.user_id = req.session.user_id;
  result.privilege = req.session.privilege;
  if(result.privilege < 2){
    return util.raiseErr(res, [104, "no admin"]);
  }
  return util.write(res, result);
},

methods.uploadFile = function(req, res, next, dirName){
  var form = new $multiparty.Form({uploadDir :"/srv/dgart/public/storage/tmp/"});
  form.parse(req, function(err, fields, files) {
    if(err){
      return util.raiseErr(res, [105, 'parse error: ' + err]);
    }
    var dstDir = "/srv/dgart/public/storage/"+dirName+"/";
    var foldername = util.foldername();
    if(!$fs.existsSync(dstDir)){
      $fs.mkdir(dstDir, function (err) {
        if(err){
          return util.raiseErr(res, [300, '创建目录 error: ' + err]);
        }
      });
    }
    dstDir = dstDir + foldername;
    if(!$fs.existsSync(dstDir)){
      $fs.mkdir(dstDir, function (err) {
        if(err){
          return util.raiseErr(res, [300, '创建目录 error: ' + err]);
        }
      });
    }
    dstDir = dstDir+"/";
    var webDir = "/storage/"+dirName+"/"+foldername+"/";
    if(!files){
      return util.raiseErr(res, [100, 'missing param']);
    }
    var filesTmp = JSON.stringify(files,null);
    var uploadFile = files.uploadFile;
    var uploadedPath = uploadFile[0].path;
    var ext = uploadedPath.substr(uploadedPath.lastIndexOf(".")).toLowerCase();//获得文件后缀名
    var filename = util.filename();
    var dstPath = dstDir + filename +ext;//重命名
    console.log(dstPath);
    var webPath = webDir + filename +ext;//重命名
    console.log(webPath);
    $fs.rename(uploadedPath, dstPath, function(err) {
      if(err){
        return util.raiseErr(res, [106, 'rename error: ' + err]);
      }
      return util.write(res, webPath);
    });
  });
}

methods.listMission = function(req, res, next){
  var param = util.checkParam(req, res, ["course_id"]);
  if(!param){
    return false;
  }
  columns = ["mission_id", "title", "rule","intro", "example","line", "status", "category_id"];
  sql = sqlMapping.DG_mission.list + "WHERE `course_id` = ? ";
  //console.log(sql);
  values = [columns, param.course_id];
  if(param.keyword){
    sql += "AND (`title` like ? OR `rule` like ?) ";
    values.push("%"+param.keyword+"%", "%"+param.keyword+"%");
    //console.log(values);
  }
  sql+="ORDER BY `mission_id` DESC";
  pool.getConnection(function(err, conn) {
    if(err){
      return util.raiseErr(res, [200, "conn err:" + err]);
    }
    util.query(conn, sql, values, function(result){
      conn.release();
      if(result.status==0){
        return util.raiseErr(res, result.info);
      } else {
        return util.write(res, result.info);
      }
    });
  });
}

methods.addMission = function(req, res, next){
  var param = util.checkParam(req, res, ["title", "intro", "rule", "example", "line", "course_id", "category_id"]);
  if(!param){
    return false;
  }
  var values = [{title: param.title, intro:param.intro, example:param.example, line:param.line, course_id:param.course_id, category_id:param.category_id, rule:param.rule}];
  if(!param.mission_id){
    sql = sqlMapping.DG_mission.insert;
  } else {
    sql = sqlMapping.DG_mission.update + " WHERE `mission_id` = ?";
    values.push(param.mission_id);
  }
  pool.getConnection(function(err, conn) {
    if(err){
      return util.raiseErr(res, [200, "conn err:" + err]);
    }
    util.query(conn, sql, values, function(result){
      conn.release();
      if(result.status==0){
        return util.raiseErr(res, result.info);
      } else {
        return util.write(res, true);
      }
    });
  });
}

methods.addTutorial = function(req, res, next){
  var param = util.checkParam(req, res, ["title", "icon", "course_id", "intro", "code"]);
  if(!param){
    return false;
  }
  var values = [{title: param.title, intro:param.intro, code:param.code, icon:param.icon}];
  if(!param.tutorial_id){
    sql = sqlMapping.DG_tutorial.insert;
  } else {
    sql = sqlMapping.DG_tutorial.update + " WHERE `tutorial_id` = ?";
    values.push(param.tutorial_id);
  }
  pool.getConnection(function(err, conn) {
    if(err){
      return util.raiseErr(res, [200, "conn err:" + err]);
    }
    util.query(conn, sql, values, function(result){
      conn.release();
      if(result.status==0){
        return util.raiseErr(res, result.info);
      } else {
        return util.write(res, true);
      }
    });
  });
}
methods.showTutorial = function(req, res, next){
  var param = util.checkParam(req, res, ["tutorial_id"]);
  if(!param){
    return false;
  }
  values = [];
  var columns = ["tutorial_id", "course_id", "title", "intro", "code"];
  values.push(columns);
  sql = sqlMapping.DG_tutorial.list + " WHERE `tutorial_id` = ?";
  values.push(param.tutorial_id);
  
  console.log(values);
  pool.getConnection(function(err, conn) {
    if(err){
      return util.raiseErr(res, [200, "conn err:" + err]);
    }
    util.query(conn, sql, values, function(result){
      conn.release();
      if(result.status==0){
        return util.raiseErr(res, result.info);
      } else {
        return util.write(res, result.info[0]);
      }
    });
  });
}
methods.listTutorial = function(req, res, next){
  var param = util.checkParam(req, res, ["course_id"]);
  if(!param){
    return false;
  }
  columns = ["tutorial_id", "title", "intro", "status"];
  sql = sqlMapping.DG_tutorial.list + "WHERE `course_id` = ? ";
  //console.log(sql);
  values = [columns, param.course_id];
  if(param.keyword){
    sql += "AND (`title` like ? OR `intro` like ? ) ";
    values.push("%"+param.keyword+"%", "%"+param.keyword+"%");
    console.log(values);
  }
  sql+= "ORDER BY `tutorial_id` DESC";
  pool.getConnection(function(err, conn) {
    if(err){
      return util.raiseErr(res, [200, "conn err:" + err]);
    }
    util.query(conn, sql, values, function(result){
      conn.release();
      if(result.status==0){
        return util.raiseErr(res, result.info);
      } else {
        return util.write(res, result.info);
      }
    });
  });
}


methods.listNewWork = function(req, res, next){
  sql = sqlMapping.DGvw_newWork.list;
  //console.log(sql);
  
  pool.getConnection(function(err, conn) {
    if(err){
      return util.raiseErr(res, [200, "conn err:" + err]);
    }
    util.query(conn, sql, values, function(result){
      conn.release();
      if(result.status==0){
        return util.raiseErr(res, result.info);
      } else {
        return util.write(res, result.info);
      }
    });
  });
} 
 
methods.listPastWork = function(req, res, next){
  var param = util.checkParam(req, res, ["user_id"]);
  if(!param){
    return false;
  }
  values = [param.user_id];
  sql = sqlMapping.DGvw_pastWork.list;
  if(param.limit){
    sql+=" LIMIT "+param.limit;
  }
  pool.getConnection(function(err, conn) {
    if(err){
      return util.raiseErr(res, [200, "conn err:" + err]);
    }
    util.query(conn, sql, values, function(result){
      conn.release();
      if(result.status==0){
        return util.raiseErr(res, result.info);
      } else {
        return util.write(res, result.info);
      }
    });
  });
};

methods.addRating = function(req, res, next){
  var param = util.checkParam(req, res, ["work_id", "answer", "rank", "tutorials"]);
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
          sql = sqlMapping.DG_rating.insert;
          values = [{
            work_id: param.work_id,
            answer: param.answer,
            rank: param.rank,
          }];
          util.query(conn, sql, values, function(result){
            if(result.status==0){
              return cb(result.info);
            } else {
              return cb(null, result.info.insertId)
            }
          });
        },
        function(id, cb){
          var tutorial_arr = param.tutorials;
          sql = sqlMapping.DGrlt_rating_tutorial.insert;
          values = {rating_id: id};
          util.each(tutorial_arr, function(i, item){
            values.tutorial_id = item;
            values.sequence = i;
            util.query(conn, sql, values, function(result){
              if(result.status==0){
                return util.raiseErr(res, result.info);
              }
            });
          });
          
            return cb(null);
          
        },
        function(cb){
          sql = sqlMapping.DG_work.update+" WHERE work_id = "+param.work_id;
          values = [{status:1}];
          util.query(conn, sql, values, function(result){
            if(result.status==0){
              return cb(result.info);
            } else {
              return cb(null, true);
            }
          });
        },
      ], function (err, result){//result is array
        conn.release();
        if(err){
          return util.raiseErr(res, err);
        }
        return util.write(res, true);
      }
    );
  });
}

methods.listUser = function(req, res, next){
  columns = ["user_id", "nickname"];
  values = [columns];
  sql = sqlMapping.DG_user.list;
  var param = util.checkParam(req, res, []);
  if(param.keyword){
    values.push(param.keyword);
    values.push(param.keyword);
    values.push(param.keyword);
    sql+=" WHERE `nickname` LIKE ? OR `email` LIKE ? ";
  }
  sql += "ORDER BY `user_id` ASC";
  pool.getConnection(function(err, conn) {
    if(err){
      return util.raiseErr(res, 200, "conn err:" + err);
    }
    util.query(conn, sql, values, function(result){
      conn.release();
      if(result.status==0){
        return util.raiseErr(res, result.info);
      } else {
        return util.write(res, result.info);
      }
    });
  });
};
methods.listUserMission = function(req, res, next){
  var param = util.checkParam(req, res, ["user_id", "course_id"]);
  if(!param){
    return false;
  }
  columns = ["mission_id", "title"];
  values = [columns, param.user_id, param.course_id];
  sql = sqlMapping.DGvw_userMission.list + " WHERE user_id = ? AND course_id = ? ORDER BY `sequence` ASC";
  
  pool.getConnection(function(err, conn) {
    if(err){
      return util.raiseErr(res, 200, "conn err:" + err);
    }
    util.query(conn, sql, values, function(result){
      conn.release();
      if(result.status==0){
        return util.raiseErr(res, result.info);
      } else {
        return util.write(res, result.info);
      }
    });
  });
};
methods.setMissionLine = function(req, res, next){
  var param = util.checkParam(req, res, ["user_id", "mission_list", "course_id"]);
  if(!param){
    return false;
  }
  
  
  
  pool.getConnection(function(err, conn) {
    if(err){
      return util.raiseErr(res, 200, "conn err:" + err);
    }
    $async.series(
      [
        function(cb){
          values = [param.user_id, param.course_id];
          sql = sqlMapping.DG_missionLine.del + "WHERE `user_id` = ? AND `course_id` = ?";
          //console.log(sql);
          util.query(conn, sql, values, function(result){
            if(result.status==0){
              return cb(result.info);
            }
            return cb(null);
          });
        },
        function(cb){
          sql = sqlMapping.DG_missionLine.insert;
          obj = {user_id:param.user_id, course_id:param.course_id};
          console.log(param.mission_list);
          util.each(param.mission_list,function(i ,item){
            obj.mission_id = item;
            obj.sequence = i;
            
            util.query(conn, sql, [obj], function(result){
              if(result.status==0){
                return util.raiseErr(res, result.info);
              }
            });
          });
         
          return cb(null, true);
         
          //console.log(sql);
        }
      ], function (err, result){//result is array
        conn.release();
        if(err){
          return util.raiseErr(res, err);
        }
        
          return util.write(res, true);
        
      }
    );
  });
};


module.exports = methods;