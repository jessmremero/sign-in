var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 7777;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  //从这里开始看，上面不要看

  if(path === '/sign.html'){  // 如果用户请求的是 / 路径
    var htmlString = fs.readFileSync('./sign.html', 'utf8')  
    response.setHeader('Content-Type', 'text/html;charset=utf-8')  
    response.end(htmlString)   
  }else if(path === '/style.css'){   
    var string = fs.readFileSync('./style.css', 'utf8')
    response.setHeader('Content-Type', 'text/css')
    response.end(string)
  }else if(path === '/SignUp'){  
    whole = ''
    request.on('data',(chunk)=>{
      whole += chunk.toString()
    }) 
    request.on('end',function(){
      var array = whole.split('&')
      let array1 = []
      let postData = {}
      array.forEach(function(item,i){
      var parts = array[i].split('=')
      var key = parts[0]
      var value = parts[1]
      array1.push(parts[1])
      postData[key] = value
      })
      let {email,password,passwordp} = postData
      let errors = {}
      //检查email是否合法
      if(!/.+@.+/.test(email)){
        errors.email = '邮箱不合法'
      }
      if(password.length < 6){
        errors.password = '密码太短'
      }
      if(passwordp !== password){
        errors.passwordp = '两次密码不一致'
      }
      response.setHeader('Content-Type','text/html;charset=utf-8')
      response.end(JSON.stringify(errors))
      let errors1 = JSON.stringify(errors)
      let error_email = errors1.email
      let error_password = errors1.email
      let error_passwordp = errors1.email
      console.log(error_email,error_password,error_passwordp)
      
    })
	 
  }else if(path === '/main.js'){   
    let string = fs.readFileSync('./main.js', 'utf8')
    response.setHeader('Content-Type', 'text/javascript')
    response.end(string)
  }
  else{  
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8') 
    response.end('找不到对应的路径，你需要自行修改 index.js')
  }

  // 代码结束，下面不要看
  console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
