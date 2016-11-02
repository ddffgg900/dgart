(function() {
  CKEDITOR.dialog.add('AddTutorial',
  function(editor) {
    //var n = CKEDITOR.plugins.submit;
    return {
      title: '提交为附件',
      minWidth: 400,
      minHeight: 300,
      buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton],
      contents: [
        {
          id: "base",
          elements: [
            {
              type: "hbox",
              children: [
                {
                  id: "course",
                  type: "select",
                  label: "课程",
                  "default": "",
                  items: [],
                  validate: CKEDITOR.dialog.validate.notEmpty("课程必须选择"),
                  onLoad:function(){
                    for(key in catalogue){
                      this.add(catalogue[key].title, catalogue[key].course_id);
                    }
                    this.setValue("");
                  }
                }
              ]
            },
            {
              id: "title",
              type: 'text',
              label: '标题',
              'default': '',
              validate: CKEDITOR.dialog.validate.notEmpty('标题不能为空')
            },
            {
              id: "intro",
              type: "textarea",
              label: '介绍',
              "default": "",
              validate: CKEDITOR.dialog.validate.notEmpty("描述不能为空")
            },
            {
              id: "file",
              type: "file",
              label: '头图',
              style: "height:40px",
              size: 38,
              onChange:function(e){
                var file = this.getInputElement().$.files[0];
                var data = new FormData();
                data.append("dirName", "tutorial");
                data.append("uploadFile", file);
                var req = new XMLHttpRequest();
                req.open("POST", reqMapping.control.tutorialUploadFile, false);
                req.send(data);
                var obj = JSON.parse(req.responseText);
                if(obj.status==1){
                  tutorial.icon = obj.result;
                  alert("上传成功");
                } else {
                  alert(obj.errMsg);
                }
              }
            },
          ]
        }
      ],
      onShow: function () {
        if(tutorial.tutorial_id){
          this.setValueOf("base", "course", tutorial.course_id);
          this.setValueOf("base", "title", tutorial.title);
          this.setValueOf("base", "intro", tutorial.intro);
        }
      },
      onOk: function() {
        var course_id = this.getValueOf("base",  "course");
        var title = this.getValueOf("base", "title");
        var intro = this.getValueOf("base", "intro");
        var icon = tutorial.icon;
        var code = encodeURIComponent(ckeditor_textarea.getData());
        var url = "/control/AddTutorial";
        var values = {course_id:course_id, title:title, intro:intro, icon:icon, code:code};
        if(tutorial.tutorial_id){
          values.tutorial_id = tutorial.tutorial_id;
        }
        $.post(url, values, function(html){
          var obj = JSON.parse(html);
          if(obj.status == 1){
            alert("success");
          } else {
            alert(obj.errMsg);
          }
        });
      },
      resizable: CKEDITOR.DIALOG_RESIZE_NONE
    };
  });
} ());