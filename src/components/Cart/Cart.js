import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const cartHasItems = cartCtx.items.length>0
  const cartTotalAmount = cartCtx.totalAmount.toFixed(2);
  const onAddHandler = (item) => {
    cartCtx.addItem({...item, amount:1})
  }
  const onRemoveHandler =(itemId) => {
    cartCtx.removeItem(itemId)
  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          summary={item.summary}
          price={item.price}
          amount={item.amount}
          onRemove={onRemoveHandler.bind(null,item.id)}
          onAdd={onAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal closeModal={props.closeModal}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.closeModal}>
          Close
        </button>
        {cartHasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
