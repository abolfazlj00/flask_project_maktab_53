function post_state(state, post_id) {
    $.ajax({
        type: 'POST',
        url: '/user/change-state/',
        data: {'state': state, 'post_id': post_id},
        success: function () {
            if (state === 1) {
                alert('پست شما با موفقیت فعال شد')
                view_home()
            } else {
                alert('پست شما با موفقیت غیرفعال شد')
            }
             $('.modal-backdrop').remove();
            view_home()
        }
    })
}

function delete_post(data) {
    if (confirm('آیا می خواهید این پست را حذف کنید؟')) {
  // Save it
        console.log(data.id)
         $.ajax({
        type: "POST",
        data: data.id,
        url: "/user/delete_post",
        success: function (data) {
            $('.modal-backdrop').remove();
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
             $('.modal-backdrop').remove();
        }
    })
}