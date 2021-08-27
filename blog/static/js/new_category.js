function create_category() {
    $.ajax({
        type: 'GET',
        url: '/blog/new_category/',
        success: function (data) {
            $(".content").html(data)

        }
    })
    $.ajax({
        type: 'GET',
        url: '/blog/create_category/',
        success: function (categories) {
            var all_categories = categories['list_of_all_categories']
            console.log(typeof all_categories)
            for (let i in all_categories) {
                var category = all_categories[i]
                console.log(category.category_name)
                if (category.parent_id == 'None') {
                    if (category.children.length != 0) {
                        let cat_id = 'id_' + category._id
                        $("#for_category").append(` <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">${category.category_name}
    <span class="caret"></span></button>
    <ul id=${cat_id} class="dropdown-menu">
    </ul>
  </div>`)
                    } else {
                        $("#for_category").append(` <div class="dropdown">
    <button class="btn btn-primary " type="button" >${category.category_name}
  </button>
   
  </div>`)
                    }

                } else {
                    if (category.children.length != 0) {
                        let cat_id = 'id_' + category._id
                        let par_id = '#id_' + category.parent_id
                        $(par_id).append(` <li class="dropdown-submenu">
        <p class="test" tabindex="-1" href="#">${category.category_name} <span class="caret"></span></p>
        <ul id=${cat_id} class="dropdown-menu">
         
        </ul>
      </li>
`)
                    } else {
                        let par_id = '#id_' + category.parent_id
                        $(par_id).append(`<li><p disabled>${category.category_name}</p></li>`)
                    }


                }
            }

        }
    })
}