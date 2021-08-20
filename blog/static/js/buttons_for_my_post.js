function post_state(state, post_id) {
    $.ajax({
        type: 'POST',
        url: '/user/change-state/',
        data: {'state': state, 'post_id': post_id},
        success: function () {
            $('#close-modal').click()
        }
    })
}
