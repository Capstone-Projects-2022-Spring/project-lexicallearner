const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 8000
const { Server } = require('socket.io')
const chatController = require('./controllers/chatController')

app.use(cors())

const io = new Server(http, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    mthods: ['GET','POST'],
  }
})

//hook chat with io
chatController(io, app)

//storage
//a list of rooms
app.set('rooms', [])

//app.use("/", chatRoute)

app.get('/', (req, res) => {
  res.send('Server is up and running + cors origin = '+process.env.CORS_ORIGIN)
})

//return a list of unique room
app.get('/chat/rooms', (req, res) => {
  let rooms = JSON.parse(JSON.stringify([...new Set(app.get("rooms"))]))
  res.setHeader('Content-Type', 'application/json');
  res.json(rooms)
})

//reset rooms
app.get('/chat/rooms/reset', (req, res) => {
  app.set("rooms", [])
  let rooms = JSON.parse(JSON.stringify([...new Set(app.get("rooms"))]))
  res.json(rooms)
})

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})

