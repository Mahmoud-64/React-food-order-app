import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";
const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);
  const addAmount = (event) => {
    event.preventDefault();
    console.log(amountInputRef.current.value.trim());
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5 ||
      enteredAmount.trim().length === 0
    ) {
      setAmountIsValid(false);
    }
    props.onAddToCart(enteredAmountNumber);
  };
  
  return (
    <form className={classes.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button onClick={addAmount}>+ add</button>
    </form>
  );
};

export default MealItemForm;
