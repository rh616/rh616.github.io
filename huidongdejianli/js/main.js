
function writeCss(prefix, code, fn){
  let domCode = document.querySelector('#code')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    styleTag.innerHTML = prefix +  code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 50)
}
function writeMarkdown(markdown, fn){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 35)
}

var css1 = `/* 
 * 大家好，我是xxx
 * 用文字做介绍太单调了
 * 我就用代码介绍吧
 * 首先准备一些样式
 */

*{
  transition: all 0.5s;
}
html{
  background: #c7c7c7;
}
#code{
  border: 1px solid #000000;
  padding: 10px;
}

/* 添加代码高亮 */

.token.selector{ color: #88cc00; }
.token.property{ color: #cc0071; }

/* 添加呼吸效果 */

#code{
  animation: breath 0.5s infinite alternate-reverse;
}


/* 我需要一张纸 */

#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}

#paper > .content {
 display: block;
}

/* 可以在纸上写字了，看右侧 */
`

var css2 = `
/* 用 marked.js把 Markdown 变成 HTML */
`
var md = `
# 自我介绍

大家好，我叫xxx
今年xxx岁
毕业于xxx学校
正在找前端相关工作

# 技能

Html JavaScript CSS Vue React

# 项目

1.导航页面
2.轮播图
3.画板

# 联系方式

QQ 123456789
Email 123456789@xxx.com
手机 123456789
`
let css3 = `
/*
 * 这就是我的简历
 * 感谢观看
 */
`

writeCss('', css1, ()=>{ // writeCss call the function
  createPaper(() => {
    writeMarkdown(md, ()=> {
      writeCss(css1, css2, ()=>{
        convertMarkdownToHtml(()=>{
          writeCss(css1 + css2, css3, ()=> {
            console.log('完成')
          })
        })
      })
    })
  })
})




function createPaper(fn){
  var paper = document.createElement('div') 
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function convertMarkdownToHtml(fn){
  var div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}

