import { Fragment } from "react";
import classes from "./Header.module.css";
import mealImage from "../../assets/meals.jpg";
import HeaderCartButton from "../UI/HeaderCartButton"
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick ={props.onShowCard}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="a table full of delcious food"></img>
      </div>
    </Fragment>
  );
};

export default Header;
