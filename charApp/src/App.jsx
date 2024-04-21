import { useState } from "react";
import "./App.css";
import {
  MainComponent,
  SignUp,
  Login,
  Welcome,
  User,
  Group,
  CreateGroup,
  ChatArea,
} from "./Components/index";
import Profile from "./Components/Profile";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="app fixed">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/app" element={<MainComponent />}>
          <Route path="/app/createGroup" element={<CreateGroup />} />
          <Route path="/app/groups" element={<Group />} />
          <Route path="/app/profile" element={<Profile />} />
          <Route path="/app/users" element={<User />} />
          <Route path="/app/welcome" element={<Welcome />} />
          <Route path="/app/:chatArea" element={<ChatArea />} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
