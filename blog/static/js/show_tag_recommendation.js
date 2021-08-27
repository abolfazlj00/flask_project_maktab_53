function show_tag_recommendation() {
    $.ajax({
        type: 'GET',
        url: '/user/show_tag_recommendation/',
        success: function (data) {
            var list_of_all_tags = data["list_of_all_tags"]
            for (let i in list_of_all_tags) {
                $("#for_tag_rec").append(`<a href="#" id=${list_of_all_tags[i]} onclick="select_tag_function(this)"
                                       class="badge badge-primary p-2 m-2" style="font-size: large"># ${list_of_all_tags[i]}</a>`)
            }
        }
    })
}