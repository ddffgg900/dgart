var host = "http://"+location.hostname+":3000";
$("bg").S({backgroundImage:"url(img/login/bg.png)"});
$("login").CK(function(){
  var email = $("email").value;
  var password_str = $("password").value;
  if(!email || !password_str){
    alert("empty!");
    return;
  }
  $.post(host+"/login", {email: email, password_str: password_str}, function(html){
    console.log(html);
  });
});