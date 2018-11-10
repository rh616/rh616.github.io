var APP_ID = 'cS2Juz1M20CBXR9r24GS37MS-gzGzoHsz';
var APP_KEY = 'luxNjG7idyAXIKDHIQJngCAg';

//初始化AV
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var query = new AV.Query('Message')
query.find()
.then(
    function (messages){
        let array = messages.map((item)=> item.attributes)
        array.forEach((item)=>{
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            let messageList = document.querySelector('#messageList')
            messageList.append(li)
        })
    }
)


let myForm = document.querySelector('#postMessageForm')
//表单监听提交不监听click
myForm.addEventListener('submit', function(e){
e.preventDefault()
let content = myForm.querySelector('input[name=content]').value
let name = myForm.querySelector('input[name=name]').value
var Message = AV.Object.extend('Message');
var message = new Message()
message.save({
    'name': name,
    'content': content
  }).then(function(object) {
//精确添加不用刷新
    let li = document.createElement('li')  
    li.innerText = `${object.attributes.name}: ${object.attributes.content}`
    let messageList = document.querySelector('#messageList')
    messageList.appendChild(li)
    //内容清空
    myForm.querySelector('input[name=content]').value = ''
    myForm.querySelector('input[name=name]').value = ''
    console.log(object)

  })

})