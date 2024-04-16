import React, { useEffect } from 'react'
import { fetchChats } from '../backendMethods/chatHandler'
function User() {
  useEffect(()=>{
    const fetchChat = async()=>{
      const res =  await fetchChats()
      // console.log(res)
    }
    fetchChat()
  },[])
  return (
    <div>User</div>
  )
}

export default User