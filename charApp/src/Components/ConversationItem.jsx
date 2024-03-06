import {useState} from 'react'
import './mainComponent.css'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

function ConversationItem({data}) {
  const lightTheme =  useSelector((state) => state.toggle.light)
  const navigate = useNavigate();
  return (
  <>
    <div className={'conversation-container'+( lightTheme ? "" : " dark")} onClick={()=>{navigate("chatArea")}}>
      <p className='con-icon'>{data.name[0]}</p>
      <p className={'con-title'+( lightTheme ? "" : " dark")}>{data.name}</p>
      <p className={'con-lastMessage'+( lightTheme ? "" : " dark")}>{data.lastmessage}</p>
      <p className={'con-timeStamp'+( lightTheme ? "" : " dark")}>{data.timeStamp}</p>
    </div>
  </>
  )
 
}

export default ConversationItem