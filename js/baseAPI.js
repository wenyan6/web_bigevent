/*
 * @Author: lwy 948379006@qq.com
 * @Date: 2022-12-27 12:03:24
 * @LastEditors: lwy 948379006@qq.com
 * @LastEditTime: 2022-12-28 12:12:15
 * @FilePath: \bigEvent\js\baseAPI.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 注意：每次调用$.get()或$.post()或者$.ajax()的时候会先嗲用ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    // console.log(options.url)
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    // 统一为有权限的接口设置header请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete函数
    options.complete = function (res) {
        // console.log('调用了complete函数')
        // console.log(res)
        // 可以从res.responseJSON里面拿到服务器响应回来的数据
        if (res.responseJSON.status === 1) {
            // 强制跳转到login.html界面
            location.href = '/login.html'
            // 清空token
            localStorage.removeItem('token')
        }
    }
})
