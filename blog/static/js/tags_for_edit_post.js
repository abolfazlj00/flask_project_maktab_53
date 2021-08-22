var edit_tagContainer = document.querySelector('.tag-container')
var edit_input = document.querySelector('.tag-container input')
console.log($("#my-tags").data().name)
if ($("#my-tags").data().name != "None"){
   var edit_tags = $('#my-tags').data().name.replaceAll(" ","").replace("[","").replace("]","").replaceAll("'","").split(",");
}
else {
    var edit_tags = []
}


// name.replace("[","").replace("]","").replaceAll("'","").split(",");
console.log(edit_tags)
function edit_createTag(label){
    const div = document.createElement('div')
    div.setAttribute('class', 'tag')
    const div_text = document.createElement('div')
    div_text.setAttribute('class', 'tag-text')
    const span = document.createElement('span')
    span.innerHTML = label
    const closeBtn = document.createElement('i')
    const hashtag = document.createElement('span')
    closeBtn.setAttribute('class', 'material-icons')
    closeBtn.setAttribute('data-item',label)
    closeBtn.innerHTML='close'

    hashtag.setAttribute('class', 'material-icons  hashtag-icon')
    hashtag.innerHTML='tag'

    div_text.appendChild(hashtag)
    div_text.appendChild(span)
    div.appendChild(div_text)
    div.appendChild(closeBtn)
    return div
}

function edit_reset(){
    document.querySelectorAll('.tag').forEach(function (tag){
        tag.parentElement.removeChild(tag)
    })
}

function edit_addTag(){
        edit_reset()
        edit_tags.slice().reverse().forEach(function (tag){
            const input = edit_createTag(tag)
            edit_tagContainer.prepend(input)
        })
}

edit_input.addEventListener('keyup', function (e){
    if (e.key === 'Enter'){
        edit_tags.push(edit_input.value)
        edit_addTag()
        edit_input.value = ''
    }
})

document.addEventListener('click', function (e){
    if (e.target.tagName === 'I'){
        const value = e.target.getAttribute('data-item')
        const index = edit_tags.indexOf(value)

        edit_tags = [...edit_tags.slice(0,index),...edit_tags.slice(index+1)]
        edit_addTag()
    }
})