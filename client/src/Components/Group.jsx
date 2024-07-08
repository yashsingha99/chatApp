import React, { useEffect, useState } from 'react'
import { fetchGroups } from '../backendMethods/chatHandler'
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
function Group() {
  const [allGroups, setAllGroups] = useState([])
  const lightTheme = useSelector((state) => state.toggle.light);

  useEffect(()=>{
    const fetchAllGroups = async() => {
      const res = await fetchGroups()
      console.log(JSON.parse(res.request.response));
    }
    fetchAllGroups()
  },[allGroups])
  if(!allGroups) {
    return(
      <section className="text-gray-600  flex items-center justify-center  body-font ">
        <div className="px-5 w-full text-size-10 flex items-center justify-center  py-2">
          <CircularProgress color="inherit" />
        </div>
      </section>
    )
  }
  return (
    <div>Group</div>
  )
}

export default Group