$('#insert_post-form').submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');
    var formData = new FormData(this);
    $.ajax({
        type: "POST",
        url: url,
        data: formData, // serializes the form's elements.
        success: function () {
            alert("کاربر گرامی پست شما با موفقیت ایجاد شد")
            view_home()
        },
        cache: false,
        contentType: false,
        processData: false
    });
});

$("#create-btn").click(function () {
    const input_fields = [
        'title', 'main_text', 'category_of_post', 'image',
    ]
    var pass = 0
    for (var field in input_fields) {
        if (pass !== 1) {
            field = input_fields[field]
            console.log(field)
            if (!check_valid(field)) {
                pass = 1
                alert('فیلدهای اجباری را پر کنید !')
            }
        }

    }
    if (pass === 0) {
        $('#insert_post-form').submit()
    }
})


function check_valid(field) {
    let inpObj = document.getElementById(field)
    return inpObj.checkValidity();
}

function readURLForRegister(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#edit_post_img').html(`<img id="preview_post_img" src=""
                                     class="mr-3"
                                     alt="avatar"
                                     width="150" height="150" style="border: 3px solid #2a6592; border-radius: 16px ">`)

            $('#preview_post_img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
$("#image").change(function () {
    readURLForRegister(this);
});