const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 8000
const { Server } = require('socket.io')

app.use(cors())

//store rooms
const rooms = [];

const io = new Server(http, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    mthods: ['GET','POST'],
  }
})

//a list of rooms
app.set('rooms', [])

io.on('connection', (socket) => {
  console.log('user joined: '+socket.id);

  //join room
  socket.on('join room', (data) => {
    socket.join(data)

    app.set("rooms", [...app.get("rooms"), data])
    console.log(`User ${socket.id} joined room ${data}`)
  })

  //send msg
  socket.on("send msg", (data) => {
    console.log(`msg '${data.msg}' received from ${data.from}, room ${data.room}`)
    
    //received msg
    socket.to(data.room).emit("received msg", data)
    console.log(`sent msg '${data.msg}' from ${data.from} to room ${data.room}`);
  })

  //disconnect
  socket.on('disconnect', () => {
    console.log('user left '+socket.id)
  })
})

app.get('/', (req, res) => {
  res.send('Server is up and running + cors origin = '+process.env.CORS_ORIGIN + ' cors origin2 = '+process.env.CORS_ORIGIN2)
})

//return a list of unique room
app.get('/chat/rooms', (req, res) => {
  const rooms = JSON.parse(JSON.stringify([...new Set(app.get("rooms"))]))
  res.json(rooms)
})

//reset rooms
app.get('/chat/rooms/reset', (req, res) => {
  app.set("rooms", [])
  const rooms = JSON.parse(JSON.stringify([...new Set(app.get("rooms"))]))
  res.json(rooms)
})

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})
