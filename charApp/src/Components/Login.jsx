import {React, useState} from "react";
import logo from "./logo.png";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as userlogin } from "../Store/authSlice";
import { login } from "../backendMethods/auth.methods";
import Cookies from 'js-cookie'
function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const loginHandler = async (data) => {
    try {
      const user = await login(data);
      if (user) {
        dispatch(userlogin(user));
        Cookies.set('UserData', JSON.stringify(user))
        if(Cookies.get('UserData'))
         navigate("/app/welcome");
        
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message)
      console.log("Error while user is logged in", error);
      navigate("/");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="Logo" className="welcome-logo" />
        </div>

        <div className="login-box">
        {error && <p className="login-text">{error}</p>}
          <p className="login-text">Login to your Account</p>
          <TextField
            id="standard-basic"
            label="Enter Email"
            variant="outlined"
            color="secondary"
            name="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            color="secondary"
            name="password"
            {...register("password", {
              required: true,
            })}
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSubmit(loginHandler)}
          >
            Login
          </Button>
          <p>
            Don't have an Account ?{" "}
            <Link to="signup">
              <span className="hyper">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
