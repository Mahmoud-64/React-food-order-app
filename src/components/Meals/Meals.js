import MealsSummary from "./MealsSummary";
import AvailabeMeals from "./AvailableMeals";
import { Fragment, useContext } from "react";
import CartContext from "../../store/cart-context";

const Meals = () => {
  const cartCtx = useContext(CartContext)

  return <Fragment>
    <MealsSummary/>
    <AvailabeMeals/>
  </Fragment>;
};

export default Meals
