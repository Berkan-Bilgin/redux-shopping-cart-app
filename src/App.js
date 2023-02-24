import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log(isLoggedIn)
  useEffect(() => {
    const sendRequest = async() => {
      // Send state as Sending request
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending Request"
      }))
      const res = await fetch('https://redux-http-5edbe-default-rtdb.firebaseio.com/cartItems.json',{
        method: "PUT",
        body: JSON.stringify(cart),
      });
      const data = await res.json();
      // Send state as Request is successful
    };
    sendRequest().catch(err => {
      // send state as Error
    });
  },[cart]);
  return (
    <div className="App">
    <Notification type="success" message = {"Success"}></Notification>
     {!isLoggedIn && <Auth/>}
     {isLoggedIn && <Layout/>}
    </div>
  );
}

export default App;
