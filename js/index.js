$(function () {

    // 1. 获取用户信息
    getUserInfo()

    // 3. 为退出按钮添加点击事件
    LogOut()

})

// 1. 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token')||''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            console.log(res)
            // 2. 渲染用户头像
            renderAvater(res.data)
        },
        // 不管登录成功还是失败，都会调用complete函数，所以在complete函数里做权限访问控制,后续统一挂载到baseAPI.js里面
        // complete: function (res) {
        //     // console.log('调用了complete函数')
        //     console.log(res)
        //     // 可以从res.responseJSON里面拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1) {
        //         // 清空token
        //         localStorage.removeItem('token')
        //         // 强制跳转到login.html界面
        //         location.href = '/login.html'

        //     }
        // }
    })
}

// 2. 渲染用户头像
function renderAvater(user) {
    let name = user.nickname || user.username
    $('#welcom').html('欢迎&nbsp;&nbsp' + name)

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr(src, user.user_pic).show()
        $('.text-avater').hide()
    }
    else {
        $('.layui-nav-img').hide()
        let first_name = name[0].toUpperCase()
        $('.text-avater').html(first_name).show()
    }
}

// 3. 为退出按钮添加点击事件
function LogOut() {
    $('#btnLogout').on('click', function () {
        // 添加提示框
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // console.log('ok')
            localStorage.removeItem('token')
            location.href = '/login.html'
            // 关闭confirm提示框
            layer.close(index);
        });
    })
}