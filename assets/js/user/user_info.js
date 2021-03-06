$(function() {
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称不能多于六位字符"
            }
        }
    });
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg('获取失败')
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    };
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    });
    // 监听表单的提交行为
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'PUT',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.code !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
            }
        })
    })
})