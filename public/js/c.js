document.write("<script src='js/reqMapping.js'></script>");
var i,j,k;
var actions = ["mission, tutorial"];
var main = new function(){
  var that = this;
  that.action = 0;
  var actionTabs = $(".actionTab");
  that.contents = $(".content");
  $.each(actionTabs, function(i, item){
    $(item).CK(function(e){
      $.each(actionTabs, function(i, item){
        $(item).removeClass("actionTab-checked");
        $(that.contents[i]).addClass("none");
      });
      e.addClass("actionTab-checked");
      $(that.contents[i]).removeClass("none");
    });
  });
  $("refresh").CK(function(){
    var event_names = ["mission", "tutorial", "rating"];
    var events = $(":event");
    $.each(actionTabs, function(i, item){
      if($(item).hasClass("actionTab-checked")){
        window[event_names[i]].refresh();
      }
    });
  });
  
}
var mission = new function(){
  var that = this;
  that.course_id = 0;
  that.keyword = "";
  that.content = $(main.contents[0]);
  var courseTabs = $(that.content.getElementsByClassName("contentTag"));
  var page = $(that.content.getElementsByClassName("contentPage")[0]);
  var topBar = page.C[0];
  var zone = $(page.C[1]);
  var searchInput = $(topBar.children[0]);
  searchInput.KD(function(e){
    if(event.keyCode == 13){
      that.keyword = e.value;
      that.getMissionList();
    }
  });
  var addMissionBtn = $(topBar.children[1]);
  addMissionBtn.CK(function(e){
    if(missionAdd.hasClass("none")){
      missionAdd.removeClass("none");
      missionAdd.C[1].children[3].children[0].innerHTML = categoryStr[that.course_id];
    }
  });
  $.each(courseTabs, function(i, item){
    item.course_id = i;
    $(item).CK(function(e){
      $.each(courseTabs, function(i, item){
        $(item).removeClass("contentTag-checked");
      });
      that.course_id = e.course_id;
      e.addClass("contentTag-checked");
      zone.innerHTML = "";
    });
  });
  var categoryStr = [
    '<option value = 0>切面</option><option value = 1>画皮</option><option value = 2>五官</option><option value = 3>空间-质-量感</option><option value = 4>人体</option>',
    '<option value = 0>切面</option><option value = 1>画皮</option><option value = 2>五官</option><option value = 3>空间-质-量感</option><option value = 4>人体</option>',
    '<option value = 0>切面</option><option value = 1>画皮</option><option value = 2>五官</option><option value = 3>空间-质-量感</option><option value = 4>人体</option>',
    '<option value = 0>切面</option><option value = 1>画皮</option><option value = 2>五官</option><option value = 3>空间-质-量感</option><option value = 4>人体</option>'
  ];
  
  missionAdd = $(that.content.children[0]);
  $(missionAdd.C[0]).CK(function(e){
    e.PN().addClass("none");
  });
  var missionAddZone = $(missionAdd.C[1]);
  var imgBtn = $(missionAddZone.children[5].children[1]);
  imgBtn.CG(function(e){
    var imgZone = $(e.PN().C[2]);
    var file = e.files[0];
    var data = new FormData();
    data.append("uploadFile", file);
    var req = new XMLHttpRequest();
    req.open("POST", reqMapping.control.missionUploadFile, false);
    req.send(data);
    var src = JSON.parse(req.responseText)["result"];
    var reader = new FileReader();
    reader.file = file;
    reader.onload = function() {
      var img = imgZone.CC("img").S({CN:"missionImgs"});
      img.S({src: this.result}).ATT({bind:src}).CK(function(e){
        e.remove();
      });
    }
    reader.readAsDataURL(file); 
  });
  var submit_btn = $(missionAddZone.C[6].children[0]);
  submit_btn._title = missionAddZone.C[0].children[1];
  submit_btn._intro = missionAddZone.C[1].children[1];
  submit_btn._rule = missionAddZone.C[2].children[1];
  submit_btn._category = missionAddZone.C[3].children[0];
  submit_btn._line = missionAddZone.C[4].children[0];
  submit_btn._imgZone = missionAddZone.C[5].children[2];
  submit_btn.CK(function(e){
    var values = {};
    values.title = e._title.value;
    values.intro = e._intro.value;
    values.rule = e._rule.value;
    values.category_id = e._category.value;
    values.line = 1 ? e._line.checked == true : 0;
    values.course_id = that.course_id;
    
    var example = [];
    var imgs =e._imgZone.children; 
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
  that.refresh = function(){
    that.getMissionList();
  }
    
    
  
  that.getMissionList = function(){
    var values = {course_id: that.course_id};
    if(that.keyword != ""){
      values.keyword = that.keyword;
    }
    $.get(reqMapping.control.listMission, values, function(html){
      obj = JSON.parse(html);
      if(obj.status == 0){
        
      }
      result = obj.result;
      that.listMission(result);
    });
  }
  
  that.listMission = function(result){
    var str = '<div class = "mission"><span></span><img class = "missionOpen" src = "img/control/add.png"></div><div class = "missionInfo none"><div class = "missionAddTitle"><span>标题:</span><input></div><div class = "missionAddIntro"><span>引言:</span><input></div><div class = "missionAddRule">  <span>规则:</span><textarea></textarea></div><div class = "missionAddCategory">分类<select>'+categoryStr[that.course_id]+'</select></div><label class = "missionAddLine"><input type = "checkbox">支线</label><div class = "missionAddExample"><span>例图:</span><input type = "file"><div class = "missionAddImg"></div></div><div class = "missionAddOperation"><div class = "missionAddSubmit">确定</div></div></div>';
    zone.innerHTML = "";
    $.each(result, function(i, item){
      div = zone.CC("div").S({CN:"item", I:str});
      div.children[0].children[0].innerHTML = item.title;
      
      $(div.children[0].children[1]).CK(function(e){
        if($($(e.PN()).PN().children[1]).hasClass("none")){
          $($(e.PN()).PN().children[1]).removeClass("none");
        } else {
          $($(e.PN()).PN().children[1]).addClass("none");
        }
      });
      var title = div.children[1].children[0].children[1];
      title.value = item.title;
      var intro = div.children[1].children[1].children[1];
      intro.value = item.intro;
      var rule = div.children[1].children[2].children[1];
      rule.value = item.rule;
      var category = div.children[1].children[3].children[0];
      $.selectOption(category, item.category_id);
      var line = div.children[1].children[4].children[0];
      line.checked = true ? item.line == 1 : false;
      var imgZone = div.children[1].children[5].children[2];
      var imgBtn = $(div.children[1].children[5].children[1]);
      imgBtn.imgZone = imgZone;
      imgBtn.CG(function(e){
        var file = e.files[0];
        var data = new FormData();
        data.append("uploadFile", file);
        var req = new XMLHttpRequest();
        req.open("POST", reqMapping.control.missionUploadFile, false);
        req.send(data);
        var src = JSON.parse(req.responseText)["result"];
        var reader = new FileReader();
        reader.file = file;
        reader.onload = function() {
          var img = e.imgZone.CC("img").S({CN:"missionImgs"});
          img.S({src: this.result}).ATT({bind:src}).CK(function(e){
            e.remove();
          });
        }
        reader.readAsDataURL(file); 
      });
      examples = item.example.split(";");
      $.each(examples,function(i, item1){
        var img = $(imgZone).CC("img").S({CN:"missionImgs"});
        img.S({src: item1}).ATT({bind:item1}).CK(function(e){
          e.remove();
        });
      });
      
      
      submit_btn = $(div.children[1].children[6].children[0]);
      submit_btn.mission_id = item.mission_id;
      submit_btn._title = title;
      submit_btn._intro = intro;
      submit_btn._rule = rule;
      submit_btn._category = category;
      submit_btn._line = line;
      submit_btn._imgZone = $(imgZone);
      
      submit_btn.CK(function(e){
        var values = {};
        values.mission_id = e.mission_id;
        values.course_id = that.course_id;
        values.title = e._title.value;
        values.intro = e._intro.value;
        values.rule = e._rule.value;
        values.category_id = e._category.value;
        values.line = 1 ? e._line.checked == true : 0;
       
        var example = [];
        var imgs = e._imgZone.children; 
        for(i = 0;i<imgs.length;i++){
          var src = imgs[i].getAttribute("bind");
          example.push(src);
        }
        
        values.example = example.join(";");
        $.post(reqMapping.control.addMission, values, function(html){
          var obj = JSON.parse(html);
          if(obj.status==0){
            alert(obj.errMsg);
          } else {
            alert(true);
          }
        })
      });
    });
  };
};
var tutorial = new function(){
  var that = this;
  that.course_id = 0;
  that.keyword = "";
  that.content = $(main.contents[1]);
  var courseTabs = $(that.content.getElementsByClassName("contentTag"));
  var page = $(that.content.getElementsByClassName("contentPage")[0]);
  $.each(courseTabs, function(i, item){
    item.course_id = i;
    $(item).CK(function(e){
      $.each(courseTabs, function(i, item){
        $(item).removeClass("contentTag-checked");
      });
      zone.innerHTML = "";
      e.addClass("contentTag-checked");
      that.course_id = e.course_id;
    });
  });
  var searchInputs = that.content.getElementsByClassName("search");
  $.each(searchInputs, function(i, item){
    $(item).KD(function(e){
      if(event.keyCode == 13){
        that.keyword = e.value;
        that.getTutorialList();
      }
    });
  });
  that.refresh = function(){
    that.getTutorialList();
  }
  that.getTutorialList = function(){
    var values = {course_id: that.course_id};
    if(that.keyword != ""){
      values.keyword = that.keyword;
    }
    $.get(reqMapping.control.listTutorial, values, function(html){
      obj = JSON.parse(html);
      if(obj.status == 0){
        alert(obj.errMsg);
      }
      result = obj.result;
      that.listTutorial(result);
    });
  }
  var zone = $(page.getElementsByClassName("itemList")[0]);
  that.listTutorial = function(result){
    var str = '<div class = "mission"><span></span><a target="_blank" class = "itemBtn" style = "float:right">编辑</a></div>';
    zone.innerHTML = "";
    $.each(result, function(i, item){
      div = zone.CC("div").S({CN:"item", I:str});
      div.children[0].children[0].innerHTML = item.title;
      div.children[0].children[1].href = "/htmlEditor.html?tutorial_id="+item.tutorial_id;
    });
  };
};

var rating = new function(){
  var that = this;
  that.keyword = "";
  that.content = $(main.contents[2]);
  var workZone = $(that.content.C[0]);
  that.refresh = function(){
    that.getNewWorkList();
  }
  that.getNewWorkList = function(){
    $.get(reqMapping.control.listNewWork, null, function(html){
      obj = JSON.parse(html);
      if(obj.status == 0){
        alert(obj.errMsg);
      }
      result = obj.result;
      that.listNewWork(result);
    });
  }
  that.listNewWork = function(result){
    var str = '<div class = "newWork"><img class = "newWorkAvatar"><div class = "newWorkNickname"></div><div class = "newWorkTitle"></div></div>';
    workZone.innerHTML = "";
    $.each(result, function(i, item){
      div = workZone.CC("div").S({CN:"item", I:str});
      div.children[0].children[0].src = item.avatar;
      div.children[0].children[1].innerHTML = item.nickname;
      div.children[0].children[2].innerHTML = item.title;
      div.img = item.img;
      div.message = item.message;
      div.work_id = item.work_id;
      div.user_id = item.user_id;
      div.course_id = item.course_id;
      
      //div.children[0].children[1].innerHTML = item.title;
      //div.avatar = item.avatar
      
      div.CK(function(e){
        that.clear();
        that.showWork(e);
        that.getPastWorkList(e);
      });
    });
  }
  
  
  var right = $(that.content.C[1]);
  var showWorkZone =  $(right.C[0]);
  var user_img = $(showWorkZone.C[0]);
  user_img.CK(function(e){
    bigImgContent.removeClass("none");
    bigImgContent.C[1].children[0].src = e.src;
  });
  var user_msg = $(showWorkZone.C[1]);
  that.showWork = function(div){
    that.work_id = div.work_id;
    user_img.src = div.img;
    user_msg.innerHTML = div.message;
  }
  
  var answerZone = $(right.C[1]);
  var answer_msg = $(answerZone.C[0]);
  var rank = answerZone.C[1].children[0];
  var btn = $(answerZone.C[1].children[1]);
  var tutorialBtns = $(answerZone.C[2])
  $.each(tutorialBtns.C , function(i, item){
   item.tutorial_id = 0;
   $(item).CK(function(e){
      if(e.tutorial_id!=0){
        e.tutorial_id = 0;
        e.title = "";
        e.innerHTML = "添加教程";
      } else {
        that.tutorialBtn = e;
        that.showTutorial();
      }
    });
  });
  var pastWorkZone = $(right.C[2]);
  that.getPastWorkList = function(div){
    var values = {user_id:div.user_id};
    $.get(reqMapping.control.listPastWork, values ,function(html){
      var obj = JSON.parse(html);
      if(obj.status==0){
        
      } else {
        var result = obj.result;
        that.listPastWork(result);
      }
    });
  }
  var rankArr = ["无", "C","B","A"];
  that.listPastWork = function(result){
    var str = '<div class = "pastWorkLeft"><img class = "workInfoImg"><div class = "workInfoMsg"></div></div><div class = "pastWorkRight"><div class = "pastWorkTime">time</div><div class = "ratingMsg"></div><div class = "pastWorkStar"></div> </div>';
    pastWorkZone.innerHTML = "";
    $.each(result, function(i, item){
      div = pastWorkZone.CC("div").S({CN:"pastWorkItem", I:str});
      div.children[0].children[0].src = item.img;
      div.children[0].children[1].innerHTML = item.message;
      div.children[1].children[0].innerHTML = item.createtime;
      div.children[1].children[1].innerHTML = item.answer;
      div.children[1].children[2].innerHTML = rankArr[item.rank];
    });
  }
  
  
  
  var workTutorial = $(that.content.C[2]);
  $(workTutorial.C[0]).CK(function(e){
    workTutorial.addClass("none");
  })
  var tutorialZone = $(workTutorial.C[1].children[2]);
  
  
  var courseTabs = $(workTutorial.getElementsByClassName("contentTag"));
  $.each(courseTabs, function(i, item){
    item.course_id = i;
    $(item).CK(function(e){
      $.each(courseTabs, function(i, item){
        $(item).removeClass("contentTag-checked");
      });
      that.course_id = e.course_id;
      e.addClass("contentTag-checked");
      tutorialZone.innerHTML = "";
    });
  });
  $(workTutorial.C[1].children[1].children[0]).KD(function(e){
    if(event.keyCode == 13){
      that.keyword = e.value;
      that.getTutorialList();
    }
  });
  
  that.clear = function(){
    user_img.src = "";
    user_msg.innerHTML = "";
    answer_msg.value = "";
    rank.value = "";
    $.each(tutorialBtns.C , function(i, item){
      item.tutorial_id = 0;
      item.title = "";
      item.innerHTML = "添加教程";
    });
    pastWorkZone.innerHTML = "";
  }
  
  btn.CK(function(e){
    var values = {answer:answer_msg.value, rank:rank.value, work_id:that.work_id};
    var arr = [];
    $.each(tutorialBtns.C , function(i, item){
      if(item.tutorial_id!=0){
        arr.push(item.tutorial_id);
      }
    });
    values.tutorials = arr;
    $.post(reqMapping.control.addRating, values, function(html){
      var obj = JSON.parse(html);
      if(obj.status ==1){
        alert("success");
      }
    });
  });
  
  that.showTutorial = function(){
    workTutorial.removeClass("none");
    tutorialZone.innerHTML = "";
  }
  that.getTutorialList = function(){
    var values = {course_id: that.course_id};
    if(that.keyword != ""){
      values.keyword = that.keyword;
    }
    $.get(reqMapping.control.listTutorial, values, function(html){
      obj = JSON.parse(html);
      if(obj.status == 0){
        alert(obj.errMsg);
      }
      result = obj.result;
      that.listTutorial(result);
    });
  }
  that.listTutorial = function(result){
    var str = '<div class = "mission"><span></span><div class = "itemBtn" style = "float:right">添加</div></div>';
    tutorialZone.innerHTML = "";
    $.each(result, function(i, item){
      div = tutorialZone.CC("div").S({CN:"item", I:str});
      div.children[0].children[0].innerHTML = item.title;
      div.children[0].children[1].tutorial_id = item.tutorial_id;
      div.children[0].children[1].title = item.title;
      $(div.children[0].children[1]).CK(function(e){
        that.tutorialBtn.innerHTML = e.title;
        that.tutorialBtn.tutorial_id = e.tutorial_id;
        workTutorial.H();
      });
    });
  }
  
  var bigImgContent = $(that.content.C[3]);
  $(bigImgContent.C[0]).CK(function(e){
    bigImgContent.addClass("none");
  });
}
var user = new function(){
  var that = this;
  that.keyword = "";
  that.content = $(main.contents[3]);
  var userContent = $(that.content.C[0])
  var searchInputs = userContent.getElementsByClassName("search");
  $(searchInputs[0]).KD(function(e){
    if(event.keyCode == 13){
      that.keyword = e.value;
      that.getUserList();
    }
  });
  that.refresh = function(){
    that.getUserList();
  }
  that.getUserList = function(){
    var values = {};
    if(that.keyword != ""){
      values.keyword = that.keyword;
    }
    $.get(reqMapping.control.listUser, values, function(html){
      obj = JSON.parse(html);
      if(obj.status == 0){
        alert(obj.errMsg);
      }
      result = obj.result;
      that.listUser(result);
    });
  }
  var userZone = $(userContent.getElementsByClassName("itemList")[0]);
  that.listUser = function(result){
    var str = '<div class = "mission"><div class = "userNickname"></div><div class = "missionLineEnter"><select><option value = 0 >素描</option><option value = 1 >色彩</option><option value = 2 >速写</option></select><div class = "itemBtn">编辑</div><div class = "itemBtn">完成作业</div></div></div>';
    userZone.innerHTML = "";
    $.each(result, function(i, item){
      div = userZone.CC("div").S({CN:"item", I:str});
      div.children[0].children[0].innerHTML = item.nickname;
      div.children[0].children[1].children[1].user_id = item.user_id;
      $(div.children[0].children[1].children[1]).CK(function(e){
        that.course_id = e.PN().C[0].value;
        that.user_id = e.user_id;
        that.showMission();
      });
      div.children[0].children[1].children[2].user_id = item.user_id;
      $(div.children[0].children[1].children[2]).CK(function(e){
        that.course_id = e.PN().C[0].value;
        that.user_id = e.user_id;
        that.showPastWork();
      });
    });
  }
  var usercontent = $(that.content.C[1]);
  $(usercontent.C[0]).CK(function(e){
    usercontent.addClass("none");
  })
  that.showMission = function(){
    usercontent.removeClass("none");
    that.getUserMissionList();
  }
  that.getUserMissionList = function(){
    var values = {user_id:that.user_id, course_id:that.course_id};
    
    $.get(reqMapping.control.listUserMission, values, function(html){
      obj = JSON.parse(html);
      if(obj.status == 0){
        alert(obj.errMsg);
      }
      result = obj.result;
      that.listUserMission(result);
    });
  }
  var userMissionZone = $(usercontent.C[1].children[0].children[1]);
  that.listUserMission = function(){
    var str = '<div class = "mission"><span>11111</span><div class = "userMissionC"><div class = "inlineBtn">up</div><div class = "inlineBtn">down</div><div class = "inlineBtn">del</div></div></div>';
    userMissionZone.innerHTML = "";
    $.each(result, function(i, item){
      div = userMissionZone.CC("div").S({CN:"item", I:str});
      div.children[0].children[0].innerHTML = item.title;
      div.mission_id = item.mission;
      $(div.children[0].children[1].children[0]).CK(function(e){
        if(e.PN().PN().PN().previousSibling){
          $.domExchange(e.PN().PN().PN().previousSibling, e.PN().PN().PN());
        }
      });
      $(div.children[0].children[1].children[1]).CK(function(e){
        if(e.PN().PN().PN().nextSibling){
          $.domExchange(e.PN().PN().PN().nextSibling, e.PN().PN().PN());
        }
      });
      
      div.children[0].children[1].children[2].mission_id = item.mission_id;
      $(div.children[0].children[1].children[2]).CK(function(e){
        userMissionZone.removeChild(e.PN().PN().PN());
      });
    });
  }
  var missionContent = $(usercontent.C[1].children[1]);
  var missionSearch = $(missionContent.C[0].children[0]);
  var missionZone = $(missionContent.C[1]);
  missionSearch.KD(function(e){
    if(event.keyCode == 13){
      that.keyword2 = e.value;
      that.getMissionList();
    }
  });
  that.getMissionList = function(){
    var values = {course_id:that.course_id};
    if(that.keyword2!=""){
      values.keyword = that.keyword2;
    }
    $.get(reqMapping.control.listMission, values, function(html){
      var obj = JSON.parse(html);
      if(obj.status==0){
        
      }else {
        var result = obj.result;
        that.listMission(result);
      }
    });
  }
  that.listMission = function(result){
    var str = '<div class = "mission"><span></span><div class = "itemBtn"  style = "float:right">添加</div></div>';
    missionZone.innerHTML = "";
    $.each(result, function(i, item){
      div = missionZone.CC("div").S({CN:"item", I:str});
      div.children[0].children[0].innerHTML = item.title;
      div.children[0].children[1].mission_id = item.mission_id;
      div.mission_id = item.mission_id;
      div.children[0].children[1].title = item.title;
      $(div.children[0].children[1]).CK(function(e1){
        div = userMissionZone.CC("div").S({CN:"item", I:'<div class = "mission"><span>11111</span><div class = "userMissionC"><div class = "inlineBtn">up</div><div class = "inlineBtn">down</div><div class = "inlineBtn">del</div></div></div>'});
        div.children[0].children[0].innerHTML = e1.title;
        div.mission_id = e1.mission_id;
        $(div.children[0].children[1].children[0]).CK(function(e){
          if(e.PN().PN().PN().previousSibling){
            $.domExchange(e.PN().PN().PN().previousSibling, e.PN().PN().PN());
          }
        });
        $(div.children[0].children[1].children[1]).CK(function(e){
          if(e.PN().PN().PN().nextSibling){
            $.domExchange(e.PN().PN().PN().nextSibling, e.PN().PN().PN());
          }
        });
        
        div.children[0].children[1].children[2].mission_id = e1.mission_id;
        $(div.children[0].children[1].children[2]).CK(function(e){
          userMissionZone.removeChild(e.PN().PN().PN());
        });
      });
    });
  }
  var missionBtn = $(usercontent.C[1].children[0].children[0]);
  missionBtn.CK(function(e){
    var values = {};
    values.user_id = that.user_id;
    values.course_id = that.course_id;
    values.mission_list = [];
    $.each(userMissionZone.C, function(i, item){
      if(item.mission_id)
      values.mission_list.push(item.mission_id);
    });
    $.post(reqMapping.control.setMissionLine, values, function(html){
      var obj = JSON.parse(html);
      if(obj.status == 0){
        alert(obj.errMsg);
      } else {
        alert(true);
      }
    })
  });
  var pastWorkContent = $(that.content.C[2]);
  $(pastWorkContent.C[0]).CK(function(e){
    pastWorkContent.addClass("none");
  });
  that.showPastWork = function(){
    pastWorkContent.removeClass("none");
    that.getPastWorkList();
  }
  var pastWorkZone = $(pastWorkContent.C[1].children[0]);
  that.getPastWorkList = function(){
    var values = {user_id:that.user_id, course_id:that.course_id};
    $.get(reqMapping.control.listPastWork,values,function(html){
      var obj = JSON.parse(html);
      if(obj.status==0){
        
      }else{
        var result = obj.result;
        that.listPastWork(result);
      }
    })
  }
  var rankArr = ["无", "C","B","A"];
  that.listPastWork = function(result){
    var str = '<div class = "pastWorkLeft"><img class = "workInfoImg"><div class = "workInfoMsg"></div></div><div class = "pastWorkRight"><div class = "pastWorkTime">time</div><div class = "ratingMsg"></div><div class = "pastWorkStar"></div> </div>';
    pastWorkZone.innerHTML = "";
    $.each(result, function(i, item){
      div = pastWorkZone.CC("div").S({CN:"pastWorkItem", I:str});
      div.children[0].children[0].src = item.img;
      div.children[0].children[1].innerHTML = "用户留言:"+item.message;
      div.children[1].children[0].innerHTML = "完成时间:"+item.createtime;
      div.children[1].children[1].innerHTML = "回复:"+item.answer;
      div.children[1].children[2].innerHTML = rankArr[item.rank];
    });
  }
}

