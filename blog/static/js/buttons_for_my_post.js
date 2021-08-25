function post_state(state, post_id) {
    $.ajax({
        type: 'POST',
        url: '/user/change-state/',
        data: {'state': state, 'post_id': post_id},
        success: function () {
            if (state === 1) {
                alert('پست موردنظر با موفقیت فعال شد')
                view_home()
            } else {
                alert('پست  موردنظر با موفقیت غیرفعال شد')
            }
            $('.modal-backdrop').remove()
            $('#body').css("overflow-y", "scroll").css("padding-right", "0")


            view_home()
        }
    })
}

function delete_post(data) {
    if (confirm('آیا می خواهید این پست را حذف کنید؟')) {
        // Save it
        $.ajax({
            type: "POST",
            data: data.id,
            url: "/user/delete_post/",
            success: function (data) {
                $('.modal-backdrop').remove()
                $('#body').css("overflow-y", "scroll").css("padding-right", "0")
                view_home()
            }
        })

    } else {
        // Do nothing!
    }

}


function edit_post(post_id) {

    $.ajax({
        type: 'POST',
        url: '/user/edit_post/',
        data: {'post_id': post_id},
        success: function (data) {
            $('.content').html(data)
            $('.modal-backdrop').remove()
            $('#body').css("overflow-y", "scroll").css("padding-right", "0")
        }
    })
}

function like_post(like_state, post_id) {
    $.ajax({
        type: 'POST',
        url: '/user/like_post/',
        data: {'like_state': like_state, 'post_id': post_id},
        success: function (my_dict) {
            console.log(my_dict["like_state"])
            console.log(typeof my_dict["like_state"])
            if (my_dict["like_state"] === 0) {
                view_home()
            } else {
                view_home()
            }
            $('.modal-backdrop').remove()
            $('#body').css("overflow-y", "scroll").css("padding-right", "0")
        }
    })
}

