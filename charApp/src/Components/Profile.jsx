import React from 'react'
import Cookies from 'js-cookie'
function Profile() {
    let userData = Cookies.get('UserData')
    userData = userData ? JSON.parse(userData) : ""
    console.log(userData.data.userData.name);
  return (
    <>
    <div  className='flex w-full  items-center'>
     <div className="bg-gray-100 profile  w-full ">
      {/* Profile Header */}
      <header className="bg-blue-500 w-full text-white py-10">
        <div className="container mx-auto text-center">
          <img src="https://via.placeholder.com/150" alt="Profile" className="rounded-full mx-auto mb-4" />
          <h1 className="text-3xl font-bold">{userData.data.userData.name}</h1>
          <p className="text-lg">Web Developer</p>
        </div>
      </header>
    </div>
    </div>
    </>
  )
}

export default Profile