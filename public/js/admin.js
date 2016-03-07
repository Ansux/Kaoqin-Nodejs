$(function () {
    $('#stuTable .btn-info').click(function () {
        var uid = $(this).attr('uid');
        //alert(uid);
        $.post('/admin/user/detail', {
            uid: uid
        }, function (data, status) {
            var html = '<td>' + data.uid + '</td>';
            html += '<td>' + data.pwd + '</td>';
            html += '<td>' + ((data.fullname === undefined) ? "" : data.fullname) + '</td>';
            html += '<td>' + ((data.sex === undefined) ? "" : data.sex) + '</td>';
            html += '<td>' + ((data.phone === undefined) ? "" : data.phone) + '</td>';
            html += '<td>' + ((data.email === undefined) ? "" : data.email) + '</td>';
            html += '<td>' + data.role + '</td>';

            $('#stu_info').html(html);
            $('#myModalLabel1').html('详细信息: ' + data.uid);
        })
    });

    $('#stuTable .btn-warning').click(function () {
        var uid = $(this).attr('uid');
        $.post('/admin/user/detail', {
            uid: uid
        }, function (data, status) {
            $('#admin_id').val(data._id);
            $('#inputFullname').val(data.fullname);
            (data.sex !== undefined && data.sex == '男') ? ($('.radioSex')[0].checked = true) : ($('.radioSex')[1].checked = true);
            $('#inputPhone').val(data.phone);
            $('#inputEmail').val(data.email);
            $('#inputRole').val(data.role);
        })
    });

    $('#admin_upd_save').click(function () {
        $.post('/admin/user/update/save', {
            id: $('#admin_id').val(),
            fullname: $('#inputFullname').val(),
            sex: $('input[type=radio]').val(),
            phone: $('#inputPhone').val(),
            email: $('#inputEmail').val()
        }, function (data, status) {
            if (data.result == 'ok') {
                $('#EditModal .close').click();
            }
        })
    });

});