import { useState, useEffect} from "react";
import {
  getAllExteriorServices,
  getAllInteriorServices,
  getAllOrders,
} from "../../services/ServiceList";
import { createOrder } from "../../services/OrderService";
import { useNavigate } from "react-router-dom";

export const OrderForm = (props) => {
  const [allInteriorServices, setAllInteriorServices] = useState([]);
  const [allExteriorServices, setAllExteriorServices] = useState([]);
  const [interiorService, setInteriorService] = useState([]);
  const [exteriorService, setExteriorService] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const  navigate = useNavigate();

  const getAndSetOrders = () => {
    getAllOrders().then((orders) => {
        setAllOrders(orders);
    })
  }

  const getAndSetInteriorServices = () => {
    getAllInteriorServices().then((services) => {
      setAllInteriorServices(services);
    });
  };

  const getAndSetExteriorServices = () => {
    getAllExteriorServices().then((services) => {
      setAllExteriorServices(services);
    });
  };

  useEffect(() => {
    getAndSetInteriorServices();
    getAndSetExteriorServices()
    getAndSetOrders();
  }, []);

  

  const handleCreateOrder = (event) => {
    event.preventDefault();
   
  
  const newOrder = {
        id: allOrders.length + 1,
        interiorId: interiorService,
        exteriorId: exteriorService,
        userId: props.currentUser?.id
    }

    createOrder(newOrder).then(() => {
        {navigate("/orders")}
    })

  }

  return (
    <form>
      <div>
        <h2>Create Custom Order</h2>
      </div>
      <h3>Interior Services</h3>
      <section >
        {allInteriorServices.map((serv) => {
          return (
            <div key={serv.id}>
              <input
              
                type="radio"
                value={serv.id}
                name="intservice"
                onChange={(event) => {
                  setInteriorService(parseInt(event.target.value));
                }}
              />

              <label>{serv.service}</label>
            </div>
          );
        })}
      </section>

      <h3>Exterior Services</h3>
      <section>
        {allExteriorServices.map((serv) => {
          return (
            <div key={serv.id}>
              <input
               key={serv.id}
                type="radio"
                value={serv.id}
                name="extservice"
                onChange={(event) => {
                  setExteriorService(parseInt(event.target.value));
                }}
              />
              <label>{serv.service}</label>
            </div>
          );
        })}
      </section>
      <button className="btn-primary" onClick={handleCreateOrder}>Create</button>
    
    </form>
  );
};
