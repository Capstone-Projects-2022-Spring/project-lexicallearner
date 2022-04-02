module.exports = (io, app) => {
    io.on('connection', (socket) => {
        console.log('user joined: ' + socket.id);

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
            console.log('user left ' + socket.id)
        })
    })
}