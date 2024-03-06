import React from 'react'
import './mainComponent.css'
import Sidebar from './Sidebar'
// import ChatArea from './ChatArea'
// import Welcome from './Welcome'
// import CreateGroup from './CreateGroup'
import { Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";

function MainComponent() {
  const lightTheme =  useSelector((state) => state.toggle.light)
  const props = "yash"
  return (
  <div className={'main-container'+( lightTheme ? "" : " lightdark")}>
    <Sidebar />
    {/* <ChatArea props={props} /> */}
    {/* <Welcome /> */}
   <Outlet />
  </div>
)}

export default MainComponent