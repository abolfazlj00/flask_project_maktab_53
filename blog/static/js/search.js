$('#serach-form').submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');
    var formData = new FormData(this);
    $.ajax({
        type: "POST",
        url: url,
        data: formData, // serializes the form's elements.
        success: function (response) {
            $('.content').html(response)
        },
        cache: false,
        contentType: false,
        processData: false
    });
});

$('#submit-search').click(function (){
    $('#serach-form').submit()
})