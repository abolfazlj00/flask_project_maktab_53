function create_category() {

    $.ajax({
        type: 'GET',
        url: '/blog/create_category/',
        success: function (data) {
            $('.content').html(data)

        }
    })
}