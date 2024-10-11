import { useEffect, useState } from "react";
import { deleteOrder, getAllOrders } from "../../services/OrderService";
import "./Orders.css";
import { getAllInteriorServices, getAllExteriorServices } from "../../services/ServiceList";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/UserService";





export const OrderList = (props) => {
  const [allOrders, setAllOrders] = useState([]);
  const [allInteriorServices, setAllInteriorServices] = useState([]);
  const [allExteriorServices, setAllExteriorServices] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
 



  const getAndSetOrders = () => {
    getAllOrders().then((ordersArray) => {
      setAllOrders(ordersArray);
    });
  }
  const getAndSetInteriorServices = () => {
    getAllInteriorServices().then((services) => {
      setAllInteriorServices(services)
    })
  }

  const getAndSetExteriorServices = () => {
    getAllExteriorServices().then((services) => {
      setAllExteriorServices(services)
    })
  }
  const getOrdersByUserId = () => {
    const filteredOrders = allOrders.filter((order) => order.userId === props.currentUser.id)
    setAllOrders(filteredOrders)
  }

  const getAndSetAllUsers = () => {
    getAllUsers().then((users) => {
      setAllUsers(users)
    }) 
  }

  


  useEffect(() => {
    getAndSetOrders()  
    getAndSetInteriorServices()
    getAndSetExteriorServices()
    getAndSetAllUsers()
  }, []);


  const handleDeleteOrder = (order) => {
    deleteOrder(order.id).then(() => {
      getAndSetOrders();
    })

  }





    const navigate = useNavigate()

    return (

    <div className="tickets-container">
      <h2>Orders</h2>
      <div>
        <button className="filter-btn btn-primary" onClick={getAndSetOrders}>All Orders</button>
        <button className="filter-btn btn-info" onClick={getOrdersByUserId}>My Orders</button>
        <button className="btn-warning" onClick={() => {navigate("/create")}}>New Order</button>
      </div>
      <article className="tickets">
        {allOrders.map((order) => {
          const intServiceArray = allInteriorServices.filter((intserv) => intserv.id === order.interiorId)
          const extServiceArray = allExteriorServices.filter((extserv) => extserv.id === order.exteriorId)
          const assignedUserArray = allUsers.filter((assigned) => assigned.id === order.userId)


            return ( 
              <section className="ticket" key={order.id}>
                <header className="ticket-info">Order # {order.id}</header>
                <div>Service Interior : {intServiceArray[0]?.service}</div>
                <div>Service Exterior : {extServiceArray[0]?.service}</div>
              

                <footer>
                  <div className="ticket-info">User name: {assignedUserArray[0]?.fullName}:</div>
                  {assignedUserArray[0]?.id === props.currentUser?.id ? (
                                    
                  <div>
                  <button className="btn-info" onClick={() => {navigate(`/edit?orderId=${order.id}`)}}>Edit Order</button>
                  <button className="btn-warning" onClick={() => handleDeleteOrder(order)}>Delete Order</button>
                  </div>
                  ) : (
                    ""
                  )
                }
                </footer>
              </section>
              
            );
        })}
      </article>     
    </div>
  );
};
