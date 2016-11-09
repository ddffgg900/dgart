document.write("<script src='js/reqMapping.js'></script>");
var $j = $.noConflict();
var progress = new function(){
  var that = this;
  var zone = $("progress_viewport");
  that.getMission = function(){
    var arr = [];
  }
  that.listMission = function(result){
    that.createBtn();
  }
  
  that.createBtn = function(){
    var btn_zone = $("progress_viewport_tab");
    var Sheight = 379;
    $.each(btn_zone.C, function(i, item){
      item._index = i;
      $(item).CK(function(e){
        var index = e._index;
        $j(zone).stop(false, false).animate({top: -index*Sheight+"px"},300);
        
      });
    });
  }
}
var enter = new function(){
  var that = this;
  var zone = $("enter_viewport");
  that.getMission = function(){
    var arr = [];
  }
  that.listMission = function(result){
    that.bindBtn();
  }
  
  that.bindBtn = function(){
    var left = $("enter_viewport_left");
    var right = $("enter_viewport_right");
    var index = 0;
    var Swidth = 348;
    var len = zone.C.length;
    var w = len*Swidth;
    zone.S({W:w});
    $(zone.C[len-1]).S({MR:0});
    left.CK(function(){
      index++;
      $j(zone).stop(false, false).animate({left: -index*Swidth+"px"},300);
    });
    right.CK(function(){
      index--;
      $j(zone).stop(false, false).animate({left: -index*Swidth+"px"},300);
    });
  }
}

$("calendar").CK(function(e){
  $.post(reqMapping.index.clock, null, function(html){
    var obj = JSON.parse(html);
    if(obj.status == 0){
      alert(obj.errMsg);
    } else {
      var result = obj.result;
      alert(result);
    }
  });
});




  progress.createBtn();
  enter.bindBtn();
