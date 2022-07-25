import React from 'react'
import './OneItem.css'
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from '../../state/slices/cartSlice'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const OneItem = ({ item, notificationMsg }) => {

  const user = useSelector((state) => state.user.data);
  const Dispatch = useDispatch();

function addToCart(item, userId) {
  const authUser = JSON.parse(localStorage.getItem('user'));
  console.log("authUser", authUser);
  if (authUser) {
    const data = {item, userId}
    Dispatch(addItemToCart(data))
    notificationMsg("Product successfully added to cart", "success")
  } else {
    notificationMsg("Please login first", "warning")
  }
}


  return (
    <div className="OneItem" >
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea className="CardActionArea">
        <CardMedia
        className="CardMedia"
          component="img"
          height="180"
          image={item.img}
          alt={`${item.name} shirt img`}
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${item.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="CardAction">
        <Button onClick={() => addToCart(item, user.id)} size="sm" variant="outlined" color="primary" endIcon={<AddShoppingCartIcon />}>
          Add to cart
        </Button>
      </CardActions>
    </Card>

      
      </div>
  )
}

export default OneItem