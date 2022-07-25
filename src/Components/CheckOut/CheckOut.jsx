import React, { useState } from 'react'
import './CheckOut.css'
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
// MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { localhost } from '../../utils/localHost'

const CheckOut = () => {

    const user = useSelector((state) => state.user.data);
    const cart = useSelector((state) => state.cart.data);

    const [formError, setFormError] = useState("")

    const { register, handleSubmit} = useForm();

    let navigate = useNavigate()

    const onSubmit = async (data) => {
        setFormError("")
        console.log("data: ", data)
        

        if (isNaN(data.creditCardNumber)) {
            setFormError("Invalid Credit Card Details")
            console.log(formError);
        }
        
        const CC = Array.from(String(data.creditCardNumber), Number);
        
        if (CC.length !== 12) {
            setFormError("Invalid Credit Card Details")
            console.log(formError);
        }

        const CCmonth = Array.from(String(data.month), Number);
        const CCyear = Array.from(String(data.year), Number);

        if (CCmonth.length !== 2 || CCyear.length !== 2) {
            setFormError("Invalid Credit Card Details")
            console.log(formError);
        }

        var last4 = String(data.creditCardNumber).slice(-4);

        const orderData = {
            userID: user.id,
            orderCity: data.city,
            orderStreet: data.street,
            creditCard: last4,
            cart
        }
        console.log(orderData);
        
//         if (formError === "") {
            try {
                console.log("axios");
                const res = await axios.put(`${localhost}/order/newOrder`, { orderData });
                console.log("res", res);
          
                if(res.status === 201) {
                console.log("success");
                navigate("/")
                }
          
              } catch(err) {
                console.log(err);
              }
//           };
      };

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="loginBox"
                sx={{ '& > :not(style)': { m: 1, width: '30ch' }, }}
                noValidate >

                <h3 className="formTitle">CheckOut</h3>
                {formError && <p>{formError}</p>}
                    <TextField
                    id="fullName"
                    label="Full Name"
                    variant="outlined"
                    {...register("fullName", { required: true })}
                    />
                    <TextField
                    id="city"
                    label="City"
                    variant="outlined"
                    {...register("city", { required: true })}
                    />
                    <TextField
                    id="street"
                    label="Street"
                    variant="outlined"
                    {...register("street", { required: true })}
                    />
                    <TextField
                    id="creditCardNumber"
                    label="Credit Card Number"
                    variant="outlined"
                    {...register("creditCardNumber", { required: true, valueAsNumber: true})}
                    />
                    <div className="expirationDateWrapper">
                        <TextField
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        sx={{ width: "48%" }}
                        id="month"
                        
                        label="Month"
                        {...register("month", { required: true })}
                        >
                        </TextField>
                        
                        <TextField
                        sx={{ width: "47%" }}
                        id="year"
                        label="Year"
                        {...register("year", { required: true })}
                        >
                        </TextField>

                    </div>
                    
                    <Button
                    className="submitBtn"
                    type="submit"
                    onClick={onSubmit}
                    variant="contained">Submit Order</Button>
            </Box>
        </form>
    </div>
  )
}

export default CheckOut
