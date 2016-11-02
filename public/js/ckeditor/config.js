/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.language = 'zh-cn';
    config.width = 1280;
    config.height = 500;
    config.extraPlugins = 'preview,TXvideo,addTutorial';
    config.toolbar = 'Full';
    config.toolbar_Full = [
        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
        ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
        '/',
        ['Image','Link','Unlink','Iframe','TXvideo','-','Table','HorizontalRule','Smiley','SpecialChar'],
        '/',
        ['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
        ['TextColor','BGColor'],
        ['Styles','Format','Font','FontSize'],
        '/',
        ['Source', '-', 'Preview'],
        ['AddTutorial']
    ];
    config.enterMode = CKEDITOR.ENTER_BR;
    config.shiftEnterMode = CKEDITOR.ENTER_P;
    config.filebrowserImageUploadUrl = reqMapping.control.tutorialUploadFile;
};
