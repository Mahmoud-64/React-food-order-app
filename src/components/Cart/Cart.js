import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckouut] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmited, setDidSubmitted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const cartCtx = useContext(CartContext);
  const cartHasItems = cartCtx.items.length > 0;
  const cartTotalAmount = cartCtx.totalAmount.toFixed(2);
  const onAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const onRemoveHandler = (itemId) => {
    cartCtx.removeItem(itemId);
  };
  const orderHandler = () => {
    setIsCheckouut(true)
  }
  const onSubmitHandler =(userData) => {
    setIsSubmitting(true)
    const submitOrder = () => {
      return fetch("https://food-order-app-49b1c-default-rtdb.firebaseio.com/orders.json",{
        method:"POST",
        body: JSON.stringify({
          user: userData,
          orderedItems:cartCtx.items
        })
      })
    }
    submitOrder()
      .then((res) => {
        setIsSubmitting(false)
        cartCtx.clearCart()
        props.closeModal()
      })
      .catch((err) => {
        setHasError(true)
        setDidSubmitted(true)
        setIsSubmitting(false)
        cartCtx.clearCart()
      });
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
          onRemove={onRemoveHandler.bind(null, item.id)}
          onAdd={onAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const actions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.closeModal}>
        Close
      </button>
      {cartHasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  );

  const submitting = ( <p className={classes.submitting}>submitting ...</p>)
  const submitted = ( <p className={classes.submitted}>Order submitted successfully</p>)
  const ErrorMessage = ( <p className={classes.errorMessage}>Something went wrong!</p>)
  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotalAmount}</span>
      </div>
      {isCheckout &&<Checkout onSubmit={onSubmitHandler} onCancel={props.closeModal}/>}
      {!isCheckout && actions}
    </Fragment>
  );
  return(
    <Modal closeModal={props.closeModal}>
      {!isSubmitting && !didSubmited && cartModalContent}
      {isSubmitting && !didSubmited && submitting}
      {!isSubmitting && didSubmited && !hasError && submitted}
      {hasError && didSubmited && ErrorMessage}
    </Modal>
  )
};

export default Cart;
