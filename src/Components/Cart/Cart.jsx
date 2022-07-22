import React, { useState, useEffect } from 'react'
import './Cart.css'
import ItemInCart from '../ItemInCart/ItemInCart'
import CheckOut from '../CheckOut/CheckOut'
import { useSelector } from "react-redux";
import Divider from '@mui/material/Divider';


const Cart = () => {

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
        <ItemInCart className="ItemsListInCart" />
        <Divider />
        <div className="sumTotal">$ {sumTotal}</div>
      </div>
      <CheckOut />
    </div>
  
  )
}

export default Cart