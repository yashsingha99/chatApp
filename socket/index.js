import {Server} from "socket.io"

const io = new Server(8000,{
    cors:true
});

let users = [];

const addUser = (userData,socketId)=>{
    !users.some(user=>user.sub==userData.sub) && (users.push({ ...userData,socketId}));
}

const getUser = (userId)=>{
    return users.find(user=> user.sub === userId);
}

io.on("connection", (socket) => {
    console.log("Socket Connected", socket.id);
    socket.on("addUsers",userData=>{
        addUser(userData,socket.io);
        io.emit('getUsers',users);
    })
    socket.on("sendMessage",data=>{
        const user = getUser(data.recieverId);
        io.to(user.socketId).emit('geMessage',data);
    })
})