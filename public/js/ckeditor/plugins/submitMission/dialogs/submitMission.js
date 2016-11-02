(function() {
  CKEDITOR.dialog.add('SubmitMission',
  function(editor) {
    //var n = CKEDITOR.plugins.submit;
    return {
      title: '提交为任务',
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
                  id: "type",
                  type: "select",
                  label: "图文类型",
                  "default": "‎",
                  items: [["‎图文", 1], ["音频", 2], ["视频", 3]],
                  validate: CKEDITOR.dialog.validate.notEmpty("图文类型必须选择")
                },
                {
                  id: "course",
                  type: "select",
                  label: "课程",
                  "default": "",
                  items: [],
                  validate: CKEDITOR.dialog.validate.notEmpty("课程必须选择"),
                  onLoad:function(){
                    for(var i =0;i<catalogue.length;i++){
                      this.add(catalogue[i].title, catalogue[i].course_id);
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
              id: "desc",
              type: "textarea",
              label: '描述',
              "default": "",
              validate: CKEDITOR.dialog.validate.notEmpty("描述不能为空")
            },
            {
              id: "file",
              type: "file",
              label: '头图',
              style: "height:40px",
              size: 38,
              onChange:function(){
                //var file = this.getInputElement().$.files[0];
                //ckeditor_textarea.file = file;
              }
            },
          ]
        }
      ],
      onShow: function () {
        if(mission.mission_id){
          this.setValueOf("base", "type", mission.type);
          this.setValueOf("base", "course", mission.course_id);
          this.setValueOf("base", "title", mission.title);
          this.setValueOf("base", "desc", mission.desc);
        }
      },
      onOk: function() {
        var type = this.getValueOf("base",  "type");
        var course_id = this.getValueOf("base",  "course");
        var title = this.getValueOf("base", "title");
        var desc = this.getValueOf("base", "desc");
        var code = encodeURIComponent(ckeditor_textarea.getData());
        var form_data = new FormData();
        form_data.append("type", type);
        form_data.append("course_id", course_id);
        form_data.append("title", title);
        form_data.append("desc", desc);
        form_data.append("code", code);
        
        var file = this.getContentElement("base","file").getInputElement().$;
        
        if(file.files && file.files.length>0){
          form_data.append("uploadfile", file.files[0]);
        }
        var url;
        if(!mission.mission_id){
          url = "/control/addMission";
        } else {
          form_data.append("mission_id", mission.mission_id);
          url = "/control/modifyMission";
        }
        var req = new XMLHttpRequest();
        req.open("POST", url, false);
        req.send(form_data);
        ckeditor_textarea.file = null;
        alert(JSON.parse(req.responseText).result);
      },
      resizable: CKEDITOR.DIALOG_RESIZE_NONE
    };
  });
} ());