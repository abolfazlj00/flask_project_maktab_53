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
            if (typeof data === "string") {
                alert(data)
            } else {
                let welcome = "ثبت نام شما با موفقیت انجام شد"
                let user = data.f_name + ' ' + data.l_name
                alert(
                    user + ' ' + welcome
                )

                loadContent('login')
            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
});

function readURLForRegister(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#edit_img').html(`<img id="preview" src=""
                                     class="mr-3"
                                     alt="avatar"
                                     width="150" height="150" style="border: 3px solid #2a6592; border-radius: 16px ">`)

            $('#preview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#img_input").change(function () {
    readURLForRegister(this);
});

