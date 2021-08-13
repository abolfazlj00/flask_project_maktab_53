function get_profile(username) {
    $("#home").click()
    $("#upper_div").html(`
<nav class="navbar navbar-expand-lg navbar-light bg-light" >

<li class="nav-item dropdown" style="list-style: none; z-index: 100">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">`
        + "<b>" + username + "</b>" +
        `</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#" onclick="view_profile()">پنل کاربری</a>
                    <a class="dropdown-item" href="#" onclick="logout()">خروج</a>
                </div>
            </li>

</nav>`)
}


$('#login-form').submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');
    var formData = new FormData(this);
    $.ajax({
        type: "POST",
        url: url,
        data: formData, // serializes the form's elements.
        success: function (data) {
            if (typeof data === "string") {
                alert(data)
            } else {
                get_profile(data.username)


            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
});


function logout() {

    $.ajax({
        type: "GET",
        url: "/blog/logout",
        success: function (data) {
            $("#home").click()
            $("#upper_div").html(`
            <button onclick="loadContent('register')" class="btn" id="signup-button"> ثبت نام</button>
            <button onclick="loadContent('login')" class="btn"> ورود</button>
            `)

        }
    })

}

function view_profile() {
    $.ajax({
        type: "GET",
        url: "/user/profile",
        success: function (data) {
            $(".content").html(data)
        }
    })
}

