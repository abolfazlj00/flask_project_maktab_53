function select_tag_function(data) {
    console.log(data.id)
    $.ajax({
        type: "POST",
        data: {"tag":data.id},
        url: "/user/posts-list-by-tag/",
        success: function (data) {
            console.log(data)
               $(".content").html(data)
             $('.modal-backdrop').remove()
        }
    })
    }