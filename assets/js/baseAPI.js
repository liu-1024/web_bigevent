$.ajaxPrefilter(function (options) {
  // 在发起真正的ajax请求之前,统一拼接请求的根路径
  options.url = 'http://big-event-api-t.itheima.net' + options.url
  // console.log(options.url) + options.url

  // 有权限的请求拼接请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
    // 全局挂载complete回调函数
    options.complete = function (res) {
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        // 清空token
        localStorage.removeItem('token')
        // 跳转登录页
        location.href = './login.html'
      }
    }
  }
})