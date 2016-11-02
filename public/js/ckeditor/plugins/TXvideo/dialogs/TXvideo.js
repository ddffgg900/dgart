(function(){
    CKEDITOR.dialog.add('TXvideo', function (editor) {
        return {
            title: '插入视频分享通用代码',
            minWidth: 700,
            minHeight: 50,
            buttons: [
                CKEDITOR.dialog.okButton,
                CKEDITOR.dialog.cancelButton
            ],
            contents:
            [
                {
                    elements:
                    [
                        {
                            type: 'text',
                            style: 'width: 100%;',
                            'default': '',
                            required: true,
                            validate: CKEDITOR.dialog.validate.notEmpty('不能为空'),
                            commit: function () {
                                var text = this.getValue();
                                ckeditor_textarea.insertHtml(text);
                            }
                        }
                    ]
                }
            ],
            
            onOk: function () {
                this.commitContent();
            },
            
            resizable: CKEDITOR.DIALOG_RESIZE_NONE
        };
    });
}());