import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { changeQuantity, RemoveFromCart } from '../../state/slices/cartSlice';
import './ItemInCart.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


const ItemInCart = () => {

const cart = useSelector((state) => state.cart.data);
const user = useSelector((state) => state.user.data);
console.log("cart", cart);
console.log("user", user);

const Dispatch = useDispatch();

function handleChangeQuantity(operator, itemId, price) {
    const userID = user.id
    console.log("changeQuantity", operator, itemId, user.id );
    Dispatch(changeQuantity({operator, itemId, userID, price}));
}

function handleRemoveFromCart(itemId) {
    const userID = user.id
    console.log("userID", userID);
    Dispatch(RemoveFromCart({itemId, userID}));
}


  return (
    <div className="ItemInCartWrapper">
        {cart.map((item, index) => {
            return (
            <List className="ListOfItemInCart" key={index} >
            <ListItem alignItems="flex-start" className="ListOfItem">
                <img className="itemImg" src={item.img} alt={item.itemName}/>

                    <div className="itemNameAndPriceWrapper">
                        <div className="itemName">{item.itemName}</div>
                        <div className="itemPrice">$ {item.price}</div>
                    </div>
                    <div className="iconSet">
                <IconButton size="large" onClick={() => handleChangeQuantity("addOne", item.itemId, item.price)} aria-label="addOne">
                    <AddCircleIcon />
                    </IconButton>

                <p className="quantity">{item.quantity}</p>

                <IconButton size="md" onClick={() => handleChangeQuantity("removeOne", item.itemId, item.price)} aria-label="removeOne">
                    <RemoveCircleIcon />
                </IconButton>

                <IconButton size="md" onClick={() => handleRemoveFromCart(item.itemId)} aria-label="delete">
                    <DeleteIcon />
                </IconButton>

                    </div>

            </ListItem>

            <Divider />
            </List>
            )
        })}
      

    </div>
  )
}

export default ItemInCart