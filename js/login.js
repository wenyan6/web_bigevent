/*
 * @Author: lwy 948379006@qq.com
 * @Date: 2022-12-26 16:50:00
 * @LastEditors: lwy 948379006@qq.com
 * @LastEditTime: 2022-12-27 20:39:01
 * @FilePath: \bigEvent\js\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 跳转到登录页面
            $('#link-login').click()
        })
    })


    // 监听登陆表单的提交事件
    // $('#form_login').submit(function (e) {
    //     e.preventDefault()
    //     let data = {
    //         username: $('#form_login [name=username]').val(),
    //         password: $('#form_login [name=password]').val()
    //     }
    //     $.post('/api/login', data, function (res) {
    //         if(res.status!==0){
    //             return layer.msg(res.message)
    //         }
    //         layer.msg('登录成功！')
    //         console.log(res.token)
    //     })
    // })

    // 监听登录表单的提交事件(另一个方法)
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登陆成功！')
                // console.log(res.token)
                // 将登陆成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.token)
                // 跳转到主页面
                location.href = '/index.html'
            }
        })
    })
})