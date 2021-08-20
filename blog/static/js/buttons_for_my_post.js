function post_state(state, post_id) {
    $.ajax({
        type: 'POST',
        url: '/user/change-state/',
        data: {'state': state, 'post_id': post_id},
        success: function () {
            if (state === 1) {
                alert('پست شما با موفقیت فعال شد')
            } else {
                alert('پست شما با موفقیت غیرفعال شد')
            }
            $('#close-modal').click()
        }
    })
}

function drop_post(post_id) {
    $.ajax({
        type: 'POST',
        url: '/user/drop-post/',
        data: {'post_id': post_id},
        success: function () {

            alert('پست شما با موفقیت حذف گردید')
            $('#close-modal').click()

        }
    })
}


