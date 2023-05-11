const express = require('express')
const cors = require('cors')
const UserData = require('./models/User')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
// app.use(cors())
app.use(express.json())
app.use(cookieParser())

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
      const token = jwt.sign(
        { username: userDoc.username, id: userDoc._id },
        'process.env.JWT_SECRET'
      )
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
      })
    }
  } catch (e) {
    console.log(e.message)
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

app.listen(3001, (req, res) => console.log('Listening...'))
