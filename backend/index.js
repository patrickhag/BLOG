const express = require('express')
const cors = require('cors')
const UserData = require('./models/User')
const PostData = require('./models/Posts')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const multer = require('multer')
const uploadsMiddleWare = multer({ dest: 'uploads/' })
const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

app.use('/uploads', express.static(__dirname + '/uploads'))
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
      jwt.sign(
        {
          username,
          id: userDoc._id,
        },
        secret,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err
          res.cookie('token', token).json({
            id: userDoc._id,
            username,
          })
        }
      )
    }
  } catch (e) {
    res.status(400).json(e.message)
  }
})

app.get('/profile', (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err
      res.json(info)
    })
  }
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok')
})

app.post('/create', uploadsMiddleWare.single('file'), async (req, res) => {
  const { originalname, path } = req.file
  const splittedName = originalname.split('.')
  const ext = splittedName[splittedName.length - 1]
  const newPath = path + '.' + ext
  fs.renameSync(path, newPath)
  const { title, summary, content } = req.body
  try {
    const { token } = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {
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
  try {
    const posts = await PostData.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(20)
    res.json(posts)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

app.get('/post/:id', async (req, res) => {
  try {
    const { id } = req.params
    const postDoc = await PostData.findById(id).populate('author')
    res.json(postDoc)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

app.put('/post/:id', uploadsMiddleWare.single('file'), async (req, res) => {
  let newPath = null
  if (req.file) {
    const { originalname, path } = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    newPath = path + '.' + ext
    fs.renameSync(path, newPath)
  }
  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err
    const { id, title, summary, content } = req.body
    const postDoc = await PostData.findById(id)
    const isAuthor =
      JSON.stringify(postDoc.author._id) === JSON.stringify(info.id)
    if (!isAuthor) {
      return res.status(400).json('You are not the author of the post 🔺')
    }
    await postDoc.save({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    })
    res.json(postDoc)
  })
})

app.listen(3001, () => console.log('Listening...'))
