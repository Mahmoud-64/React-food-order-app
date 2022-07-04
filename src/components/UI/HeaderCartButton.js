import { Fragment, useContext, useState, useEffect } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcons";
import classes from "./HeaderCartButton.module.css";
const HeaerCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);
  const numberOfCartItems = cartCtx.items.reduce((currnet, item) => {
    return currnet + item.amount;
  }, 0);
  return (
    <Fragment>
      <button className={btnClasses} onClick={props.onClick}>
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
