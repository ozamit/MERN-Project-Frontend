import React from 'react'
import './NewItem.css'
import { useForm } from "react-hook-form";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { localhost } from '../../../utils/localHost'

const NewItem = () => {

    const { register, handleSubmit } = useForm();
    
    const onSubmit = async (data) => {
      
        console.log("data: ", data)
          try {
            console.log("axios");
            const res = await axios.put(`${localhost}/product/addNewProduct`, { data });
            console.log("res", res);
      
            if(res.status === 200) {
            console.log("success");
            }
      
          } catch(err) {
            console.log(err);
          }
      };

  return (

    <div>
        <h3 className="sectionTitle">NewItem:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box noValidate >
          <TextField
          className="NewItemTextField"
          id="name"
          label="Item Name"
          variant="outlined"
          {...register("name", { required: true })}
        />
          <TextField
          className="NewItemTextField"
          id="price"
          label="Price"
          variant="outlined"
          {...register("price", { required: true })}
        />
          <TextField
          className="NewItemTextField"
          id="img"
          label="img path"
          variant="outlined"
          {...register("img", { required: true })}
        />
          <TextField
          className="NewItemTextField"
          id="category"
          label="Category ID"
          variant="outlined"
          {...register("category", { required: true })}
        />

        <Button type="submit"
        className="submitItemBtn"
          onClick={onSubmit}
          variant="outlined">Add new item</Button>
        </Box>

      </form>
    </div>
  )
}

export default NewItem