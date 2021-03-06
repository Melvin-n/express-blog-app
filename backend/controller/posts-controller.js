const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.json())


const readPosts = () => {
    let posts = fs.readFileSync('posts.json', 'utf-8')
    posts = JSON.parse(posts)
    return posts
}

const getPosts = (req, res) => {
    const posts = readPosts()
    res.send(posts)
}

const getSinglePost = (req, res) => {
        const posts = readPosts()
        res.send(posts[req.params.postNumber])
    }

const createPost = (req, res) => {

    const title = req.body.title
    const content = req.body.content
    console.log(req.body)
    const posts = readPosts()

    posts.push({title: title, content: content})
    console.log(posts)
    fs.writeFile('posts.json', JSON.stringify(posts), (err) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        } else {
            console.log('Post created succesfully')
            res.sendStatus(200)
        }
    })
}

const editPost = (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const postNumber = req.params.postNumber
    const posts = readPosts()
    console.log(req.body)
  
    posts[postNumber].title = title
    posts[postNumber].content = content
    fs.writeFile('posts.json', JSON.stringify(posts), (err) => {
        if (err) {
            console.log(err)
            res.status(500).send('Unable to edit post')
        } else {
            res.status(200).send('Post successfully edited')
            console.log('Post successfully edited')
        }
    })

}
const deletePost = (req, res) => {
    const postNumber = req.params.postNumber
    const posts = readPosts()

    posts.splice(postNumber, 1)

    fs.writeFile('posts.json', JSON.stringify(posts), (err) => {
        if(err) {
            console.log(err)
            res.sendStatus(500)
        } else {
            console.log('Post successfully deleted')
            res.sendStatus(200)
        }
    })

}


    module.exports = {
        getPosts,
        getSinglePost,
        createPost,
        deletePost,
        editPost
    }