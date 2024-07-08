import { Button, TextField } from "@mui/material";
import { React, useState } from "react";
import logo from "./logo.png";
import "./mainComponent.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { signUp } from "../api/auth.methods";
function SignUp() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const signUpHandler = async (data) => {
    setError("");

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const user = signUp(data);

      if (user) {
        dispatch(login(user));

        Cookies.set("UserData", JSON.stringify(user));
        if (Cookies.get("UserData")) navigate("/app/welcome");
      } else {
        setError({ msg: "fill again", key: Math.random() });
        navigate("/signup");
      }
    } catch (error) {
      if (error.status == 405)
        setError({ msg: "User already Exists", key: Math.random() });
      if (error.status == 406)
        setError({ msg: "UserName already taken", key: Math.random() });
      console.log("backendMethods :: auth.methods :: register", error);
      throw error;
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={logo} alt="Logo" className="welcome-logo" />
      </div>
      <div className="login-box">
        {error && <p className="login-text">{error.msg}</p>}
        <p className="login-text">Create your Account</p>

        <TextField
          id="standard-basic"
          label="Enter User Name"
          variant="outlined"
          color="secondary"
          name="name"
          helperText=""
          {...register("name", {
            required: true,
          })}
        />
        <TextField
          id="standard-basic"
          label="Enter Email Address"
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
          onClick={handleSubmit(signUpHandler)}
        >
          Sign Up
        </Button>
        <p>
          Already have an Account ?{" "}
          <Link to="/">
            <span className="hyper">Log in</span>
          </Link>
        </p>
        {/* {signInStatus ? (
            <Toaster key={signInStatus.key} message={signInStatus.msg} />
          ) : null} */}
      </div>
    </div>
  );
}

export default SignUp;
