'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = express()
dotenv.config()
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

app.use(helmet({ hidePoweredBy: { setTo: 'PHP 4.2.0' }, noCache: true }))
app.use('/public', express.static(process.cwd() + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Schemas

const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: String,
  comments: [String],
})

const Book = mongoose.model('Book', bookSchema)

// Index page (static HTML)
app.route('/').get(function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

// Routing
app
  .route('/api/books')
  .post(async (req, res) => {
    if (req.body.title) {
      const newBook = new Book({ title: req.body.title })
      const data = await newBook.save()
      const output = { title: data.title, _id: data._id }
      res.status(200).json(output)
    } else {
      res.status(400).send('No title given')
    }
  })
  .get(async (req, res) => {
    let bookList = await Book.find({})
    bookList = bookList.map(value => ({
      title: value.title,
      _id: value._id,
      comment_count: value.comments.length,
    }))
    res.json(bookList)
  })
  .delete(async (req, res) => {
    const result = await Book.deleteMany({})

    if (result.ok) {
      res.send('complete deletion successful')
    } else {
      res.send('complete deletion failed')
    }
  })

app
  .route('/api/books/:book_id')
  .post(async (req, res) => {
    const id = req.params.book_id

    if (req.body.comment) {
      const result = await Book.find({ _id: id })
      if (result.length) {
        result[0].comments.push(req.body.comment)
        const data = await result[0].save()
        res.json(data)
      } else {
        res.send(`no book with id equal to ${id}`)
      }
    } else {
      res.send('no comment given')
    }
  })
  .get(async (req, res) => {
    const id = req.params.book_id

    const result = await Book.findById(id)

    if (result) {
      res.json(result)
    } else {
      res.send(`no book with id equal to ${id}`)
    }
  })
  .delete(async (req, res) => {
    const id = req.params.book_id

    const result = await Book.findByIdAndDelete(id)

    if (result) {
      res.send('deletion successful')
    } else {
      res.send(`no book with id equal to ${id}`)
    }
  })

// 404 Not Found Middleware
app.use(function(req, res, next) {
  res
    .status(404)
    .type('text')
    .send('Not Found')
})

// Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${listener.address().port}`)
})

module.exports = app // for unit/functional testing
