import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { localhost } from "../../utils/localHost";

const initialState = {
  data: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      console.log("add to cart action", action);
      console.log("currentState", current(state));

      const { name, price, img, _id } = action.payload.item;
      const userId = action.payload.userId;

      const actionData = { _id, price, userId, name, img };

      async function addItemToCart() {
        try {
          const res = await axios.put(
            "http://localhost:7000/cart/AddItemToCart",
            actionData
          );
          // console.log("res", res);
        } catch (error) {
          console.log("error: ", error);
        }
      }
      addItemToCart();

      const findExistItemIndex = state.data.findIndex(
        (item) => item.itemId === _id
      );
      console.log("findExistItemIndex", findExistItemIndex);

      if (findExistItemIndex === -1) {
        //   console.log("payload", name, price, _id, img);
        const newProduct = {
          itemName: name,
          itemId: _id,
          img: img,
          quantity: 1,
          price: price,
        };
        state.data.push(newProduct);
        console.log("state after push", current(state));
      }

      if (findExistItemIndex !== -1) {
        const newQuantity = state.data[findExistItemIndex].quantity + 1;
        const oneItemPrice =
          state.data[findExistItemIndex].price /
          state.data[findExistItemIndex].quantity;
        const newPrice = oneItemPrice * newQuantity;
        state.data[findExistItemIndex].quantity = newQuantity;
        state.data[findExistItemIndex].price = newPrice;
        console.log(current(state.data[findExistItemIndex]));
        console.log(newPrice);
      }
    },

    changeQuantity(state, action) {
      const findExistItemIndex = state.data.findIndex(
        (item) => item.itemId === action.payload.itemId
      );

      if (action.payload.operator === "addOne") {
        const newQuantity = state.data[findExistItemIndex].quantity + 1;
        const oneItemPrice =
          state.data[findExistItemIndex].price /
          state.data[findExistItemIndex].quantity;
        const newPrice = oneItemPrice * newQuantity;
        state.data[findExistItemIndex].quantity = newQuantity;
        state.data[findExistItemIndex].price = newPrice;
      }
      if (action.payload.operator === "removeOne") {
        const newQuantity = state.data[findExistItemIndex].quantity - 1;
        if (newQuantity > 0) {
          const oneItemPrice =
            state.data[findExistItemIndex].price /
            state.data[findExistItemIndex].quantity;
          const newPrice = oneItemPrice * newQuantity;
          state.data[findExistItemIndex].quantity = newQuantity;
          state.data[findExistItemIndex].price = newPrice;
        }
      }

      const itemId = action.payload.itemId;
      const userID = action.payload.userID;
      const operator = action.payload.operator;
      const price = action.payload.price;

      const actionData = { itemId, userID, operator, price };
      console.log("actionData", actionData);

      async function changeQuantity() {
        try {
          const res = await axios.put(
            "http://localhost:7000/cart/changeQuantity",
            actionData
          );
          console.log("res", res);
        } catch (error) {
          console.log("error: ", error);
        }
      }
      changeQuantity();
    },

    RemoveFromCart(state, action) {
      console.log("remove one - ", action);
      const findExistItemIndex = state.data.findIndex(
        (item) => item.itemId === action.payload
      );
      state.data.splice(findExistItemIndex, 1);

      const userID = action.payload.userID;
      const itemId = action.payload.itemId;
      const actionData = { itemId, userID };

      async function removeFromCart() {
        try {
          const res = await axios.put(
            "http://localhost:7000/cart/removeFromCart",
            actionData
          );
          console.log("res", res);
        } catch (error) {
          console.log("error: ", error);
        }
      }
      removeFromCart();
    },

    MirrorCartDBToState(state, action) {
      console.log("MirrorCartDBToState - action", action.payload.data.message);
      state.data = action.payload.data.message;
    },
  },
});

export const {
  addItemToCart,
  changeQuantity,
  RemoveFromCart,
  MirrorCartDBToState,
} = cartSlice.actions;
export default cartSlice.reducer;
