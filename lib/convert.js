const { createCanvas } = require('canvas')
const pdfjs = require('pdfjs-dist')
pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry')

class CanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    return { canvas, context }
  }

  reset({ canvas }, width, height) {
    canvas.width = width
    canvas.height = height
  }

  destroy({ canvas, context }) {
    canvas.width = 0
    canvas.height = 0
    canvas = null
    context = null
  }
}

module.exports = async ({ mimeType = 'image/jpeg', pageNumber = 1, scale = 1.0, source }) => {
  source.nativeImageDecoderSupport = 'display'
  const doc = await pdfjs.getDocument(source).promise
  const page = await doc.getPage(pageNumber)
  const viewport = page.getViewport({ scale })
  const canvasFactory = new CanvasFactory()
  const { canvas, context: canvasContext } = canvasFactory.create(viewport.width, viewport.height)
  await page.render({ canvasContext, viewport, canvasFactory }).promise
  return canvas.toBuffer(mimeType)
}
