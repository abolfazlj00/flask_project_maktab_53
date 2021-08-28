var searched_data
function serach(searched_data) {
    $('#serach-form').submit(function (e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var url = form.attr('action');
        var formData = new FormData(this);
        searched_data=formData.search
        var select = document.getElementById("type_of_search");
        var value_of_select = select.value;
        formData.append("type_of_search", value_of_select)
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

    $('#submit-search').click(function () {
        $('#serach-form').submit()
    })
}
serach(searched_data)