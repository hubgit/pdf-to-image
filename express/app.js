const express = require('express')
const convert = require('../lib/convert')

const indexRoute = (req, res) => {
  res.sendFile(__dirname + '/index.html')
}

const convertRoute = (req, res, next) => {
  const { mimeType = 'image/jpeg', pageNumber = 1, scale = 1.0, url } = req.query

  convert({
    mimeType,
    pageNumber: Number(pageNumber),
    scale: Number(scale),
    source: { url }
  }).then(buffer => {
    res.type(mimeType).send(buffer)
  }).catch(error => {
    next(error)
  })
}

const server = express()
  .get('/', indexRoute)
  .get('/convert', convertRoute)
  .listen(process.env.PORT || 8080, () => {
    const address = server.address()
    console.info(`Ready at http://localhost:${address.port}`)
  })

