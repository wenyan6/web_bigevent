$(function () {
    var form = layui.form
    // 校验规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称名称必须在1-6个字符之间'
            }
        }
    })

    initUserInfo()

    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                console.log(res)
                // 将用户的信息填写到表单中
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 重新获取用户信息
        initUserInfo()
    })

    // 更新表单数据,监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: 'POST', 
            url: '/my/userinfo',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('用户信息更新失败！')
                }
                layui.layer.msg('用户信息更新成功')
                // 调用父页面的方法重新渲染头像
                window.parent.getUserInfo()
              }
        })
      })
})

