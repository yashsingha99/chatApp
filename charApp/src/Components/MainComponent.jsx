import React from 'react'
import './mainComponent.css'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import { Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";

function MainComponent() {
  const lightTheme =  useSelector((state) => state.toggle.light)
  return (
  <div className={'main-container relative'+( lightTheme ? "" : " lightdark")}>
    <Sidebar />
   <Outlet />
  </div>
)}

export default MainComponent