const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    Sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    reciver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    }
    
},{timeStamp:true})

export const Message = mongoose.model("Message", messageSchema)