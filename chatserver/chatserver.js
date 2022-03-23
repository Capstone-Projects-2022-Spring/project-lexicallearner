const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 8000
const { Server } = require('socket.io')

app.use(cors())

const io = new Server(http, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    mthods: ['GET','POST'],
  }
})

io.on('connection', (socket) => {
  console.log('user joined: '+socket.id);

  //join room
  socket.on('join room', (data) => {
    socket.join(data)
    console.log(`User ${socket.id} joined room ${data}`)
  })

  //send mg
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
  res.send('Server is up and running + cors origin = '+process.env.CORS_ORIGIN)
})

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})
