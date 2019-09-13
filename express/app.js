const express = require('express')
const convert = require('../lib/convert')

const routes = {
  index: (req, res) => {
    res.sendFile(__dirname + '/index.html')
  },
  convert: (req, res, next) => {
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
}

const server = express()
  .get('/', routes.index)
  .get('/convert', routes.convert)
  .listen(process.env.PORT || 8080, () => {
    const address = server.address()
    console.info(`Ready at http://localhost:${address.port}`)
  })

