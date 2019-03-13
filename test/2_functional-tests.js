const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../server')

chai.use(chaiHttp)

const base = new Date().getTime()

const books = {
  first: {
    title: `testbook#${base}`,
  },
  second: {
    title: `testbook#${base + 5}`,
  },
  third: {
    title: `testbook#${base + 10}`,
  },
  fourth: {
    title: `testbook#${base + 15}`,
  },
  fifth: {
    title: `testbook#${base + 20}`,
  },
}

suite('Functional Tests', function() {
  test('#example Test GET /api/books', function(done) {
    chai
      .request(server)
      .get('/api/books')
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.isArray(res.body, 'response should be an array')
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount')
        assert.property(res.body[0], 'title', 'Books in array should contain title')
        assert.property(res.body[0], '_id', 'Books in array should contain _id')
        done()
      })
  })

  suite('Routing tests', function() {
    suite('POST /api/books with title => create book object/expect book object', function() {
      test('Test POST /api/books with title, #1', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .send({ title: `${books.first.title}` })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.property(res.body, '_id')
            assert.typeOf(res.body._id, 'string')
            books.first._id = res.body._id
            assert.property(res.body, 'title')
            assert.typeOf(res.body.title, 'string')
            assert.equal(res.body.title, books.first.title)
            done()
          })
      })

      test('Test POST /api/books with title, #2', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .send({ title: `${books.second.title}` })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.property(res.body, '_id')
            assert.typeOf(res.body._id, 'string')
            books.second._id = res.body._id
            assert.property(res.body, 'title')
            assert.typeOf(res.body.title, 'string')
            assert.equal(res.body.title, books.second.title)
            done()
          })
      })

      test('Test POST /api/books with title, #3', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .send({ title: `${books.third.title}` })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.property(res.body, '_id')
            assert.typeOf(res.body._id, 'string')
            books.third._id = res.body._id
            assert.property(res.body, 'title')
            assert.typeOf(res.body.title, 'string')
            assert.equal(res.body.title, books.third.title)
            done()
          })
      })

      test('Test POST /api/books with title, #4', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .send({ title: `${books.fourth.title}` })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.property(res.body, '_id')
            assert.typeOf(res.body._id, 'string')
            books.fourth._id = res.body._id
            assert.property(res.body, 'title')
            assert.typeOf(res.body.title, 'string')
            assert.equal(res.body.title, books.fourth.title)
            done()
          })
      })

      test('Test POST /api/books with title, #5', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .send({ title: `${books.fifth.title}` })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.property(res.body, '_id')
            assert.typeOf(res.body._id, 'string')
            books.fifth._id = res.body._id
            assert.property(res.body, 'title')
            assert.typeOf(res.body.title, 'string')
            assert.equal(res.body.title, books.fifth.title)
            done()
          })
      })

      test('Test POST /api/books with no title given', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 400)
            done()
          })
      })
    })

    suite('POST /api/books/[id] => add comment/expect book object with id', function() {
      test('POST /api/books/[id] with comment, #1, first comment', function(done) {
        chai
          .request(server)
          .post(`/api/books/${books.first._id}`)
          .send({ comment: 'comment #1' })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            const book = res.body
            assert.property(book, 'title')
            assert.typeOf(book.title, 'string')
            assert.property(book, '_id')
            assert.typeOf(book._id, 'string')
            assert.property(book, 'comments')
            assert.isArray(book.comments)
            for (const comment of book.comments) {
              assert.typeOf(comment, 'string')
            }
            done()
          })
      })

      test('POST /api/books/[id] with comment, #1, second comment', function(done) {
        chai
          .request(server)
          .post(`/api/books/${books.first._id}`)
          .send({ comment: 'comment #2' })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            const book = res.body
            assert.property(book, 'title')
            assert.typeOf(book.title, 'string')
            assert.property(book, '_id')
            assert.typeOf(book._id, 'string')
            assert.property(book, 'comments')
            assert.isArray(book.comments)
            for (const comment of book.comments) {
              assert.typeOf(comment, 'string')
            }
            done()
          })
      })

      test('POST /api/books/[id] with comment, #1, third comment', function(done) {
        chai
          .request(server)
          .post(`/api/books/${books.first._id}`)
          .send({ comment: 'comment #3' })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            const book = res.body
            assert.property(book, 'title')
            assert.typeOf(book.title, 'string')
            assert.property(book, '_id')
            assert.typeOf(book._id, 'string')
            assert.property(book, 'comments')
            assert.isArray(book.comments)
            for (const comment of book.comments) {
              assert.typeOf(comment, 'string')
            }
            done()
          })
      })

      test('POST /api/books/[id] with comment, #2, first comment', function(done) {
        chai
          .request(server)
          .post(`/api/books/${books.second._id}`)
          .send({ comment: 'comment #1' })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            const book = res.body
            assert.property(book, 'title')
            assert.typeOf(book.title, 'string')
            assert.property(book, '_id')
            assert.typeOf(book._id, 'string')
            assert.property(book, 'comments')
            assert.isArray(book.comments)
            for (const comment of book.comments) {
              assert.typeOf(comment, 'string')
            }
            done()
          })
      })

      test('POST /api/books/[id] with comment, #3, first comment', function(done) {
        chai
          .request(server)
          .post(`/api/books/${books.third._id}`)
          .send({ comment: 'comment #1' })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            const book = res.body
            assert.property(book, 'title')
            assert.typeOf(book.title, 'string')
            assert.property(book, '_id')
            assert.typeOf(book._id, 'string')
            assert.property(book, 'comments')
            assert.isArray(book.comments)
            for (const comment of book.comments) {
              assert.typeOf(comment, 'string')
            }
            done()
          })
      })

      test('POST /api/books/[id] with invalid id', function(done) {
        chai
          .request(server)
          .post(`/api/books/5c8851572b00b54f7ce65187`)
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isOk(res.text)
            assert.equal(res.text, `no book with id 5c8851572b00b54f7ce65187`)
          })
      })
    })

    suite('GET /api/books => array of books', function() {
      test('Test GET /api/books', function(done) {
        chai
          .request(server)
          .get('/api/books')
          .end(function(err, res) {
            assert.isArray(res.body)
            for (const book of res.body) {
              assert.property(book, '_id')
              assert.typeOf(book._id, 'string')
              assert.property(book, 'title')
              assert.typeOf(book.title, 'string')
              assert.property(book, 'commentcount')
              assert.typeOf(book.commentcount, 'number')
            }
            done()
          })
      })
    })

    suite('GET /api/books/[id] => book object with [id]', function() {
      test('Test GET /api/books/[id] with id not in db', function(done) {
        chai
          .request(server)
          .get(`/api/books/5c8851572b00b54f7ce65187`)
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isOk(res.text)
            assert.typeOf(res.text, 'string')
            assert.equal(res.text, `no book with id 5c8851572b00b54f7ce65187`)
            done()
          })
      })

      test('Test GET /api/books/[id] with valid id in db', function(done) {
        chai
          .request(server)
          .get(`/api/books/${books.first._id}`)
          .end(function(err, res) {
            const book = res.body
            assert.equal(res.status, 200)
            assert.isObject(book)
            assert.property(book, '_id')
            assert.typeOf(book._id, 'string')
            assert.equal(book._id, books.first._id)
            assert.property(book, 'title')
            assert.typeOf(book.title, 'string')
            assert.equal(book.title, books.first.title)
            assert.property(book, 'commentcount')
            assert.typeOf(book.commentcount, 'number')
            done()
          })
      })
    })
  })
})
