var my_data__

function select_tag_function(data) {
    my_data__ = data
    $.ajax({
        type: "POST",
        data: {"tag": data.id},
        url: "/user/posts-list-by-tag/",
        success: function (data) {
            $(".content").html(data)
            $('.modal-backdrop').remove()
            $('#body').css("overflow-y", "scroll").css("padding-right", "0")
        }
    })
}


