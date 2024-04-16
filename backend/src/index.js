const { default: mongoose } = require('mongoose')
const  app  = require('./app')
const { Socket } = require('socket.io')



//* DB CONNECTION .....
const dbURI = process.env.MONGODB_URI
const connectdb = async()=>{
  try {
    const connect = await mongoose.connect(dbURI)
     console.log("database is connected!!");
  } catch (error) {
    console.log("database isn't connected ", error);
  }
}
console.log(process.env.MONGODB_URI);
connectdb();


const port = process.env.PORT || 5000

const server = app.listen(port ,console.log("server is running....."))
const io = require("socket.io")(server,{
  cors : {
    origin: "*",
  },
  pingTimeout : 60000
})

io.on("connection", (socket) => {
  socket.on("setup", (user) => {
    socket.join(user.data._id);
    socket.emit("connection")
  })
})