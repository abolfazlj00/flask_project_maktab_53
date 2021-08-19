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

$("#create-btn").click(function (){
    $("#insert_post-form").submit()
})