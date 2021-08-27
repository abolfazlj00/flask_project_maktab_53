console.log("how are you?")

$.ajax({
    type: 'GET',
    url: '/blog/create_category/',
    success: function (categories) {
        var all_categories = categories['list_of_all_categories']
        console.log("start")
        for (let i in all_categories) {
            var category = all_categories[i]
            console.log(category.category_name)
            if (category.parent_id === 'None') {
                if (category.children.length !== 0) {
                    let cat_id = 'id_in_insert_post' + category._id
                    let span_id = 'id_in_insert_post_' + category._id
                    //                       $("#for_category_in_insert_post").append(` <div class="dropdown">
                    //   <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">${category.category_name}
                    //   <span class="caret"></span></button>
                    //   <ul id=${cat_id} class="dropdown-menu">
                    //   </ul>
                    // </div>`)
                    $('#for_category_in_insert_post').append(`<li><a href="#"><span    id=${span_id}+${category.category_name} onclick="add_cat_in_post(this)" class="add-category fa fa-plus " style="font-size: 16px"></span>${category.category_name}</a><ul id=${cat_id}></ul></li>`)
                } else {
                    let span_id = 'id_in_insert_post_' + category._id
                    //                       $("#for_category_in_insert_post").append(` <li class="dropdown text-right">
                    //   <p><span class="add-category fa fa-plus" style="font-size: 16px; margin-left: 6px"></span>${category.category_name}<span class="show-category fa fa-chevron-left"></span>
                    // </p>
                    //
                    // </li>`)
                    $("#for_category_in_insert_post").append(`<li><a href="#"><span  id=${span_id}+${category.category_name} onclick="add_cat_in_post(this)" class="add-category fa fa-plus" style="font-size: 16px"></span>${category.category_name}</a></li>`)
                }

            } else {
                if (category.children.length !== 0) {
                    let cat_id = 'id_in_insert_post' + category._id
                    let par_id = '#id_in_insert_post' + category.parent_id
                    let span_id = 'id_in_insert_post_' + category._id
//                         $(par_id).append(` <li class="dropdown-submenu text-right">
//         <p class="test" tabindex="-1"><span class="add-category fa fa-plus" style="font-size: 16px; margin-left: 6px">${category.category_name}</p>
//         <ul id=${cat_id} class="dropdown-menu">
//
//         </ul>
//       </li>
// `)
                    $(par_id).append(`<li><a href="#"><span id=${span_id}+${category.category_name} onclick="add_cat_in_post(this)" class="add-category fa fa-plus" style="font-size: 16px"></span>${category.category_name}</a><ul id="${cat_id}"></ul></li>`)
                } else {
                    let par_id = '#id_in_insert_post' + category.parent_id
                    let span_id = 'id_in_insert_post_' + category._id
                    //     $(par_id).append(`<li><p disabled><span class="add-category fa fa-plus" style="font-size: 16px; margin-left: 6px">${category.category_name}</p></li>`)
                    // }
                    $(par_id).append(`<li><a href="#"><span  id=${span_id}+${category.category_name} onclick="add_cat_in_post(this)" class="add-category fa fa-plus" style="font-size: 16px"></span>${category.category_name}</a></li>`)


                }
            }

        }
    }
})


