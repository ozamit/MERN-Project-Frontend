import React from 'react'
import './NewCategory.css'
import { useForm } from "react-hook-form";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { localhost } from '../../../utils/localHost'

const NewCategory = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async (data) => {
      
        console.log("data: ", data)
          try {
            console.log("axios");
            const res = await axios.put(`${localhost}/product/addNewCategory`, { data });
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
      <h3 className="sectionTitle">NewCategory:</h3>
        
      <form onSubmit={handleSubmit(onSubmit)}>
      <Box noValidate >
      {errors?.username && <p>required</p>}
      <TextField
      id="name"
      label="Category Name"
      variant="outlined"
      {...register("name", { required: true })}
      />
      <Button type="submit"
      className="submitCategoryBtn"
      onClick={onSubmit}
      variant="outlined">Add new category</Button>
    </Box>

        </form>
    </div>
  )
}

export default NewCategory