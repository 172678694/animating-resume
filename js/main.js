function writeCode(preResult, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = preResult + code.substring(0, n)
        domCode.innerHTML = Prism.highlight(domCode.innerHTML, Prism.languages.css);
        styleTags.innerHTML = preResult + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight //解决代码看不见的问题
        if (n >= code.length) {
            window.clearInterval(id)
            fn && fn.call() //fn就是一个回调函数
        }
    }, 40)
}
function writeMarkdown(markdown, fn) {
    let domCode = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = markdown.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight //解决代码看不见的问题
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn && fn.call() //fn就是一个回调函数
        }
    }, 40)
}

var css1 = `/* 
 * 面试官你好，我是XXX
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

*{
    transition: all 1s;
}
html{
    background: #eee;
    font-size:14px;
}
#code{
    border:1px solid #aaa;
    padding:16px;
}

/* 我需要一点代码高亮 */
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
.token.punctuation{
    color: #999;
}

/* 加一个3D效果 */
#code{
    transform:rotateX(360deg);
}

/* 加一个呼吸效果 */
#code{
    animation:breath 1s infinite alternate-reverse;
}

/*现在正式开始 */


/* 首先，我需要一张纸 */

#code-wrapper{
    width:50%;left:0;
    position:fixed;
    height:100%
}
#paper>.content {
    display: block;
   }
/* 于是我就可以在白纸上写字了，请看右边 */
`
var css2=`
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`
var css3 = `



/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`
var md = `# 自我介绍

我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

`
writeCode('', css1, () => {
    createPaper(() => {
        writeMarkdown(md, () => {
            writeCode(css1,css2,() => {
                convertMdToHtml(() => {
                    writeCode(css1+css2,css3,()=>{
                        console.log('大功告成')
                    })
                })
            })
        })
    })
})

function createPaper(fn) {
    let paper = document.createElement('div')
    paper.id = 'paper'
    let pre = document.createElement('pre')
    pre.className = 'content'
    document.body.appendChild(paper)
    paper.appendChild(pre)
    fn && fn.call()
}

function convertMdToHtml(fn) {
    let div = document.createElement('div')
    div.innerHTML = marked(md)
    div.className='html-wrapper'
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
}

