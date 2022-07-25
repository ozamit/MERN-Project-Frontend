import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { MirrorCartDBToState } from '../../state/slices/cartSlice'

import './MainShopComponent.css'
import axios from "axios";
import OneItem from '../OneItem/OneItem'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { localhost } from '../../utils/localHost'

const MainShopComponent = ({ categoryFilter, itemsFromSearch, notificationMsg }) => {

  const [itemsToDisplay, setItemsToDisplay] = useState([])
  const [noSearchResults, setNoSearchResults] = useState("")

  const user = useSelector((state) => state.user.data);
  const Dispatch = useDispatch();

  async function getAllItemsToDisplay() {
    try {
      const res = await axios.get(`${localhost}/product/getAllProducts`)
      setItemsToDisplay(res.data.allProducts)
    } catch (err) {
      console.log("err: ", err);
    }

  }

  async function getItemsToDisplayByCategory(category) {
    if(!category) getAllItemsToDisplay()
    if(category){
      try {
        const res = await axios.get(`${localhost}/product/getProductsByCategory/${category}`)
        setItemsToDisplay(res.data.allProducts)
      } catch (err) {
        console.log("err: ", err);
      }
    }
  }

  useEffect(() => {
    getAllItemsToDisplay()
  },[])

  useEffect(() => {
    if(itemsFromSearch.length === 0) {
      getAllItemsToDisplay()
      setNoSearchResults("NO SEARCH RESULTS")
    } else {
      setNoSearchResults("")
      setItemsToDisplay(itemsFromSearch)
    }
  },[itemsFromSearch])

  useEffect(() => {
    setNoSearchResults("")
    getItemsToDisplayByCategory(categoryFilter)
  },[categoryFilter])


    async function mirrorDB() {
      const userId = user.id
      console.log("userId", userId);
      if(userId){
        try {
          const res = await axios.get(`${localhost}/cart/getItemsInCart/${userId}`)
          console.log("res my items", res);
         Dispatch(MirrorCartDBToState(res))
        } catch (err) {
          console.log("err: ", err);
        }
      }
    }


  return (
    <div className="MainShopComponentWrapper">
      {noSearchResults && 
      <div className="noResultsTitle">
        <h1>NO SEARCH RESULTS</h1>
      </div>
      }
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>

      {itemsToDisplay.map((item, i) => { 
        return (
      <Grid key={i} item xs={4}>
        <OneItem item={item} notificationMsg={notificationMsg}>xs=8</OneItem>
      </Grid>
        );

      })}
      </Grid>
    </Box>      
    </div>
  )
}

export default MainShopComponent
