var util = require('../util/util');
var middleware = {};
middleware.checkUserLogin = function(req, res, next){
  if(!req.session.user_id || !req.session.privilege){
    return util.raiseErr(res, [100, "未登录"]);
  } else{
    return next();
  }
            
}
middleware.checkAdminLogin = function(req, res, next){
  if(!req.session.user_id || !req.session.privilege){
    return util.raiseErr(res, [100, "未登录"]);
  } else if(req.session.privilege < 2){
    return util.raiseErr(res, [101, "无权限"]);
  } else {
    return next();
  }
            
}


module.exports = middleware;