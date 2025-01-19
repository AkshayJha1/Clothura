import React, { useEffect } from "react";
import { useStore } from "../Store/store";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {loadStripe} from '@stripe/stripe-js';

const CartPage = () => {
  const { state, dispatch , setIsSearchBarVisible , authToken , url} = useStore();
  const navigate = useNavigate();

  useEffect(()=>{
    setIsSearchBarVisible(false);
  },[])
  // Remove item from cart
  const removeItem = async (index) => {
    await dispatch({ type: "REMOVE", index: index });  // Pass item id to remove from cart
    toast.success("Removed from Cart")
  };

  // Update quantity
  const updateQuantity = async (id, quantity , price, finalPrice , newQuantity ,index) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    await dispatch({
        type: "UPDATE",
        id : id,
        quantity: newQuantity,               // Pass the new quantity to the action
        finalPrice : newQuantity * price     // Recalculate the price based on new quantity
    });
};

  // Calculate total
  const totalPrice = state.reduce(
    (total, item) => total + item.finalPrice,
    0
  );

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51QdxX6CLkqtpOdHaFFNNmvZ2tTXMqkBhq0p4shkrsYGwDP38bFnr2WmB4d7QPITBt41bOXR8x0kcnmzSmJbZCPLL00IK8TPmEI");

    const body = {
        products : state
    };

    const headers = {
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(`${url}/checkout/createPaymentIntent`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error("Stripe Checkout error:", result.error.message);
        }
    } catch (error) {
        console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {

    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      dispatch({ type: "DROP" }); // Clear the cart
      toast.success("Payment Successful")
      toast.success("Thanks For Shoping")
    }

    if (query.get("cancel")) {
      toast.error("Payment Cancelled")
    }

  }, []);


  return (
    <div className="container py-5">
      <h1 className="mb-4">Shopping Cart</h1>
      {state.length > 0 ? (
        <div className="row">
          {/* Cart Items Section */}
          <div className="col-md-8">
            <div className="list-group">
              {state.map((item , index) => (
                <div
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-0">₹{item.finalPrice.toFixed(2)}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      className="form-control me-2"
                      style={{ width: "80px" }}
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          item.quantity,
                          item.price,
                          item.finalPrice,
                          parseInt(e.target.value),
                          index
                        )
                      }
                    />
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(index)} // Pass item.id to remove it
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <p className="card-text">
                  Subtotal ({state.length} items):{" "}
                  <strong>₹{totalPrice.toFixed(2)}</strong>
                </p>
                {
                  authToken ? ( <>
                    <button className="btn btn-primary w-100" onClick={makePayment}>
                        Proceed to Checkout
                    </button>
                    </>
                  ) : (<>
                      <button className="btn btn-primary w-100" onClick={()=>{
                        navigate('/login')
                      }} >
                          Proceed to Checkout
                      </button>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          Your cart is empty.
        </div>
      )}
    </div>
  );
};

export default CartPage;
