import $ from './util/dom-core.js'
// 构造函数
function zztEditor(toolbarDiv, textcontentDiv) {
  if (toolbarDiv == null||textcontentDiv==null) {
      // 没有定义工具条和文本区域
      throw new Error('错误：初始化编辑器时候未传入必要参数，请查阅文档')
  }
  // 一个编辑器有一个唯一的id
  this.id = 'zztEditor-' + toolbarDiv+"-"+textcontentDiv;
  this.toolbarDiv = toolbarDiv;
  this.textcontentDiv = textcontentDiv;

  // 自定义配置
  this.customConfig = {}
}

zztEditor.prototype = {
  constructor: zztEditor,
  _initDom:function(){
      $(this.textcontentDiv).attr("contenteditable","true");
  },
  // 封装 command
  _initCommand: function () {
    this.cmd = new Command(this)
},
// 创建编辑器
create: function () {
  // // 初始化配置信息
  // this._initConfig()

  // 初始化 DOM
  this._initDom()

//   // 封装 command API
//   this._initCommand()

  // // 封装 selection range API
  // this._initSelectionAPI()

  // // 添加 text
  // this._initText()

  // // 初始化菜单
  // this._initMenus()

  // // 添加 图片上传
  // this._initUploadImg()

  // // 初始化选区，将光标定位到内容尾部
  // this.initSelection(true)

  // // 绑定事件
  // this._bindEvent()
},
}
 export default zztEditor;