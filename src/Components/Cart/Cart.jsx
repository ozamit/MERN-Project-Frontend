import React, { useState, useEffect } from 'react'
import './Cart.css'
import ItemInCart from '../ItemInCart/ItemInCart'
import CheckOut from '../CheckOut/CheckOut'
import { useSelector } from "react-redux";
import Divider from '@mui/material/Divider';


const Cart = ({ notificationMsg }) => {

  const cart = useSelector((state) => state.cart.data);
  
  const [sumTotal, setSumTotal] = useState()

  function SumTotal() {
    const sum = (cart.reduce((accumulator, object) => {
      return accumulator + object.price;
    }, 0).toFixed(2));
    setSumTotal(sum)
}

  useEffect(() => {
    SumTotal()
  }, [cart]);

  return (
    <div className="cartWrapper">
      <div className="itemsWrapper">
        {(cart.length < 1 &&
         <img className="emptyCartImg" alt="empty cart" src="https://media.istockphoto.com/vectors/empty-shopping-bag-icon-cute-disappointed-shopping-bag-flat-thin-line-vector-id841884438?b=1&k=20&m=841884438&s=170667a&w=0&h=cmsC4f-WyIcgDIPNTjjXtam0kWoaAB6MJyIgrK0NaGE="></img>
        )}
        <ItemInCart className="ItemsListInCart" />
        <Divider />
        <div className="sumTotal">$ {sumTotal}</div>
      </div>
      <CheckOut notificationMsg={notificationMsg}/>
    </div>
  
  )
}

export default Cart