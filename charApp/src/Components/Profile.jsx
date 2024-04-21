import React from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
function Profile() {
    let userData = Cookies.get('UserData')
    const navigate = useNavigate();
    userData = userData ? JSON.parse(userData) : ""
    console.log(userData.data.userData.name);
   const logout = () => {
     Cookies.remove('UserData');
     Cookies.remove('refreshToken');
     navigate('/')
    }
  return (
    <>
    <div  className='flex w-1/2  items-center'>
     <div className=" border-2 profile  w-full ">
      {/* Profile Header */}
      <header className=" w-full text-white py-10">
        <div className="container mx-auto text-center">
          <img src="https://via.placeholder.com/150" alt="Profile" className="rounded-full mx-auto mb-4" />
          <h1 className="text-3xl font-bold">{userData.data.userData.name}</h1>
          <p className="text-lg">Web Developer</p>
        </div>
      </header>
    </div>
       <button onClick={logout} className=' p-3 rounded-lg m-3 border-none bg-red-600' >Log out</button>
    </div>
    </>
  )
}

export default Profile