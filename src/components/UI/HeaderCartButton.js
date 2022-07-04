import { Fragment, useContext } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcons";
import classes from "./HeaderCartButton.module.css";
const HeaerCartButton = (props) => {

  const cartCtx = useContext(CartContext)

  const numberOfCartItems = cartCtx.items.reduce((currnet,item) => { 
    return currnet+ item
   },0)
  return (
    <Fragment>
      <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>your cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </Fragment>
  );
};
export default HeaerCartButton;
