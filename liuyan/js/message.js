!function(){
  var model = {

    init: function(){
      var APP_ID = 'cS2Juz1M20CBXR9r24GS37MS-gzGzoHsz'
      var APP_KEY = 'luxNjG7idyAXIKDHIQJngCAg'
      AV.init({ appId: APP_ID, appKey: APP_KEY })
    },
    fetch: function(){ 
      var query = new AV.Query('Message');
      return query.find() 
    },

    save: function(name, content){
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({  
        'name': name,
        'content': content
      })
    }
  }

  var view = document.querySelector('section.message')


  var control
