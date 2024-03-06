import React from 'react'
import logo from './logo.png'
import { useSelector } from "react-redux";

function Welcome() {
  const lightTheme =  useSelector((state) => state.toggle.light)

  return (
    <div className={"welcome-container"+( lightTheme ? "" : " dark")}>
        <img src={logo} alt="Logo" className='welcome-logo'/>
        <p className={( lightTheme ? "" : " dark")}>View and text directly to people present in the chat Rooms.</p>
    </div>
  )
}

export default Welcome