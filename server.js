'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const app = express()

app.use(helmet({ hidePoweredBy: { setTo: 'PHP 4.2.0' }, noCache: true }))
app.use('/public', express.static(process.cwd() + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Index page (static HTML)
app.route('/').get(function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

//404 Not Found Middleware
app.use(function(req, res, next) {
  res
    .status(404)
    .type('text')
    .send('Not Found')
})

//Start our server and tests!
app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + process.env.PORT)
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...')
    setTimeout(function() {
      try {
        runner.run()
      } catch (e) {
        const error = e
        console.log('Tests are not valid:')
        console.log(error)
      }
    }, 1500)
  }
})

module.exports = app //for unit/functional testing
