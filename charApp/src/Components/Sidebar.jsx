import { React, useState } from "react";
import "./mainComponent.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import SearchIcon from "@mui/icons-material/Search";
import ConversationItem from "./ConversationItem";
import LightModeIcon from '@mui/icons-material/LightMode';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {changeToggle} from '../Store/toggleSlice'
function Sidebar() {
  const [conversations, setConversations] = useState([
    {
      name: "Yash",
      lastmessage: "it's me! ",
      timeStamp: "today",
    },
    {
      name: "Asad",
      lastmessage: "hello brother",
      timeStamp: "yesterday",
    },
    {
      name: "Ayush",
      lastmessage: "hello brother",
      timeStamp: "20 jan 2024",
    },
  ]);
  const dispatch =  useDispatch ()
  const lightTheme = useSelector((state) => state.toggle.light)
  // const[lightTheme, setLightTheme] = useState(true)
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      <div className={"sb-header" +( lightTheme ? "" : " dark")}>
        <div>

          <IconButton 
          className={ (lightTheme ? "" :" dark")}
          >
            <AccountCircleIcon className={"icon" + (lightTheme ? "" :" dark")} />
          </IconButton>

        </div>
        <div>

          <IconButton
          className={ (lightTheme ? "" :" dark")}
            onClick={() => {
              navigate("users");
            }}
          >
            <PersonAddIcon className={"icon" + (lightTheme ? "" :" dark")}/>
          </IconButton>

          <IconButton
          className={ (lightTheme ? "" :" dark")}
            onClick={() => {
              navigate("groups");
            }}
          >
          <GroupAddIcon className={"icon" + (lightTheme ? "" :" dark")}/>
          </IconButton>

          <IconButton 
          className={ (lightTheme ? "" :" dark")}
            onClick={() => {
              navigate("createGroup");
            }}
          >
            <AddCircleIcon className={"icon" + (lightTheme ? "" :" dark")}/>
          </IconButton>

          <IconButton 
          className={ (lightTheme ? "" :" dark")}
          onClick={()=>{dispatch(changeToggle(!lightTheme))}}>
            {!lightTheme?<LightModeIcon className={"icon" + (lightTheme ? "" :" dark")}/>:
          <NightlightIcon className={"icon" + (lightTheme ? "" :" dark")}/>
            }
          </IconButton>
        </div>
      </div>
      <div className={"sb-search" + (lightTheme ? "" :" dark")}>
        <IconButton className={ (lightTheme ? "" :" dark")}>
          <SearchIcon className={"icon" + (lightTheme ? "" :" dark")}/>
        </IconButton>
        <input type="text" placeholder="search" className={"search-box" + (lightTheme ? "" :" dark")}/>
      </div>
      <div className={"sb-conversations" + (lightTheme ? "" :" dark")}>
        {conversations.map((data, i) => {
          return <ConversationItem key={i} data={data} />;
        })}
      </div>
    </div>
  );
}

export default Sidebar;
