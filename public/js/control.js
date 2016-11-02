document.write("<script   src='js/reqMapping.js'></script>");
var i,j,k;
$("refresh").CK(function(){
  var event_name = "";
  var target = "";
  var events = $(":event");
  for(i = 0; i<events.length; i++){
    if(events[i].checked == true){
      event_name = events[i].id.split("-")[1];
    }
  }
  window[event_name].refresh()
});

var mission = new function(){
  var that = this;
  var div, str, result, obj,values;
  that.course_id = 1;
  that.refresh = function(){
    values = {course_id: that.course_id};
    that.keyword = $("mission-content-"+that.course_id).getElementsByClassName("search")[0].value;
    that.listMission();
  }
  var labels = $(".mission-label");
  for(i=0;i<labels.length;i++){
    $(labels[i]).CK(function(e){
      that.course_id = e.getAttribute("for").split("-")[1];
    });
  }
  var searchs = $("mission-content").getElementsByClassName("search");
  for(i=0;i<searchs.length;i++){
    $(searchs[i]).KD(function(e){
      var e = e || window.event; 
      if(event.keyCode == 13){
        that.keyword = e.value;
        that.listMission();
      }
    });
  }
  var addNews = $("mission-content").getElementsByClassName("add");
  for(i=0;i<searchs.length;i++){
    $(addNews[i]).CK(function(e){
      var add_div = $($("mission-content-"+that.course_id).getElementsByClassName("center-add")[0]);
      if(add_div.hasClass("none")){
        add_div.removeClass("none");
      } else {
        add_div.addClass("none");
      }
    });
  }
  
  that.listMission = function(){
    var values = {course_id: that.course_id};
    if(that.keyword != ""){
      values.keyword = that.keyword;
    }
    
    $.get(reqMapping.control.listMission, values, function(html){
      obj = JSON.parse(html);
      if(obj.status == 0){
        
      }
      result = obj.result;
      
      str = '<div class = "mission"><span></span><img class = "mission-open" src = "img/control/add.png"></div><div class = "mission-info none" enctype="multipart/form-data"><div class = "mission-title"><span>标题:</span><input name = "title"></div><div class = "mission-intro"><span>引言:</span><input name = "intro"></div><div class = "mission-rule">  <span>规则:</span><textarea name = "rule"></textarea></div><label class = "mission-line"><input type = "checkbox" name = "line">支线</label><div class = "mission-example">  <span >例图:</span><input type = "file" name = "example"><div class = "mission-img"></div></div><div class = "mission-operation"><div class = "mission-submit">确定</div></div></div>';
      var zone = $($("mission-content-"+that.course_id).getElementsByClassName("item-list")[0]);
      zone.innerHTML = "";
      result.forEach(function(item,i,input){
        div = zone.CC("div").S({CN:"item", I:str});
        div.children[0].children[0].innerHTML = item.title;
        
        $(div.children[0].children[1]).CK(function(e){
          if($($(e.PN).PN.children[1]).hasClass("none")){
            $($(e.PN).PN.children[1]).removeClass("none");
          } else {
            $($(e.PN).PN.children[1]).addClass("none");
          }
        });
        
        
        var title = div.children[1].children[0].children[1];
        title.value = item.title;
        var intro = div.children[1].children[1].children[1];
        intro.value = item.intro;
        var rule = div.children[1].children[2].children[1];
        rule.value = item.rule;
        var line = div.children[1].children[3].children[0];
        line.checked = true ? item.line == 1 : false;
        var img_zone = div.children[1].children[4].children[2];
        var file_btn = $(div.children[1].children[4].children[1]);
        file_btn.img_zone = img_zone;
        file_btn.CG(function(e){
          var file = e.files[0];
          var data = new FormData();
          data.append("dirName", "mission");
          data.append("uploadFile", file);
          var req = new XMLHttpRequest();
          req.open("POST", reqMapping.control.uploadFile, false);
          req.send(data);
          var src = JSON.parse(req.responseText)["result"];
          var reader = new FileReader();
          reader.file = file;
          reader.onload = function() {
            var img = e.img_zone.CC("img");
            img.S({src: this.result}).ATT({bind:src}).CK(function(e){
              e.remove();
            });
          }
          reader.readAsDataURL(file); 
        });
        examples = item.example.split(";");
        examples.forEach(function(item1,i,input){
          var img = $(img_zone).CC("img");
          img.S({src: item1}).ATT({bind:item1}).CK(function(e){
            e.remove();
          });
        });
        
        submit_btn = $(div.getElementsByClassName("mission-submit")[0]);
        submit_btn.mission_id = item.mission_id;
        submit_btn.title_ = title;
        submit_btn.intro_ = intro;
        submit_btn.rule_ = rule;
        submit_btn.line_ = line;
        submit_btn.img_zone = $(img_zone);
        
        submit_btn.CK(function(e){
          var values = {};
          var mission_id = e.mission_id;
          if(mission_id != 0){
            values.mission_id = mission_id;
          }
          values.title = e.title_.value;
          values.intro = e.intro_.value;
          values.rule = e.rule_.value;
          values.line = 1 ? e.line_.checked == true : 0;
         
          var example = [];
          var imgs =img_zone.children; 
          for(i = 0;i<imgs.length;i++){
            var src = imgs[i].getAttribute("bind");
            example.push(src);
          }
          
          values.example = example.join(";");
          $.post(reqMapping.control.addMission, values, function(html){
            var result = JSON.parse(html).result;
            alert(result);
          })
        });
      });
    });
  }
  
}



