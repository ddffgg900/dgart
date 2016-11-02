(function(){
  CKEDITOR.plugins.add('submitMission', {
    requires : ['dialog'],
    init: function (editor) {
      var pluginName = 'SubmitMission';
      CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/submitMission.js');
      editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
      editor.ui.addButton(pluginName,
      {
        label: '提交为任务',
        icon: this.path + 'images/submit.png',
        command: pluginName
      });
    }
  });
}());