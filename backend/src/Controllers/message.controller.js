const Chat = require("../Models/chat.model");
const Messages = require("../Models/message.models");
const User = require("../Models/user.models");
const {asyncHandler} = require("../utilis/AsyncHandler");
 
//* Just  retrive  all  messages  according  to  chatId 
const allMessages = asyncHandler(async (req, res) => {
  try {
    const message = await Messages
      .find({ chat: req.body.chatId })  //*  find all chats(messages) using chatId which is present in params
      .populate("sender", "email name")   //* populate email and name of sender using sender id
      .populate("reciever")              //* populate all thing of reciever using reciever id
      .populate("chat")
      .sort({ updatedAt: -1 })                //* populate all thing of chat using chat id
      res.json(message)
  } catch (error) {
    res.send(400);
    throw new Error(error.message);
  }
});

//* Just  create a  new  Message
const sendMessages = asyncHandler(async (req, res) => {
   const {message, chatId, recieverId, user} = req.body;   // fetch all field
   if(!message || !chatId) {             
    res.sendStatus(400)
    throw new Error("Invalid data passed into request")
   }
   const newMessage = {
    sender:user._id,
    message,
    chat:chatId,
    reciever:[recieverId]
   }
try {
  
    let createdMessage = await Messages.create(newMessage)
    let messageData = await Messages.findOne({_id:createdMessage._id})
        .populate("sender", "-password -refreshToken") 
        .populate("reciever", "-password -refreshToken")
        .populate("chat")
        messageData = await Chat.populate(messageData,{
          path:"chat.groupAdmin chat.users",
          select: "name email",
        })
    // createdMessage = await User.populate(createdMessage, {  //!DOUBT
    //   path: "chat.users",
    //   select: "name email",
    // });

    //* just  update  his  lastmessage
    await Chat.findByIdAndUpdate(chatId,{latestMessage: messageData})
    res.status(200).json(messageData)

} catch (error) {
  res.send(400)
  throw new Error(error.message)
}
})

module.exports = {
  allMessages,
  sendMessages
};