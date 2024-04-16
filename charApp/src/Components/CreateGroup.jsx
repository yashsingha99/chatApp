import React, { useState } from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { createGroupChat, createUserChat } from "../backendMethods/chatHandler";
import Toaster from "./Toaster";
function CreateGroup() {
  const lightTheme = useSelector((state) => state.toggle.light);
  const [grpName, setGrpName] = useState("");
  const [chatName, setChatName] = useState("");

  const handleGrpChat = async () => {
    if (grpName.length > 0) {
      const res = await createGroupChat({ chatdata: { grpName } });
      //! do correct
      if (res.status != 200) alert("res.message");
      else alert("group is succesfully created");
      setGrpName("");
    } else alert("name is required");
    // <Toaster message={"name is required"} /> 
  };
  const handleUserChat = async () => {
    if (chatName.length > 0) {
      const res = await createUserChat({ chatdata: { chatName } });
      if (res.status != 200) alert("chat is already exist");
      else alert("Chat is succesfully created");
      setChatName("");
    } else alert("name is required");
  };

  return (
    <div
      className={"createGroups-container flex" + (lightTheme ? "" : " dark")}
    >
      <div className="chatname">
        <input
          type="text"
          placeholder="Enter Group Name"
          value={grpName}
          required={true}
          onChange={(e) => setGrpName(e.target.value)}
          className={"search-box" + (lightTheme ? "" : " dark")}
        />
        <IconButton
          onClick={() => handleGrpChat()}
          className={lightTheme ? "" : " dark"}
        >
          <DoneOutlineRoundedIcon className={lightTheme ? "" : " dark"} />
        </IconButton>
      </div>

      <div className="chatname">
        <input
          type="text"
          placeholder="Enter User Name"
          value={chatName}
          required={true}
          onChange={(e) => setChatName(e.target.value)}
          className={"search-box" + (lightTheme ? "" : " dark")}
        />
        <IconButton
          onClick={() => handleUserChat()}
          className={lightTheme ? "" : " dark"}
        >
          <DoneOutlineRoundedIcon className={lightTheme ? "" : " dark"} />
        </IconButton>
      </div>
    </div>
  );
}

export default CreateGroup;
