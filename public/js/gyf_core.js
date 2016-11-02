var $;
(function(){
  "use strict";
  $ = function(e){
    var node;
    if(typeof(e) !== "undefined" && e !== null){
      if(typeof(e) === "string"){
        if(e.indexOf(".") > -1){
          return document.getElementsByClassName(e.substring(1));
        }
        if(e.indexOf(":") > -1){
          return document.getElementsByName(e.substring(1));
        }
        node = document.getElementById(e);
      }
      if(typeof(e) === "object"){
        node = e;
      }
      return new pro(node).init();
    }
  };
  var pro = function(node){
    this.node = node;
  };
  pro.prototype = {
    CK: function(fn){
      this.onclick = function(e){
        e = e || window.event;
        e.stopPropagation();
        var target = e.currentTarget || e.srcElement;
        fn(target);
      };
    },
    KD: function(fn){
      this.onkeydown = function(e){
        e = e || window.event;
        e.stopPropagation();
        var target = e.currentTarget || e.srcElement;
        fn(target);
      };
    },
    CG: function(fn){
      this.onchange = function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        fn (target);
      };
    },
    CC: function(type){
      var new_node = document.createElement(type);
      this.appendChild (new_node);
      return $(new_node);
    },
    S: function(obj){
      var i;
      var a;
      for(i in obj){
        if(obj.hasOwnProperty(i)){
          a = "";
          switch(i){
            case "W":
              a = "width";
              this.style[a] = $.topx(obj[i]);
              break;
            case "H":
              a = "height";
              this.style[a] = $.topx(obj[i]);
              break;
            case "P":
              a = "position";
              if(obj[i] === "a"){
                this.style[a] = "absolute";
              }else if(obj[i] === "r"){
                this.style[a] = "relative";
              }
              break;
            case "T":
              a = "top";
              this.style[a] = $.topx(obj[i]);
              break;
            case "B":
              a = "bottom";
              this.style[a] = $.topx(obj[i]);
              break;
            case "L":
              a = "left";
              this.style[a] = $.topx(obj[i]);
              break;
            case "R":
              a = "right";
              this.style[a] = $.topx(obj[i]);
              break;
            case "MT":
              a = "marginTop";
              this.style[a] = $.topx (obj[i]);
              break;
            case "MB":
              a = "marginBottom";
              this.style[a] = $.topx (obj[i]);
              break;
            case "ML":
              a = "marginLeft";
              this.style[a] = $.topx (obj[i]);
              break;
            case "MR":
              a = "marginRight";
              this.style[a] = $.topx (obj[i]);
              break;
            case "D":
              a = "display";
              if(obj[i] === "i"){
                this.style[a] = "inline";
              }else if(obj[i] === "b"){
                this.style[a] = "block";
              }else if(obj[i] === "ib"){
                this.style[a] = "inline-block";
              }
              break;
            case "C":
              a = "color";
              this.style[a] = obj[i];
              break;
            case "FS":
              a = "fontSize";
              this.style[a] = $.topx (obj[i]);
              break;
            case "FL":
              a = "float";
              this.style[a] = obj[i];
              break;
            case "BD":
              a = "border";
              this.style[a] = obj[i];
              break;
            case "M":
              a = "margin";
              this.style[a] = obj[i];
              break;
            case "I":
              a = "innerHTML";
              this[a] = obj[i];
              break;
            case "src":
              a = "src";
              this[a] = obj[i];
              break;
            case "CN":
              a = "className";
              this[a] = obj[i];
              break;
            case "ID":
              a = "id";
              this[a] = obj[i];
              break;
            case "V":
              a = "value";
              this[a] = obj[i];
              break;
            case "LH":
              a = "lineHeight";
              this.style[a] = $.topx (obj[i]);
              break;
            case "BG":
              a = "background";
              this.style[a] = obj[i];
              break;
            case "BR":
              a = "borderRadius";
              this.style[a] = $.topx (obj[i]);
              break;
            case "PT":
              a = "paddingTop";
              this.style[a] = $.topx (obj[i]);
              break;
            case "PB":
              a = "paddingBottom";
              this.style[a] = $.topx (obj[i]);
              break;
            case "PL":
              a = "paddingLeft";
              this.style[a] = $.topx (obj[i]);
              break;
            case "PR":
              a = "paddingRight";
              this.style[a] = $.topx (obj[i]);
              break;
            case "PD":
              a = "padding";
              this.style[a] = obj[i];
              break;
            case "O":
              a = "opacity";
              this.style[a] = obj[i];
              break;
            default:
              this.style[i] = obj[i];
          }
        }
      }
      return $(this);
    },
    ATT: function(obj){
      var i;
      for(i in obj){
         if(obj.hasOwnProperty(i)){
          switch(i){
            case "I":
              this.innerHTML = obj[i];
              break;
            case "H":
              this.href = obj[i];
              break;
            case "T":
              this.target = obj[i];
              break;
            default:
              this.setAttribute(i, obj[i]);
          }
        }
      }
      return $(this);
    },
    H: function(){
      this.style.display = "none";
      return $(this);
    },
    V: function(){
      this.style.display = "";
      return $(this);
    },
    I: function(){
      return this.innerHTML;
    },
    hasClass:function(className){
      return this.className.indexOf(className) > -1;
    },
    addClass:function(className){
      if(!this.hasClass(className)){
        this.className += " " + className;
      }
      return this;
    },
    removeClass:function(className){
      if(this.hasClass(className)){
        var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
        this.className = this.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g, "");
      }
      return this;
    },
    replaceClass:function(className1, className2){
      if(this.hasClass(className1)){
        var reg = new RegExp("(\\s|^)" + className1 + "(\\s|$)");
        this.className = this.className.replace(reg, className2);
      }
      return this;
    },
    remove:function(){
      this.PN().removeChild(this);
      return true;
    },
    PN:function(){
      return $(this.parentNode);
    },
    init:function(){
      this.node.PN = this.PN;
      this.node.C = this.node.children;
      this.node.OW = this.node.offsetWidth;
      this.node.OH = this.node.offsetHeight;
      this.node.CK = this.CK;
      this.node.KD = this.KD;
      this.node.CC = this.CC;
      this.node.CG = this.CG;
      this.node.S = this.S;
      this.node.H = this.H;
      this.node.V = this.V;
      this.node.I = this.I;
      this.node.ATT = this.ATT;
      //this.node.animate = this.animate;
      if(!this.node.animate_status){
        this.node.animate_status = 0;
      }
      if(!this.node.animate_timeline){
        this.node.animate_timeline = 0;
      }
      this.node.hasClass = this.hasClass;
      this.node.addClass = this.addClass;
      this.node.removeClass = this.removeClass;
      this.node.replaceClass = this.replaceClass;
      this.node.remove = this.remove;
      return this.node;
    }
  };
  $.body = $(document.body);
  $.IH = function(){
    return window.innerHeight || document.documentElement.clientHeight || document.body.offsetHeight;
  };
  $.IW = function(){
    return window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;
  };
  /* $.AJAX = function(method, url, obj, fn, async){
    var xmlhttp = new XMLHttpRequest();
    var keys = [];
    var values = [];
    var arr = [];
    var str = "";
    var i;
    for(i in obj){
      if(obj.hasOwnProperty(i)){
        keys.push(i);
        values.push(obj[i]);
      }
    }
    for(i = 0;i < keys.length; i += 1){
      arr.push("" + keys[i] + "=" + values[i]);
    }
    str = arr.join("&");
    if(typeof(async) === "undefined"){
      async = false;
    }
    if(method=="get"){
      xmlhttp.open("GET", url+"?"+str, async);
      xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
      xmlhttp.send(null);
    } else {
      xmlhttp.open("POST", url, async);
      xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
      xmlhttp.send(str);
    }
    var responseText = xmlhttp.responseText;
    fn(responseText);
  }; */
  $.each = function (object, callback, args) {
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
  $.get = function(url, obj, fn, async){
    var xmlhttp = new XMLHttpRequest();
    var keys = [];
    var values = [];
    var arr = [];
    var str = "";
    var i;
    for(i in obj){
      if(obj.hasOwnProperty(i)){
        keys.push(i);
        values.push(obj[i]);
      }
    }
    for(i = 0; i < keys.length; i += 1){
      arr.push("" + keys[i] + "=" + values[i]);
    }
    str = arr.join("&");
    if(typeof(async) === "undefined"){
      async = false;
    }
    xmlhttp.open("GET", url+"?"+str, async);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xmlhttp.send(null);
    var responseText = xmlhttp.responseText;
    fn(xmlhttp.responseText);
  };
  $.post = function(url, obj, fn, async){
    var xmlhttp = new XMLHttpRequest();
    var keys = [];
    var values = [];
    var arr = [];
    var str = "";
    var i;
    for(i in obj){
      if(obj.hasOwnProperty(i)){
        keys.push(i);
        values.push(obj[i]);
      }
    }
    for(i = 0; i < keys.length; i += 1){
      arr.push("" + keys[i] + "=" + values[i]);
    }
    str = arr.join("&");
    if(typeof(async) === "undefined"){
      async = false;
    }
    xmlhttp.open("POST", url, async);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xmlhttp.send(str);
    var responseText = xmlhttp.responseText;
    fn(xmlhttp.responseText);
  };
  
  $.topx = function(str){
    if(str.toString().indexOf("%") < 0 && str.toString().indexOf("em") < 0){
      return parseInt(str) + "px";
    }else{
      return str;
    }
  };
  $.IST = "createTouch" in document || "ontouchstart" in window;
  $.loadImg = function(arr, fn){
    var imgs = [];
    var loaded = 0;
    var i;
    arr = (typeof arr !== "object")? [arr] : arr;
    var length = arr.length;
    for (i = 0; i < length; i += 1){
      imgs[i] = new Image();
      imgs[i].src = arr[i];
      imgs[i].onload = function(){
        loaded += 1;
        if(loaded === length){
          fn();
        }
      };
    }
  };
  $.getArgs = function(){
    var args = {};
    var match = null;
    var search = decodeURIComponent(location.search.substring(1));
    var reg = /(?:([^&]+)=([^&]+))/g;
    while((match = reg.exec(search)) !== null){
      args[match[1]] = match[2];
    }
    return args;
  }
  $.getLoadImg = function(father){
    var obj_list = [];
    var img_list = [];
    var array = father.getElementsByTagName("img");
    var i;
    for(i = 0; i < array.length; i += 1){
      var src = array[i].getAttribute("load-img");
      if(src !== null){
        img_list.push(src);
        obj_list.push($(array[i]));
      }
    }
    return {obj_list: obj_list, img_list: img_list};
  }
  $.preloadImg = function(fn, checkFn){//预载入所有带"preload"的<img>,load-src存放图片地址
    var obj_list = [];
    var img_list = [];
    var array = document.getElementsByTagName("img");
    var i;
    for(i = 0; i < array.length; i += 1){
      var src = array[i].getAttribute("load-src");
      if(src !== null){
        img_list.push(src);
        obj_list.push($(array[i]));
      }
    }
    var imgs = [];
    var loaded = 0;
    var length = img_list.length;
    for (i = 0; i < length; i += 1){
      imgs[i] = new Image();
      imgs[i].src = img_list[i];
      imgs[i].onload = function(){
        loaded += 1;
        if(checkFn){
          checkFn(loaded, length);
        }
        if(loaded === length){
          fn();//载入百分比
        }
      };
    }
  }
  $.randomSort = function(arr){
  var i, length = arr.length;
  for (i = 0; i < length; i++) {
    var iRand = parseInt(length * Math.random());
    var temp = arr[i];
    arr[i] = arr[iRand];
    arr[iRand] = temp;
  }
  return arr;
  }
  $.uniqueArr = function(arr){
   var result = [], hash = {};
  for (var i = 0, elem; (elem = arr[i]) != null; i++) {
    if (!hash[elem]) {
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result;
  }
  $.isRepeatArr = function(arr){
    var hash = {};
    for(var i in arr) {
      if(hash[arr[i]])
      return true;
      hash[arr[i]] = true;
    }
    return false;
  }
  $.arrExchange = function(arr, n, m){
    var item1 = arr[n];
    arr[n] = arr[m];
    arr[m] = item1;
  }
  $.domExchange = function(obj1, obj2){
    var perent1 = $(obj1).PN();
    var perent2 = $(obj2).PN();
    var temp1 = document.createElement("div");
    var temp2 = document.createElement("div");
    perent1.insertBefore(temp1,obj1);
    perent2.insertBefore(temp2,obj2);
    perent1.insertBefore(obj2,temp1);
    perent2.insertBefore(obj1,temp2);
    $(temp1).remove();
    $(temp2).remove();
  }
  $.cloneAll = function(fromObj, toObj){   
    for(var i in fromObj){   
      if(typeof fromObj == "object"){   
        toObj = {};   
        cloneAll(fromObj, toObj);   
        continue;   
      }   
      toObj = fromObj;   
    }   
  }
  $.selectOption = function(select_obj, value){
    for(var i=0; i<select_obj.options.length; i++){  
      if(select_obj.options[i].value == value){  
        select_obj.options[i].selected = true;  
        break;  
      }  
    }  
  }
  $.checkOption = function(select_obj, value){ 
    var isExit = false; 
    for (var i = 0; i < select_obj.options.length; i++) { 
      if (select_obj.options[i].value == value) { 
        isExit = true; 
        break; 
      } 
    } 
    return isExit; 
  } 
  $.addOption = function(select_obj, label, value){
    if (!$.checkOption(select_obj, value)) { 
      var varItem = new Option(label, value); 
      select_obj.options.add(varItem); 
    } 
  }
}());
