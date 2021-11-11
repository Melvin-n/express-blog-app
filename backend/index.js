const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const port = 4000

const {getPosts, getSinglePost, createPost, deletePost} = require('./controller/posts-controller.js')

//middleware
app.use(express.json())
app.use(cors())

//controller functions

app.get('/get-posts', getPosts)

app.post('/create-post', createPost)

app.get('/post/:postNumber', getSinglePost)

app.get('/delete/:postNumber', deletePost)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})

