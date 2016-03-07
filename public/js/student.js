$(function () {
    $('#stuTable .btn-info').click(function () {
        var uid = $(this).attr('uid');
        //alert(uid);
        $.post('/admin/student/detail', {
            id: uid
        }, function (data, status) {
            var html = '<td>' + data.sno + '</td>';
            html += '<td>' + ((data.sname === undefined) ? "" : data.sname) + '</td>';
            html += '<td>' + ((data.sex === undefined) ? "" : data.sex) + '</td>';
            html += '<td>' + ((data.class.cno === undefined) ? "" : data.class.cno) + '</td>';
            html += '<td>' + ((data.dorm.dno === undefined) ? "" : data.dorm.dno) + '</td>';

            $('#stu_info').html(html);
            $('#myModalLabel1').html('学生信息: ' + data.sno);
        })
    });

    $('#stuTable .btn-warning').click(function () {
        var uid = $(this).attr('uid');
        $.post('/admin/student/update', {
            id: uid
        }, function (data, status) {
            $('#stu_id').val(data.student._id);
            $('#inputSno').val(data.student.sno);
            $('#inputSname').val(data.student.sname);
            (data.student.sex !== undefined && data.student.sex == '男') ? ($('.radioSex')[0].checked = true) : ($('.radioSex')[1].checked = true);
            var classHtml = '',
                dormHtml = '';
            $.each(data.classes, function (i, c) {
                classHtml += "<option " + (c._id == data.student.class ? 'selected=selected' : '') + " value='" + c._id + "'>" + c.cno + "</option>";
            });
            $.each(data.dorms, function (i, d) {
                dormHtml += "<option " + (d._id == data.student.dorm ? 'selected=selected' : '') + " value='" + d._id + "'>" + d.dno + "</option>";
            });
            $('#classes').html(classHtml);
            $('#dorms').html(dormHtml);
            $('#myModalLabel2').html('修改信息: ' + data.student.sno);
        })
    });

    $('#stu_upd_save').click(function () {
        $.post('/admin/student/updateSave', {
            _id: $('#stu_id').val(),
            sname: $('#inputSname').val(),
            sex: $("input[name='sex']:checked").val(),
            class: $('#classes').val(),
            dorm: $('#dorms').val()
        }, function (data, status) {
            if (data.result == 'ok') {
                $('#EditModal .close').click();
                location.href = '/admin/student/list';
            }
        })
    });

});