import React, { useEffect, useState } from "react";
import { useStore } from "../Store/store";
import { toast } from "react-toastify";

export const MyOrder = () => {
  const { setIsSearchBarVisible , url , authToken } = useStore();
  const [ orders , setOrders ] = useState([]);

  useEffect(()=>{
    setIsSearchBarVisible(false);
    FetchingUsersOrder();
  },[])
  
  const FetchingUsersOrder = async () => {
    try {
      const response = await fetch(`${url}/myorders/fetch`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({ "token" : authToken}),
      })
    
      const res_data = await response.json()

      if(response.ok){
        setOrders(res_data.myOrdersExist.Orderdproducts.reverse());
        return
      }

    } catch (error) {
      console.log("error in myOrders " , error)
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">My Orders</h1>
      {orders.length > 0 ? (
        <div className="row">
          {/* Orders Section */}
          <div className="col-md-12">
            <div className="list-group">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5 className="mb-1">{order.name}</h5>
                    <p className="mb-0">
                      Price: ₹{order.price} x {order.quantity} = ₹
                      {(order.price * order.quantity).toFixed(2)}     
                    </p>
                    <p className="mb-1 text-muted">
                      <strong>Order Date:</strong> {order.date}
                    </p>
                    <p className="mb-1 text-muted">
                      <strong>Order Time:</strong> {order.time}
                    </p>
                  </div>
                  <span className="badge bg-primary rounded-pill">
                    Qty: {order.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>          
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          You have no orders yet.
        </div>
      )}
    </div>
  );
};

