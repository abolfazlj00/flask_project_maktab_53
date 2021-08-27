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
                if (category.parent_id === 'None') {
                    if (category.children.length !== 0) {
                        let cat_id = 'id_' + category._id
                        let span_id = 'id' + category._id
                        //                       $("#for_category").append(` <div class="dropdown">
                        //   <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">${category.category_name}
                        //   <span class="caret"></span></button>
                        //   <ul id=${cat_id} class="dropdown-menu">
                        //   </ul>
                        // </div>`)
                        $('#for_category').append(`<li><a href="#"><span    id=${span_id}+${category.category_name} onclick="add_parent_category(this)" class="add-category fa fa-plus " style="font-size: 16px"></span>${category.category_name}</a><ul id=${cat_id}></ul></li>`)
                    } else {
                        //                       $("#for_category").append(` <li class="dropdown text-right">
                        //   <p><span class="add-category fa fa-plus" style="font-size: 16px; margin-left: 6px"></span>${category.category_name}<span class="show-category fa fa-chevron-left"></span>
                        // </p>
                        //
                        // </li>`)
                        $("#for_category").append(`<li><a href="#"><span  id=${span_id}+${category.category_name} onclick="add_parent_category(this)" class="add-category fa fa-plus" style="font-size: 16px"></span>${category.category_name}</a></li>`)
                    }

                } else {
                    if (category.children.length !== 0) {
                        let cat_id = 'id_' + category._id
                        let par_id = '#id_' + category.parent_id
                        let span_id = 'id' + category._id
//                         $(par_id).append(` <li class="dropdown-submenu text-right">
//         <p class="test" tabindex="-1"><span class="add-category fa fa-plus" style="font-size: 16px; margin-left: 6px">${category.category_name}</p>
//         <ul id=${cat_id} class="dropdown-menu">
//
//         </ul>
//       </li>
// `)
                        $(par_id).append(`<li><a href="#"><span id=${span_id}+${category.category_name} onclick="add_parent_category(this)" class="add-category fa fa-plus" style="font-size: 16px"></span>${category.category_name}</a><ul id="${cat_id}"></ul></li>`)
                    } else {
                        let par_id = '#id_' + category.parent_id
                        let span_id = 'id' + category._id
                        //     $(par_id).append(`<li><p disabled><span class="add-category fa fa-plus" style="font-size: 16px; margin-left: 6px">${category.category_name}</p></li>`)
                        // }
                        $(par_id).append(`<li><a href="#"><span  id=${span_id}+${category.category_name} onclick="add_parent_category(this)" class="add-category fa fa-plus" style="font-size: 16px"></span>${category.category_name}</a></li>`)


                    }
                }

            }
        }
    })
}