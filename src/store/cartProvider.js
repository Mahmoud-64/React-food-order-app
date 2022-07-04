import { useReducer } from "react";
import CartContext from "./cart-context";
const initialState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return initialState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartActions] = useReducer(
    cartReducer,
    initialState
  );
  const addItemToTheCart = (item) => {
    dispatchCartActions({ type: "ADD", item: item });
  };
  const removeItemFromTheCart = () => {};
  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToTheCart,
    removeItem: removeItemFromTheCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
