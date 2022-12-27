/*
 * @Author: lwy 948379006@qq.com
 * @Date: 2022-12-27 12:03:24
 * @LastEditors: lwy 948379006@qq.com
 * @LastEditTime: 2022-12-27 20:39:05
 * @FilePath: \bigEvent\js\baseAPI.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 注意：每次调用$.get()或$.post()或者$.ajax()的时候会先嗲用ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    // console.log(options.url)
    options.url ='http://api-breakingnews-web.itheima.net'+options.url
})