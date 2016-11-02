document.write("<script src='js/reqMapping.js'></script>");
var tutorial = {};
if($.getArgs().tutorial_id){
  var tutorial_id = parseInt($.getArgs().tutorial_id);
  $.get("/control/showTutorial", {tutorial_id : tutorial_id}, function(html){
    var result = JSON.parse(html).result;
    tutorial.tutorial_id = result.tutorial_id;
    tutorial.course_id = result.course_id;
    tutorial.intro = result.intro;
    tutorial.title = result.title;
    tutorial.code = result.code;
    tutorial.icon = result.icon;
  });
}
catalogue = [
  {
    title:"素描",
    course_id:0
  },
  {
    title:"色彩",
    course_id:1
  },
  {
    title:"速写",
    course_id:2
  }
];

CKEDITOR.replace('TextArea1');
var ckeditor_textarea = CKEDITOR.instances.TextArea1;
CKEDITOR.on('instanceReady', function (e) { 
  if(tutorial.code){
    ckeditor_textarea.insertHtml(tutorial.code);
  }
});