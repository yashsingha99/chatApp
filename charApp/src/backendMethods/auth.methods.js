import axios from "axios";
import Cookie from 'js-cookie'
const config = { 
    headers: {
      "Content-type": "application/json",
    },
  };
const signUp = async(data) => {
   try { 
     const user = await axios.post('http://localhost:5000/user/signup',
     data,
     config
     )
     if(user){
       
         login({email : data.email, password :  data.password});
         return user
     }
     return null
   } catch (error) {
    console.log("backendMethods :: auth.methods :: register", error);
     throw error
   }
}

const login = async(data) =>{
  try {
    const user = await axios.post("http://localhost:5000/user/",
    data,
    config
    )
    if(user){
      Cookie.set('refreshToken', user.data.RefreshToken)
      return user;
    } 
    return null;
  } catch (error) {
    console.log("backendMethods :: auth.methods :: login", error);
    throw error
  }
}

const getCurrentUser = async()=>{
    try {
        const user = await axios.get("/user/getCurrentUser")
        return user;
    } catch (error) {
     console.log("backendMethods :: auth.methods :: getCurrentUser", error);
     throw error;
    }
}


export {login, signUp, getCurrentUser}