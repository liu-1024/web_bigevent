$(function () {
  const form = layui.form
  const layer = layui.layer

  form.verify({
    nickname: function(value) {
      if (value.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！'
    }
  })
  // 初始化用户信息
  initUserInfo()
  function initUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) return layer.msg('获取用户信息失败！')
        // layui表单赋值
        form.val('formUserInfo', res.data)
      }
    });
  }
  // 重置表单事件监听
  $('#btnReset').on('click', function(e) {
    e.preventDefault()
    initUserInfo()
  })

  // 表单提交修改事件监听
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('更新用户信息失败！')
        layer.msg('更新用户信息成功！')
        // console.log(window.parent)
        window.parent.getUserInfo()
      }
    });
  })
})