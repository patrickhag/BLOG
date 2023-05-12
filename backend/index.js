const express = require('express')
const cors = require('cors')
const UserData = require('./models/User')
const PostData = require('./models/Posts')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const fs = require('fs')
const uploadsMiddleWare = multer({ dest: 'uploads/' })
const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
// app.use(cors())
app.use(express.json())
app.use(cookieParser())

const secret = 'asdfe45we45w345wegw345werjktjwertkj'

mongoose
  .connect('mongodb://127.0.0.1:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.error)

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    const userInfo = await UserData.create({
      username,
      password: bcrypt.hashSync(password, 10),
    })
    res.json(userInfo)
  } catch (e) {
    res.status(400).json(e.message)
  }
})

// Always remember to make this 👇 an async function. 🙄
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const userDoc = await UserData.findOne({ username })
    const comparedPass = bcrypt.compareSync(password, userDoc.password)
    if (comparedPass) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err
        res.cookie('token', token).json({
          id: userDoc._id,
          username,
        })
      })
    }
  } catch (e) {
    res.status(400).json(e.message)
  }
})

app.get('/profile', (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, 'process.env.JWT_SECRET', {}, (err, info) => {
    if (err) throw err
    res.json(info)
  })
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok')
})

app.post('/create', uploadsMiddleWare.single('file'), async (req, res) => {
  const { originalname, path } = req.file
  const splittedName = originalname?.split('.')
  const ext = splittedName[splittedName.length - 1]
  const newPath = path + '.' + ext
  fs.renameSync(path, newPath)
  const { title, summary, content } = req.body
  try {
    const { token } = req.cookies
    jwt.verify(token, 'process.env.JWT_SECRET', {}, async (err, info) => {
      if (err) throw err
      const postDoc = await PostData.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      })
      res.json(postDoc)
    })
  } catch (e) {
    res.status(400).json(e.message)
  }
})

app.get('/post', async (req, res) => {
  const posts = await PostData.find()
  res.json(posts)
})

app.listen(3001, (req, res) => console.log('Listening...'))
