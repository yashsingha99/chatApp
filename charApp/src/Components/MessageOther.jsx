import React from "react";
import "./mainComponent.css";

function MessageOther({ msg }) {
  var prop1 = { name: "yash", message: "This is a sample message" };
  const utcTime = new Date(msg.updatedAt);
  const istTime = new Date(utcTime.getTime()) + "";
  const time = istTime.split(" ");
  return (
    <div className="other-message-container">
      <div className="conversation-container1">
      <p className="con-icon">{prop1.name[0]}</p>
    <div className="flex justify-end">
    <div className="max-w-xs w-full mx-2 bg-gray-200 rounded-lg p-2">
      <p className="text-lg text-gray-900">
      {msg.message}
      </p>
      <div className="flex items-center justify-end mt-1">
        <span className="text-sm text-gray-800">{time[4]}</span>
        <svg
          className="w-4 h-4 ml-1 text-gray-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </div>
    </div>
  </div>
  </div>
  </div>
  );
}

export default MessageOther;
