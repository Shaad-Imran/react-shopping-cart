import React, { createContext, useReducer, useEffect } from "react";
import "./cart.css";
import { products } from "./Product";
import ContextCart from "./ContextCart";
import { reducer } from "./Reducer";

export const CartContext = createContext();

const initialState = {
  item: products,
  totalAmount: 0,
  totalItem: 0,
};

export default function Cart() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // to delete the individual elements from an Item Cart
  const removeItem = (id) => {
    return dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  //clear the cart
  const clearCart = () => {
    return dispatch({
      type: "CLEAR_CART",
    });
  };

  //Increment the item
  const increment = (id) => {
    return dispatch({
      type: "INCREMENT",
      payload: id,
    });
  };

  //Decrement the item
  const decrement = (id) => {
    return dispatch({
      type: "DECREMENT",
      payload: id,
    });
  };

  // To update the data
  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [state.item]);

  return (
    <>
      <CartContext.Provider
        value={{ ...state, removeItem, clearCart, increment, decrement }}
      >
        <ContextCart />
      </CartContext.Provider>
    </>
  );
}
