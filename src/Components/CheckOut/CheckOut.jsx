import React, { useState } from 'react'
import './CheckOut.css'
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { localhost } from '../../utils/localHost'
// MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const CheckOut = ({ notificationMsg }) => {

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

        // if (formError === "") {
            try {
                console.log("axios");
                const res = await axios.put(`${localhost}/order/newOrder`, { orderData });
                console.log("res", res);
          
                if(res.status === 200) {
                console.log("success");
                notificationMsg("Your order has been placed!", "success")
                navigate("/thankyou")
                }
          
              } catch(err) {
                console.log(err);
              }
        //   };
        }
        

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="checkoutBox"
                sx={{ '& > :not(style)': { m: 1, width: '20ch' }, }}
                noValidate >

                <h3 className="formTitle">CheckOut</h3>
                {formError && <p>{formError}</p>}
                    <TextField
                    InputProps={{ style: { height: 45 } }} InputLabelProps={{ style: { fontSize: 10 } }}
                    id="fullName"
                    label="Full Name"
                    variant="outlined"
                    {...register("fullName", { required: true })}
                    />
                    <TextField
                    InputProps={{ style: { height: 45 } }} InputLabelProps={{ style: { fontSize: 10 } }}
                    id="city"
                    label="City"
                    variant="outlined"
                    {...register("city", { required: true })}
                    />
                    <TextField
                    InputProps={{ style: { height: 45 } }} InputLabelProps={{ style: { fontSize: 10 } }}
                    id="street"
                    label="Street"
                    variant="outlined"
                    {...register("street", { required: true })}
                    />
                    <TextField
                    InputProps={{ style: { height: 45 } }} InputLabelProps={{ style: { fontSize: 10 } }}
                    id="creditCardNumber"
                    label="Credit Card Number"
                    variant="outlined"
                    {...register("creditCardNumber", { required: true, valueAsNumber: true})}
                    />
                    <div className="expirationDateWrapper">
                        <TextField
                        InputProps={{ style: { height: 45 } }} InputLabelProps={{ style: { fontSize: 10 } }}
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        sx={{ width: "48%" }}
                        id="month"
                        
                        label="Month"
                        {...register("month", { required: true })}
                        >
                        </TextField>
                        
                        <TextField
                        InputProps={{ style: { height: 45 } }} InputLabelProps={{ style: { fontSize: 10 } }}
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