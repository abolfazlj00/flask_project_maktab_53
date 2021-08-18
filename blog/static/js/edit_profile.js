function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#img_input").change(function(){
    readURL(this);
});

$('#edit_profile-form').submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');
    var formData = new FormData(this);

    $.ajax({
        type: "POST",
        url: url,
        data: formData, // serializes the form's elements.
        success: function (data) {
            console.log(data)
            alert(
                'پروفایل شما با موفقیت تغییر کرد'
            )

            view_profile()
        },
        cache: false,
        contentType: false,
        processData: false
    });
});