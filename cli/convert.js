const fs = require('fs')
const convert = require('../lib/convert')

// source as a file URL, output as PNG

const url = `file://${__dirname}/data/test.pdf`

convert({
  mimeType: 'image/png',
  pageNumber: 1,
  scale: 2.0,
  source: { url },
}).then(buffer => fs.promises.writeFile(__dirname + '/data/test.png', buffer)).catch(error => {
  console.error(error)
})

// source as a buffer, output as JPEG

fs.promises.readFile(__dirname + '/data/test.pdf').then(data => convert({
  mimeType: 'image/jpeg',
  pageNumber: 1,
  scale: 2.0,
  source: { data },
})).then(buffer => fs.promises.writeFile(__dirname + '/data/test.jpg', buffer)).catch(error => {
  console.error(error)
})

