var $j = $.noConflict();
var iframe = $("iframe");
var mail = new function(){
  var that = this;
  var mailPage = $("mail");
  var mailLeft = $("mailLeft");
  var mailRight = $("mailRight");
  var showMailBtn = $(".headerMail")[0];
  var h = $.IH() - 70;
  mailPage.S({H:h, T:70-h});
  mailLeft.S({H:h-50-30});
  mailRight.S({H:h-50-30});
  showMailBtn.showed = 0;
  $(showMailBtn).CK(function(e){
    if(e.showed==1){
      $j(mailPage).stop(false, false).animate({top: (70-h)+"px"},300);
      e.showed = 0;
    } else {
      $j(mailPage).stop(false, false).animate({top: "70px"},300);
      e.showed = 1;
    }
  });
  
}

autoHeight();
function checkHash(){
  var hash = (!window.location.hash)?"#mainpage":window.location.hash;
  switch(hash){
    case "#mainpage":
      mainpage.init();
      break;
    case "#userinfo":
      userinfo.init();
      break;
  }
}
function autoHeight(){
  if (iframe.attachEvent){
    iframe.attachEvent("onload", function(){
      if(iframe.Document){//ie自有属性
        iframe.style.height = iframe.Document.documentElement.scrollHeight;
      }else if(iframe.contentDocument){//ie,firefox,chrome,opera,safari
        iframe.height = iframe.contentDocument.body.offsetHeight ;
      }
    });
  } else {
    iframe.onload = function(){
      if(iframe.Document){//ie自有属性
        iframe.style.height = iframe.Document.documentElement.scrollHeight;
      }else if(iframe.contentDocument){//ie,firefox,chrome,opera,safari
        iframe.height = iframe.contentDocument.body.offsetHeight ;
      }
    };
  }
  
} 
