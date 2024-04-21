import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import {addParticipants} from "../backendMethods/chatHandler"
function MoreOptions({user, data, Chat}) {
  // console.log(user, data, Chat);
  const lightTheme = useSelector((state) => state.toggle.light);
  const[allUser, setAllUser] = useState([]);
   const [newUser, setNewUser] = useState("")
   const addUser = async() => {
    data = {...data, useremail : newUser}
    const res = await addParticipants(data);
    setAllUser(res)
    setNewUser("")
   }
  //  useEffect(() => {
  //   const res = fetchUsers(data);
  //   setAllUser(res)
  //   console.log(res);
  //  }, [data])
   

  return (
    <div
      className={`absolute user top-16 translate-y-6 left-4 h-1/3 w-1/2 border-2 rounded-md shadow-lg z-10 + ${
        lightTheme ? "" : " dark"
      }`}
    >
      <div
        className={`py-1 user  rounded-md  + ${
          lightTheme ? " bg-white" : " dark"
        }`}
      >
       {Chat.isGroupChat && Chat.groupAdmin._id === user._id && <div className="flex h-1/10">
         <input
            type="text"
            placeholder="add User"
            className={`block w-2/3 px-4 py-2 text-sm text-white-300 hover:bg-gray-100 transition-colors + ${
              lightTheme ? "" : " dark"
            }`}
            value={newUser}
            onChange={(e)=>setNewUser(e.target.value)}
          />
          <IconButton
              onClick={() => addUser()}
            className={lightTheme ? "" : " dark"}
          >
            <DoneOutlineRoundedIcon className={lightTheme ? "" : " dark"} />
          </IconButton>
        </div>}
        {Chat.users.map((user, i) => (
          <div key={i}>
            <Link
              // to={items.path}
              className={`block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors + ${
                lightTheme ? "" : " dark"
              }`}
            >
              {user.name}
            </Link>
            <hr
              className={`my-1 border-sky-200 + ${lightTheme ? "" : " dark"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoreOptions;
