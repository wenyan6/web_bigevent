/*
 * @Author: lwy 948379006@qq.com
 * @Date: 2022-12-28 19:49:26
 * @LastEditors: lwy 948379006@qq.com
 * @LastEditTime: 2022-12-28 20:25:35
 * @FilePath: \bigEvent\js\user\user_pwd.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(function () {
    let form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name = oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name = newPwd]').val()) {
                return '两次新密码输入不一致！'
            }

        }
    })

    // 监听重置密码表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data:$(this).serialize(),
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})