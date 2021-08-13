$('#register-form').submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');
    var formData = new FormData(this);

    $.ajax({
        type: "POST",
        url: url,
        data: formData, // serializes the form's elements.
        success: function (data) {
            if (data === 'ERROR'){
                alert('Error !!! Try another username')
            }
            else {
                let welcome = "خوش آمدید"
                let user = data.f_name + ' ' + data.l_name
                alert(
                    user + ' ' + welcome
                )
            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
});