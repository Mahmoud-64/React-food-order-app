import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef } from "react";
const MealItemForm = (props) => {
  const amountRef = useRef()
  const addAmount = (event) => {
    event.preventDefault()
    console.log(amountRef.current.value)
  }
  return (
    <form className={classes.form}>
      <Input
        ref={amountRef}
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
