
const bloglistRouter = require('express').Router()
const Blog = require('../models/blog.js')

bloglistRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
	if (!request.body.hasOwnProperty('title') && !request.body.hasOwnProperty('url')) {
		response.status(400).end()
	}

	if (!request.body.likes) {
		request.body.likes = 0
	}

	const blog = new Blog(request.body)
	const savedBlog = await blog.save()

	response.status(201).json(savedBlog)
})

module.exports = bloglistRouter