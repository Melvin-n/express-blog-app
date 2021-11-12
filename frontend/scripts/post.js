const url = new URL(window.location)
const postID = url.searchParams.get('post_id')

const postTitle = document.getElementById('postTitle')
const postContent = document.getElementById('postContent')
const title = document.getElementById('newTitle').value
const content = document.getElementById('newContent').value

console.log(title)
const modalContainer = document.getElementById('modalContainer')
const submitChanges = document.getElementById('submitChanges')

fetch(`http://localhost:4000/post/${postID}`)
.then(res => res.json())
.then(res => {
    postTitle.innerText = res.title
    postContent.innerText = res.content
})

function deletePost() {
    fetch(`http://localhost:4000/delete/${postID}`)
    .then(res => {
        if (res.status === 200) {
            window.location = 'index.html'
        }
    })
}

function openEditor() {
    modalContainer.classList.add('show')
}


function editPost(e) {
    e.preventDefault()

    fetch(`http://localhost:4000/create-post/${postID}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({title: title, content: content})
    })
    .then(res => {
        if (res.status === 200) {
            window.location = 'index.html'
        }
    })
}