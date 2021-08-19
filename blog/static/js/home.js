function view_home() {
    $.ajax({
        type: "GET",
        url: "/blog/home",
        success: function (data) {
            $(".content").html(data)
        }
    })
}