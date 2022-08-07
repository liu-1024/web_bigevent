$(function () {
  // 注册事件 - 去注册账号
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 注册事件 - 去登录
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  /* 从layui中获取form对象 */
  const form = layui.form
  // 函数自定义校验规则
  form.verify({
    // 自定义校验规则psw
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // 验证两次密码是否一致
    // value是形参 当前输入的值
    repwd: function (value) {
      const pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) return '两次密码不一致!'
    }
  })

  // 注册表单的事件监听
  $('#form_reg').on('submit', e => {
    e.preventDefault()
    $.post("/api/reguser", { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() },
      function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功!')
        $('#link_login').click()
      },
    );
  })

  // 登录表单的事件监听
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('登录失败!')
        layer.msg('登录成功!')
        // console.log(res.token)
        // 将登录成功得到的字符串上传到本地存储
        localStorage.setItem('token',res.token)
        // 跳转后台主页
        location.href = './index.html'
      }
    });
  })
})
