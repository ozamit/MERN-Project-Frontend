import React, { useState } from 'react'
import './Register.css'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from '../../state/slices/userSlice'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";

import { localhost } from '../../utils/localHost'


const Register = ({ notificationMsg }) => {

  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formError, setFormError] = useState("")
  
  const Dispatch = useDispatch();

let navigate = useNavigate()

    const onSubmit = async (data) => {
      console.log("data", data);
      if (data.password.length < 6) {
        setFormError("password must be at least 6 characters")
      } else if (data.email.indexOf("@") === -1) {          
        setFormError("please insert valid email")
      } else {
        try {
          const res = await axios.put(`${localhost}/user/register`, { data });
          console.log("res", res);
          const newUser = res.data.message
          if(res.status === 201) {
          console.log("success");
          localStorage.setItem('user', JSON.stringify(res.data.message._id));
            navigate("/")
            Dispatch(setUser({ newUser }));
            notificationMsg("user registered successfully", "success")
          }
    
        } catch(err) {
          console.log(err);
        }
      }

      };

      function goToLogin() {
        navigate("/login")
      }

      function handleInputChange() {
        setFormError("")
        }

  return (
    <div className="registerFormWrapper">
    <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="registerBox"
            // sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
            noValidate
        >
            <h3 className="formTitle">Register</h3>

             {errors?.firstName && <p className="formErrorMsg">All fields are required</p>}
             {formError && <p className="formErrorMsg">{formError}</p>}
             

                <h3 className="sectionTitle">Nice to meet you :)</h3>
                <div className="registerFormFieldsGroup">
                    <TextField
                    className="RegisterTextField"
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    {...register("firstName", { required: true })}
                    />
                    <TextField
                    className="RegisterTextField"
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    {...register("lastName")}
                    />
                </div>
                <h3 className="sectionTitle">Shipping details</h3>
                <div className="registerFormFieldsGroup">
                    <TextField
                    className="RegisterTextField"
                    id="email"
                    label="email"
                    variant="outlined"
                    {...register("email")}
                    onChange={handleInputChange}
                    />
                    <TextField
                    className="RegisterTextField"
                    id="city"
                    label="City"
                    variant="outlined"
                    {...register("city")}
                    />
                    <TextField
                    className="RegisterTextField"
                    id="street"
                    label="Street"
                    variant="outlined"
                    {...register("street")}
                    />
                </div>
                <h3 className="sectionTitle">User details</h3>
                <div className="registerFormFieldsGroup">
                    <TextField
                    className="RegisterTextField"
                    id="username"
                    label="Username"
                    variant="outlined"
                    {...register("username")}
                    />
                    <TextField
                    className="RegisterTextField"
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    helperText="Min 6 characters"
                    {...register("password")}
                    onChange={handleInputChange}
                    />
                </div>
                
                <Button type="submit"
                onClick={onSubmit}
                variant="contained"
                className="RegisterBtn"
                >Register</Button>
            <p onClick={goToLogin} className="goToLogin">Go To Login</p>
            <p className="note">* if you are store manager contact you're developer to get admin access </p>
        </Box>
    </form>
    </div>
  )
}

export default Register