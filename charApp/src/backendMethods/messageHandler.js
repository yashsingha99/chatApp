import axios from "axios";
import Cookie from "js-cookie";
let user = Cookie.get("UserData");
user = user ? JSON.parse(user).data.userData : user

const config = { 
    headers: {
      "Content-type": "application/json",
    },
  };

const createMsg = async(data) => {
   try {
     data = {...data, user: user};
     console.log(data);
      const createdMsg = await axios.post('http://localhost:5000/message/',
      data,
      config
    )
    return createdMsg
   } catch (error) {
    console.log("backendMethods :: messageHandler :: createMsg", error);
    throw error
   }
}

const accessMessage = async(data) => {
  try {
    data = {...data, user: user};
    const res = await axios.post(`http://localhost:5000/message/${data.chatId}`,
    data,
    config
  )
  return res
  } catch (error) {
    console.log("backendMethods :: messageHandler :: accessMessage", error);
    throw error
  }
}

const deleteMsg = async(data) => {
  try {
    data = {...data, user: user};
    const res = await axios.post(`http://localhost:5000/message/deleteMessage/${data.msgId}`,
    data,
    config
  )
    return res;
  } catch (error) {
    console.log("backendMethods :: messageHandler :: deleteMsg", error);
  }
}
export {createMsg, accessMessage, deleteMsg}