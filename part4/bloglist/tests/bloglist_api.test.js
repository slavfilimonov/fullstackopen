const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { listWithSixBlogs } = require('./initial_list')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(listWithSixBlogs[0])
  await blogObject.save()
  blogObject = new Blog(listWithSixBlogs[1])
  await blogObject.save()
  blogObject = new Blog(listWithSixBlogs[2])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(3)
})

afterAll(() => {
  mongoose.connection.close()
})