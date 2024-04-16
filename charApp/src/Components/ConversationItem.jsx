import { useState } from "react";
import "./mainComponent.css";
import { IconButton } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ConversationItem({ data }) {
  const lightTheme = useSelector((state) => state.toggle.light);
  const navigate = useNavigate();
 const location =  useLocation()

  let time;
  const utcTime = new Date(data.latestMessage?.updatedAt);
  let message = (data.latestMessage?.message.substring(0, 35) === undefined ) ? "" : data.latestMessage?.message.substring(0, 35)+" ...";
if(data.latestMessage){
// if (data.latestMessage.length > 10) {
//   const msg = data.latestMessage?.message.toString();
//   message = msg.substring(0, 12); 
// }
 const istTime = (new Date(utcTime.getTime() + (5.5 * 60 * 60 * 1000))+""); // Adding 5 hours and 30 minutes
  time = istTime.split(" ")
}
  return (
    <Link to={`/app/${data._id}`}>
      <div
        className={"conversation-container" + (lightTheme ? "" : " dark")}
        onClick={() => {
          navigate("chatArea");
        }}
      >
        <p className="con-icon">{data.chatName[0]}</p>
        <p className={"con-title" + (lightTheme ? "" : " dark")}>
          {data.chatName}
        </p>
        <p className={"con-lastMessage" + (lightTheme ? "" : " dark")}>
          {message}
        </p>
        <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
          {data.latestMessage && time[4]}
        </p>
      </div>
    </Link>
  );
}

export default ConversationItem;
