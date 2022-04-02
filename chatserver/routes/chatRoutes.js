//storage
//a list of rooms
/* app.set('rooms', [])

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
}) */

const { Router } = require('express')