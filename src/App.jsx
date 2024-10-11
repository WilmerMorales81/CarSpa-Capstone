import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ApplicationViews } from "./views/ApplicationViews";
import { Authorized } from "./views/Authorized";
import { OrderList } from "./components/orders/OrderList";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      {/* <Route path="/orders" element={<OrderList />}></Route> */}
      <Route
        path="*"
        element={
          // Check if the user is authorized first
          <Authorized>
            {/* ApplicationViews is the CHILD component of Authorized. */}
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  );
};
