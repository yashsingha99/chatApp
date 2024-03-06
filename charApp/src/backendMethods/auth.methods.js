import axios from "axios";
const config = { //! DOUBT
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
        login({email : data.email, password :  data.password})
        return user;
     }
     return null
   } catch (error) {
    console.log("backendMethods :: auth.methods :: register", error);
    return false;
   }
}

const login = async(data) =>{
  try {
    const user = await axios.post("http://localhost:5000/user/login",
    data,
    config
    )
    if(user){
      return user;
    } 
    
    return null;
  } catch (error) {
    console.log("backendMethods :: auth.methods :: login", error);
    return false;
  }
}

const getCurrentUser = async()=>{
    try {
        const user = await axios.get("/user/getCurrentUser")
        return user;
    } catch (error) {
     console.log("backendMethods :: auth.methods :: getCurrentUser", error);
        return null;
    }
}


export {login, signUp, getCurrentUser}