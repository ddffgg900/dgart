(function(){
    CKEDITOR.plugins.add('TXvideo', {
        requires : ['dialog'],
        init: function (editor) {
          var pluginName = 'TXvideo';
          CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/TXvideo.js');
          editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
          editor.ui.addButton(pluginName,
          {
              label: '腾讯视频',
              command: pluginName,
              icon: this.path + 'images/TXvideo.png'
          });
        }
    });
}());