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
                alert('قیلدهای اجباری را پر کنید !')
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