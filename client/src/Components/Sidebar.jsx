import { React, useEffect, useState } from "react";
import "./mainComponent.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import SearchIcon from "@mui/icons-material/Search";
import ConversationItem from "./ConversationItem";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeToggle } from "../Store/toggleSlice";
import { fetchChats } from "../backendMethods/chatHandler";
// import { useSocket } from "../context/SocketProvider";

function Sidebar() {
 const location =  useLocation()
  const [conversations, setConversations] = useState([]);
  const [chatUser, setChatUser] = useState("");
  // const socket  = useSocket()
  useEffect(() => {
    const fetchChat = async () => {
      const res = await fetchChats();
      setConversations(res.data.allChats);
    };
    fetchChat();
  },[conversations, location]);
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.toggle.light);
  const navigate = useNavigate();
  return (
    <div className=" sidebar-container">
      <div className={"sb-header" + (lightTheme ? "" : " dark")}>
        <div>
          <IconButton onClick={()=> navigate('/app/profile')} className={lightTheme ? "" : " dark"}>
            <AccountCircleIcon
              className={"icon" + (lightTheme ? "" : " dark")}
            />
          </IconButton>
        </div>
        <div>
          <IconButton
            className={lightTheme ? "" : " dark"}
            onClick={() => {
              navigate("users");
            }}
          >
            <PersonAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>

          <IconButton
            className={lightTheme ? "" : " dark"}
            onClick={() => {
              navigate("groups");
            }}
          >
            <GroupAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>

          <IconButton
            className={lightTheme ? "" : " dark"}
            onClick={() => {
              navigate("createGroup");
            }}
          >
            <AddCircleIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>

          <IconButton
            className={lightTheme ? "" : " dark"}
            onClick={() => {
              dispatch(changeToggle(!lightTheme));
            }}
          >
            {!lightTheme ? (
              <LightModeIcon className={"icon" + (lightTheme ? "" : " dark")} />
            ) : (
              <NightlightIcon
                className={"icon" + (lightTheme ? "" : " dark")}
              />
            )}
          </IconButton>
        </div>
      </div>
      <div className={"sb-search" + (lightTheme ? "" : " dark")}>
        <IconButton className={lightTheme ? "" : " dark"}>
          <SearchIcon className={"icon" + (lightTheme ? "" : " dark")} />
        </IconButton>
        <input
          type="text"
          placeholder="search"
          value={chatUser}
          onChange={(e) => setChatUser(e.target.value)}
          className={"search-box" + (lightTheme ? "" : " dark")}
        />
      </div>
      <div className={"sb-conversations" + (lightTheme ? "" : " dark")}>
        {conversations.map((data, i) => {
          if (data.chatName.toLowerCase().includes(chatUser.toLowerCase())) {
            return <ConversationItem key={i} data={data} />;
          }
        })}
      </div>
    </div>
  );
}

export default Sidebar;
