import React, { useEffect } from "react";
import { useStore } from "../Store/store";
import { toast } from "react-toastify";

export const MyOrder = () => {
  const { setIsSearchBarVisible } = useStore();
  const orders = (JSON.parse(localStorage.getItem("order")) || []);

  useEffect(()=>{
    setIsSearchBarVisible(false);
  },[])
  
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

