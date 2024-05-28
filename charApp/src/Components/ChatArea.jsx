import React, { useEffect, useState } from "react";
import "./mainComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageOther from "./MessageOther";
import MessageSelf from "./MessageSelf";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { accessMessage, createMsg } from "../backendMethods/messageHandler";
import MoreOptions from "./MoreOptions";
import { groupExit } from "../backendMethods/chatHandler";
import { accessChat } from "../backendMethods/chatHandler";
import Cookies from "js-cookie";
import { deleteMessage } from "../backendMethods/messageHandler";
import { generateEmojis } from "./GenrateEmoji/genrateEmoji";

function ChatArea() {

  const tags = [
    { name: "Smileys & Emotion" },
    { name: "People & Body" },
    { name: "Animals & Nature" },
    { name: "Travel & Places" },
    { name: "Activities" },
    { name: "Objects" },
    { name: "Symbols" },
    { name: "Flags" },
  ];

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenMenuId, setIsOpenMenuId] = useState("");
  const [allmessage, setAllMessage] = useState([]);
  const [chat, setChat] = useState([]);
  const location = useLocation().pathname.split("/")[2];
  let userData = Cookies.get("UserData");
  userData = userData ? JSON.parse(userData).data.userData : userData;

  let em = generateEmojis();
  useEffect(() => {
    const fetch = async () => {
      const data = { chatId: location };
      const res = await accessChat(data);
      setChat(res.data);
      const allMessages = await accessMessage(data);
      setAllMessage(allMessages.data);
    };
    fetch();
  }, [chat]);

  const deleteHandler = async () => {
    const res = await groupExit({
      groupAdmin: chat.groupAdmin._id,
      chatId: location,
      userId: userData._id,
    });
    navigate("/app/welcome");
  };

  const createMessage = async () => {
    const data = {
      message,
      chatId: location,
      recieverId: chat,
    };
    const res = await createMsg(data);
    Notification.requestPermission();
    new Notification("New Message", {
      body: message,
    });
    setMessage("");
  };

  const deleteMsg = async (msg, state) => {
    const data = { msg, state, chatId: chat._id };
    const res = await deleteMessage(data);
    console.log(res);
  };

  const lightTheme = useSelector((state) => state.toggle.light);

  return (
    <div className="relative cursor-pointer chatArea-container">
      <div className={"chatArea-header" + (lightTheme ? "" : " dark")}>
        <div className="w-full flex" onClick={() => setIsOpen((p) => !p)}>
          <div className="w-1/3   flex">
            <p className="con-icon text-center">
              {chat.length > 0 && chat.chatName[0]}
            </p>
            <div className={"header-text" + (lightTheme ? "" : " dark")}>
              <p className={"con-title" + (lightTheme ? "" : " dark")}>
                {chat.chatName}
              </p>
              <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}></p>
            </div>
          </div>
        </div>
        <IconButton
          onClick={deleteHandler}
          className={lightTheme ? "" : " dark"}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      {isOpen && (
        <MoreOptions user={userData} data={{ chatId: location }} Chat={chat} />
      )}
      <div className={"messages-container" + (lightTheme ? "" : " dark")}>
        {allmessage &&
          allmessage.map((msg, i) => {
            if(msg.active){
            if (userData._id === msg.sender._id)
              return (
                <div key={i} className="self-message-container m-4">
                  <div className="relative flex  justify-end">
                    <button
                      className="flex items-center text-sm font-medium text-white-800 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                      onClick={() => {
                        if (!isOpenMenu || msg._id === isOpenMenuId) {
                          setIsOpenMenu((p) => !p);
                          setIsOpenMenuId(msg._id);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 ml-1 transition-transform transform ${
                          isOpenMenu && msg._id === isOpenMenuId
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 4a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {isOpenMenu && msg._id === isOpenMenuId && (
                      <div className="absolute right-20 mt-2 w-48 rounded-md shadow-lg z-10">
                        <div className="py-1 rounded-md bg-gradient-to-br from-gray-800 to-gray-600">
                          <div
                            onClick={() => {
                              deleteMsg(msg, true);
                            }}
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
                          >
                            Delete for me
                          </div>
                          <div
                            onClick={() => {
                              deleteMsg(msg, false);
                            }}
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
                          >
                            Delete for EveryOne
                          </div>
                          <div className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors">
                            Copy
                          </div>
                          <div className="block cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors">
                            Select
                          </div>
                          <div className="block cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors">
                            Farward
                          </div>
                        </div>
                      </div>
                    )}
                    <MessageSelf msg={msg} />
                  </div>
                </div>
              );
            else
              return (
                <div key={i} className="other-message-container">
                  <div className=" flex w-full justify-end">
                    <div>
                      <MessageOther key={i} msg={msg} />
                      {isOpenMenu && msg._id === isOpenMenuId && (
                        <div
                          onMouseOver={() => {
                            setIsOpenMenu((p) => p);
                          }}
                          onMouseLeave={() => setIsOpenLogin((p) => !p)}

                          className=" mt-2 w-48 rounded-md shadow-lg z-10"
                        >
                          <div className="py-1 rounded-md bg-gradient-to-br from-gray-800 to-gray-600">
                            <div
                              onClick={() => {
                                deleteMsg(msg, true);
                              }}
                              className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
                            >
                              Delete for me
                            </div>
                            <div className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors">
                              Copy
                            </div>
                            <div className="block cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors">
                              Select
                            </div>
                            <div className="block cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors">
                              Farward
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                      <button
                        className="flex items-center text-sm font-medium text-white-800 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                        onClick={() => {
                          if (!isOpenMenu || msg._id === isOpenMenuId) {
                            setIsOpenMenu((p) => !p);
                            setIsOpenMenuId(msg._id);
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-4 h-4 ml-1 transition-transform transform ${
                            isOpenMenu && msg._id === isOpenMenuId
                              ? "rotate-180"
                              : ""
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 4a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div className="relative">
        {isEmojiOpen && (
          <div className=" bottom-1 absolute emoji">
            {em.map((emoji, i) => (
              <div
                onClick={(e) => setMessage(message + " " + emoji.image)}
                key={i}
                className="item"
              >
                {emoji.image}
              </div>
            ))}
          </div>
        )}
      </div>
      <form className={"text-input-area" + (lightTheme ? "" : " dark")}>
        <div onClick={() => setIsEmojiOpen((p) => !p)} className="emoji-btn">
          ☺️
        </div>
        <input
          type="text"
          placeholder="Type a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={"search-box" + (lightTheme ? "" : " dark")}
        />
        <IconButton
          onClick={() => {
            createMessage();
          }}
          className={lightTheme ? "" : " dark"}
        >
          <SendIcon className={lightTheme ? "" : " dark"} />
        </IconButton>
      </form>
    </div>
  );
}

export default ChatArea;
