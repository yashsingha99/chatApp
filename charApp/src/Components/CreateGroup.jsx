import React from 'react'
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import {IconButton} from "@mui/material";
import { useSelector } from "react-redux";

function CreateGroup() {
  const lightTheme =  useSelector((state) => state.toggle.light)

  return (
    <div className={"createGroups-container"+( lightTheme ? "" : " dark")}>
        <input type="text" placeholder='Enter Group Name' className={"search-box"+( lightTheme ? "" : " dark")} />
        <IconButton className={( lightTheme ? "" : " dark")} >
          <DoneOutlineRoundedIcon className={( lightTheme ? "" : " dark")}/>
        </IconButton>
    </div>
  )
}

export default CreateGroup