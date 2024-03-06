import React from 'react'
import './mainComponent.css'

function MessageOther() {
    var prop1 = {name:"yash", message: "This is a sample message"}
  return (
    <div className='other-message-container'>
        <div className="conversation-container1">
            <p className="con-icon">{prop1.name[0]}</p>
            <div className="other-text-content">
                <p className="con-title">{prop1.name}</p>
                <p className="con-lastMessage">{prop1.message}</p>
                <p className="self-timeStamp">12:00am</p>
            </div>
        </div>
    </div>
  )
}

export default MessageOther