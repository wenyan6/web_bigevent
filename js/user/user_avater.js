/*
 * @Author: lwy 948379006@qq.com
 * @Date: 2022-12-28 20:26:47
 * @LastEditors: lwy 948379006@qq.com
 * @LastEditTime: 2022-12-28 21:28:58
 * @FilePath: \bigEvent\js\user\user_avater.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 未上传按钮添加点击事件
    $('#btnChooseImg').on('click', function () {
        $('#file').click()
    })

    // 为file文件上传添加change事件
    $('#file').on('change', function (e) {
        console.log(e)
        let filelist = e.target.files
        if (filelist.length === 0) {
            return layui.layer.msg('请选择图片！')
        }
        // 拿到用户选择的图片文件
        let file = e.target.files[0]
        // 为新图片转化为路径
        let newImgURL = URL.createObjectURL(file)
        // 重新初始化裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 将裁剪后的图片上传到服务器
    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar:dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('图像更新失败！')
                }
                layui.layer.msg('图像更新成功！')
                window.parent.getUserInfo()
              }
        })
    })
})