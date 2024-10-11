import { Route, Routes } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { Outlet } from "react-router-dom";
import { Welcome } from "../components/welcome/Welcome";
import { useEffect, useState } from "react";
import { OrderForm}  from "../components/orders/OrderForm";
import { OrderList } from "../components/orders/OrderList";
import { EditForm } from "../components/orders/EditForm";



export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localCarUser = localStorage.getItem("car_user")
    const carUserObject = JSON.parse(localCarUser)

    setCurrentUser(carUserObject)
  }, [])



  return (
    <Routes>
      <Route path="/" element={<><NavBar /> <Outlet/></>}>
        <Route index element={<Welcome />} />
        <Route path="/orders" element={< OrderList currentUser={currentUser}/>} />          
        <Route path="/create" element={<OrderForm currentUser={currentUser}/>}/>
        <Route path="/edit" element={<EditForm currentUser={currentUser}/>}/>
      </Route>
    </Routes>
  );
};