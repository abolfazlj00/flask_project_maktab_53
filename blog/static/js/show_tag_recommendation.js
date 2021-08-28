function show_tag_recommendation() {
    $.ajax({
        type: 'GET',
        url: '/user/show_tag_recommendation/',
        success: function (data) {
            var list_of_all_tags = data["list_of_all_tags"]
            for (let i in list_of_all_tags) {
                $("#for_tag_rec").append(`<span  id=${list_of_all_tags[i]} 
                                       class="badge badge-pill p-3 m-2 " style="font-size: large; background-color: darkslategray; color: white"># ${list_of_all_tags[i]}</span>`)
            }
        }
    })
}