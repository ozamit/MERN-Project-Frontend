import React, { useState } from 'react'
import './Login.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { localhost } from '../../utils/localHost'
import { setUser } from '../../state/slices/userSlice'

const Login = ({ notificationMsg }) => {

const { register, handleSubmit, formState: { errors } } = useForm();
const [formError, setFormError] = useState("")

let navigate = useNavigate()

const Dispatch = useDispatch();

const onSubmit = async (data) => {
      
      try {
        const res = await axios.post(`${localhost}/user/login`, { data });
        console.log("res", res);
        const newUser = res.data.message


        if(res.status === 200) {
        console.log("success");
        localStorage.setItem('user', JSON.stringify(res.data.message._id));
          navigate("/")
          Dispatch(setUser({ newUser }));
          notificationMsg("login successfully", "success")
        }
  
      } catch(err) {
        console.log(err.response.data.message);
          setFormError(err.response.data.message)
        }
      }
  

  function goToRegister() {
    navigate("/register")
  }

  function goToStore() {
    navigate("/")
  }

  
  function handleInputChange() {
    setFormError("")
    }
 

  return (
      <div className="loginFormWrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="loginBox"
                noValidate>
                <h3 className="formTitle">Login</h3>
                {errors?.username && <p className="formErrorMsg">All fields are required</p>}
                {formError && <p className="formErrorMsg">{formError}</p>}
                    <TextField
                    className="loginTextField"
                    id="username"
                    label="username"
                    variant="outlined"
                    {...register("username", { required: true })}
                    onChange={handleInputChange}
                    />
                    <TextField
                    className="loginTextField"
                    id="password"
                    label="password"
                    variant="outlined"
                    type="password"
                    {...register("password", { required: true })}
                    onChange={handleInputChange}
                    />

                    <Button type="submit"
                    className="loginBtn"
                    onClick={onSubmit}
                    variant="contained">Login
                    </Button>
                <p onClick={goToRegister} className="goToRegister">Register</p>
                <p onClick={goToStore} className="goToRegister">Back to the store</p>
            </Box>
        </form>
        </div>
  )
};

export default Login