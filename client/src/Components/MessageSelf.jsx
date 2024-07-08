import React, { useState } from "react";

function MessageSelf({ msg }) {
  console.log(msg);
  const utcTime = new Date(msg.updatedAt);
  const istTime = new Date(utcTime.getTime()) + ""; // Adding 5 hours and 30 minutes
  const time = istTime.split(" ");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
          <div className="max-w-xs w-full mx-2 bg-green-200 rounded-lg p-2">
            <p className="text-lg text-gray-900">{msg.message}</p>
            <div className="flex items-center justify-end mt-1">
              <span className="text-xs text-gray-800">{time[4]}</span>
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
    </>
  );
}

export default MessageSelf;
