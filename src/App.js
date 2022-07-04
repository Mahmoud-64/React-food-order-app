import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart"
import CartProvider from "./store/cartProvider";
function App() {
  const [isCartShown, SetShowCart] = useState(false)
  const showCartHandler = () => {
    SetShowCart(true)
  }

  const hideCartHandler = () => {
    SetShowCart(false)
  }
  return (
    <CartProvider>
      {isCartShown&&<Cart closeModal={hideCartHandler}/>}
      <Header onShowCard={showCartHandler} />
      <Meals/>
    </CartProvider>
  );
}

export default App;
