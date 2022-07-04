import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailabeMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        "https://food-order-app-49b1c-default-rtdb.firebaseio.com/meals.json",
        {}
      );
      setIsLoading(false);
      const parsedRes = await res.json();
      let temp = [];
      for (const key in parsedRes) {
        temp.push({
          id: key,
          name: parsedRes[key].name,
          description: parsedRes[key].description,
          price: parsedRes[key].price,
        });
      }
      setMeals(temp);
    };
    fetchMeals()
      .then()
      .catch((err) => {
        setHttpError({ message: "Something went wrong!" });
        setIsLoading(false);
        console.log(err)
      });
  }, []);
  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  if (isLoading) {
    return <section className={classes.loading}>loading...</section>;
  }

  if (httpError) {
    return <section className={classes.errorMessage}>{httpError.message}</section>;
  }
  return (
    <section className={classes.meals}>
      <ul>
        <Card>{mealsList}</Card>
      </ul>
    </section>
  );
};

export default AvailabeMeals;
