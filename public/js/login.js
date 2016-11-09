document.write("<script src='js/reqMapping.js'></script>");
$("bg").S({backgroundImage:"url(img/login/bg.png)"});
$("login").CK(function(){
  var email = $("email").value;
  var password_str = $("password").value;
  if(!email || !password_str){
    alert("empty!");
    return;
  }
  $.post(reqMapping.index.login, {email: email, password_str: password_str}, function(html){
    var obj = JSON.parse(html);
    var result = obj["result"];
    if(result == true){
       window.location.href = "user.html";
    }else{
      alert(result["errMsg"]);
    }
  });
});