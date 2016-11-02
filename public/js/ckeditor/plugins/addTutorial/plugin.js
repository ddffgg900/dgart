(function(){
  CKEDITOR.plugins.add('addTutorial', {
    requires : ['dialog'],
    init: function (editor) {
      var pluginName = 'AddTutorial';
      CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/addTutorial.js');
      editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
      editor.ui.addButton(pluginName,
      {
        label: '提交为教程',
        icon: this.path + 'images/submit.png',
        command: pluginName
      });
    }
  });
}());