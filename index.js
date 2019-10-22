const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const cors = require('cors')

app.get('/', (req, res) => {
  res.send('hello nodejs')
})

app.options('/upload', cors())
app.post('/upload', cors(), upload.single('file'), (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*')
  res.send(req.file.filename)
})

app.get('/preview/:key', cors(), (req, res) => {
  return res.sendFile(`uploads/${req.params.key}`, {
    root: __dirname,
    headers: {
      'Content-Type': 'image/jpeg'
    }
  })
})

const port = process.env.PORT || 3000
app.listen(port)