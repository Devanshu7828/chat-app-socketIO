const express = require('express')
const app = express();
const path = require('path')
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;
// console.log(__dirname);
// console.log(path.join(__dirname,'/public'));

const staticPath = (path.join(__dirname, '/public'));
console.log(staticPath);
//built in middleware
app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.send("Hello World ")
});

http.listen(port, () => {
    console.log(`listining on ${port}` );
})

//socket

const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('Connected....');
    socket.on('message', (msg) => {
        // console.log(msg);  gives detail we need to send to other clients
        socket.broadcast.emit('message',msg)

    })
})
