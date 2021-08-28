function post_state(state, post_id, page_name) {
    $.ajax({
        type: 'POST',
        url: '/user/change-state/',
        data: {'state': state, 'post_id': post_id},
        success: function () {
            if (state === 1) {
                alert('پست موردنظر با موفقیت فعال شد')

            } else {
                alert('پست  موردنظر با موفقیت غیرفعال شد')

            }


            $('.modal-backdrop').remove()
            $('#body').css("overflow-y", "scroll").css("padding-right", "0")


            if (page_name === "home") {
                view_home()
            } else if (page_name === "my_posts") {
                show_my_posts()
            } else if (page_name === "posts_by_tag") {
                select_tag_function(my_data__)
            }else if (page_name === "posts_by_category") {
                    search_by_category(data_for_search_category)
                }else if (page_name === "search") {
                   serach(searched_data)
                }

        }
    })
}

function delete_post(data, page_name) {
    if (confirm('آیا می خواهید این پست را حذف کنید؟')) {
        // Save it
        $.ajax({
            type: "POST",
            data: data.id,
            url: "/user/delete_post/",
            success: function (data) {
                $('.modal-backdrop').remove()
                $('#body').css("overflow-y", "scroll").css("padding-right", "0")
                if (page_name === "home") {
                    view_home()
                } else if (page_name === "my_posts") {
                    show_my_posts()
                } else if (page_name === "posts_by_tag") {
                    select_tag_function(my_data__)
                }else if (page_name === "posts_by_category") {
                    search_by_category(data_for_search_category)
                }else if (page_name === "search") {
                   serach(searched_data)
                }
            }
        })

    } else {
        // Do nothing!
    }

}
var data_for_search_category
var my_data___
function edit_post(post_id, page_name) {
    my_data___ = page_name
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

function like_post(like_state, post_id, page_name) {
    $.ajax({
        type: 'POST',
        url: '/user/like_post/',
        data: {'like_state': like_state, 'post_id': post_id},
        success: function (my_dict) {
            if (my_dict["like_state"] === 0) {
                if (page_name === "home") {
                    view_home()
                } else if (page_name === "my_posts") {
                    show_my_posts()
                } else if (page_name === "posts_by_tag") {
                    select_tag_function(my_data__)
                } else if (page_name === "posts_by_category") {
                    search_by_category(data_for_search_category)
                }else if (page_name === "search") {
                    console.log(searched_data)
                   serach(searched_data)
                }


            } else {
                if (page_name === "home") {
                    view_home()
                } else if (page_name === "my_posts") {
                    show_my_posts()
                } else if (page_name === "posts_by_tag") {
                    select_tag_function(my_data__)
                } else if (page_name === "posts_by_category") {
                    search_by_category(data_for_search_category)
                }else if (page_name === "search") {
                   serach(searched_data)
                }
            }
            $('.modal-backdrop').remove()
            $('#body').css("overflow-y", "scroll").css("padding-right", "0")
        }
    })
}


