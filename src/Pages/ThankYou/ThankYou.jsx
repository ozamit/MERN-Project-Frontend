import React from 'react'
import "./ThankYou.css"
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

const ThankYou = () => {

    let navigate = useNavigate()

    function backToStore() {
        navigate("/")
    }

  return (
    <div className="ThankYouWrapper">
        <h1 className="thankYouTitle">Thank You!</h1>
        <h2 className="thankYouSubTitle">Your order has been placed</h2>
        <img src="https://sellcodes.com/assets/images/Purchase_Success.png" alt="Purchase Success"></img>
        <Button onClick={backToStore} className="backBtn">Back to the Store</Button>
    </div>
  )
}

export default ThankYou