var tagContainer = document.querySelector('.tag-container')
var input = document.querySelector('.tag-container input')

var tags = []

function createTag(label){
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

function reset(){
    document.querySelectorAll('.tag').forEach(function (tag){
        tag.parentElement.removeChild(tag)
    })
}

function addTag(){
        reset()
        tags.slice().reverse().forEach(function (tag){
            const input = createTag(tag)
            tagContainer.prepend(input)
        })
}

input.addEventListener('keyup', function (e){
    if (e.key === 'Enter'){
        tags.push(input.value)
        addTag()
        input.value = ''
    }
})

document.addEventListener('click', function (e){
    if (e.target.tagName === 'I'){
        const value = e.target.getAttribute('data-item')
        const index = tags.indexOf(value)

        tags = [...tags.slice(0,index),...tags.slice(index+1)]
        addTag()
    }
})