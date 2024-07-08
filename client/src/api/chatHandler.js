import axios from "axios";
import Cookie from "js-cookie";


const config = {
  headers: {
    "Content-type": "application/json",
  },
};


let user = Cookie.get("UserData");
user = user ? JSON.parse(user).data.userData : user;

const accessChat = async (data) => {
  try {
    data = { ...data, user };
    const chat = await axios.post("http://localhost:5000/chat/", data, config);
    return chat;
  } catch (error) {
    console.log("backendMethods :: chatHandler :: accessChat", error);
    throw error;
  }
};

const createGroupChat = async (data) => {
  try {
    data = { ...data, user };
    console.log(data);
    const newGrp = await axios.post(
      "http://localhost:5000/chat/createGroupChat",
      data,
      config
    );
    return newGrp;
  } catch (error) {
    console.log("backendMethods :: chatHandler :: createGroupChat", error);
    throw error;
  }
};
const createUserChat = async (data) => {
  try {
    data = { ...data, user };
    console.log(data);
    const newGrp = await axios.post(
      "http://localhost:5000/chat/createUserChat",
      data,
      config
    );
    console.log(newGrp);
    if (newGrp.status == 400) {
      console.log("some error occure while create group");
      return newGrp;
    }
    return newGrp;
  } catch (error) {
    console.log("backendMethods :: chatHandler :: createUserChat", error);
    throw error;
  }
};

const addParticipants = async (data) => {
  data = { ...data, user };
  try {
    const addedUser = await axios.post(
      "http://localhost:5000/chat/addParticipants",
      data,
      config
    );
    return addedUser;
  } catch (error) {
    console.log("backendMethods :: chatHandler :: addParticipants", error);
    throw error;
  }
};

const fetchChats = async () => {
  try {
   const data ={ user :  user };
    const allChats = await axios.post(
      "http://localhost:5000/chat/fetchChats",
      data,
      config
    );
    return allChats;
  } catch (error) {
    console.log("backendMethods :: chatHandler :: fetchChats", error);
    throw error;
  }
};

const fetchGroups = async () => {
  try {
    const data = { user: user };
    const allGrpChats = await axios.post(
      "http://localhost:5000/chat/fetchGroups",
      data,
      config
    );
    console.log(allGrpChats);
    return allGrpChats;
  } catch (error) {
    console.log("backendMethods :: chatHandler :: fetchGroups", error);
    throw error;
  }
};

const groupExit = async (data) => {
 try {
   data = { ...data, user };
   const res = await axios.post(
     "http://localhost:5000/chat/groupExit",
     data,
     config
   );
   return res;
 } catch (error) {
  console.log("backendMethods :: chatHandler :: groupExit", error);
   throw error
 }
};


export {
  accessChat,
  createGroupChat,
  createUserChat,
  addParticipants,
  fetchChats,
  fetchGroups,
  groupExit
};
