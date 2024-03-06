import React, { useEffect } from "react";
import "./mainComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MessageOther from "./MessageOther";
import MessageSelf from "./MessageSelf";
import { useSelector } from "react-redux";

function ChatArea({ props = "yash" }) {

  const lightTheme =  useSelector((state) => state.toggle.light)
  return (
    <div className="chatArea-container">
      <div className={"chatArea-header"+( lightTheme ? "" : " dark")}>
        <p className="con-icon">{props[0]}</p>
        <div className={"header-text"+( lightTheme ? "" : " dark")}>
          <p className={"con-title"+( lightTheme ? "" : " dark")}>{props}</p>
          <p className={"con-timeStamp" +( lightTheme ? "" : " dark")}>{props}</p>
        </div>
        <IconButton className={( lightTheme ? "" : " dark")}>
             <DeleteIcon />
          </IconButton>
      </div>
      <div className={"messages-container" +( lightTheme ? "" : " dark")}>
        <MessageOther />
        <MessageSelf />
        <MessageOther />
        <MessageSelf />
        <MessageOther />
        <MessageSelf />
        <MessageOther />
        <MessageSelf />
        <MessageOther />
        <MessageSelf />
        <MessageOther />
        <MessageSelf />
        <MessageOther />
        <MessageSelf />
        <MessageOther />
        <MessageSelf />   
      </div>
      <div className={"text-input-area"+( lightTheme ? "" : " dark")} >
        <input type="text" placeholder="Type a Message" className={"search-box"+( lightTheme ? "" : " dark")}/>
        <IconButton className={( lightTheme ? "" : " dark")}>
          <SendIcon className={( lightTheme ? "" : " dark")}/>
        </IconButton>
      </div>
    </div>
  );
}

export default ChatArea;
