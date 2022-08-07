$(function () {
  getUserInfo()

  const layer = layui.layer
  $('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // 1. 清空本地存储
      localStorage.removeItem('token')
      // 2. 跳转到登录页
      location.href = './login.html'
      // 关闭询问框架
      layer.close(index);
    });

  })


  // 获取用户信息的函数
  function getUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      // 请求头参数
      // headers: {
      //   Authorization: localStorage.getItem('token') || ''
      // },
      success: function (res) {
        // console.log(res)
        if(res.status!==0) return layer.msg('获取用户信息失败！')
        // 渲染用户头像
        renderAvatar(res.data)
      },
      // 必会执行的函数complete 响应数据中有res.responseJSON数据
      // complete: function (res) {
      //   console.log(res)
      //   // console.log(res.responseJSON)
      //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      //     // 清空token
      //     localStorage.removeItem('token')
      //     // 跳转登录页
      //     location.href = './login.html'
      //   }
      // }

    });
  }
  // 渲染用户头像的函数
  function renderAvatar(user) {
    // console.log(user)
    // 获取用户名称
    const name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
      // 图片头像 
      $('.layui-nav-img').attr('src', user.user_pic).show()
      $('.text-avatar').hide()
    } else {
      // 文本头像
      $('.layui-nav-img').hide()
      const first = name[0].toUpperCase()
      $('.text-avatar').html(first).show()
    }
  }

})
