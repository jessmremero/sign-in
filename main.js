
let $SignUpForm = $('form[name=SignUp]')
$SignUpForm.on('submit',(e)=>{
  e.preventDefault()
  let string = $SignUpForm.serialize()//通过这个方法拿到form里表单的key和value//
  let email = $SignUpForm.find('[name=email]').val()
  let password = $SignUpForm.find('[name=password]').val()
  let passwordp = $SignUpForm.find('[name=passwordp]').val()
  let errors = {}
  if(!/.+@.+/.test(email)){
    errors.email = '邮箱不合法'
  }
  if(password.length < 6){
    errors.password = '密码太短'
  }
  if(passwordp !== password){
    errors.passwordp = '两次密码不一致'
  }
  $SignUpForm.find('span').each(function(){
    $(this).text('')//每次在检验之前，都要清空一遍span//
  })
   if(Object.keys(errors).length !== 0){
    console.log(errors) 
    for(var key in errors){
      $SignUpForm.find(`[class=${key}]`).text(errors[key])
    }//这里注意.html（针对整个HTML文件的，包括HTML标签） .text（针对文本的） .val(针对表单的)三者的区别//
    return//如果有错误就return，不发送请求，后面的ajax请求就不执行//
   }

  $.ajax({
    url:$SignUpForm.attr('action'),
    method:$SignUpForm.attr('method'),
    data:string,
    success:function(response){
      
      let object = JSON.parse(response)
      
    }
  })
})