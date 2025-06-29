import React, { useState , useEffect } from 'react';
import { useStore } from '../Store/store';
import { toast } from "react-toastify";
export const ShopCard = ({ product , size }) => {

    const { state , dispatch } = useStore();

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });    

    const handleAddToCart = async() => {

        const existingProduct = state.find(item => item.id === product._id);

        if(existingProduct){
            toast.error(`${product.name} is already in the cart`);
            return;
        }

        await dispatch({type:"ADD",id : product._id , name : product.name , price : product.price ,finalPrice : product.price, quantity : 1})
        toast.success("Added to Cart")
    }
    if(size === "large"){
        return (
            <div className="card" style={{ width: "18rem", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", margin: "10px" }}>
                <img src={product.images} className="card-img-top" alt={product.name} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body" style={{ padding: "15px" }}>
                    <h5 className="card-title" style={{ fontWeight: "bold", marginBottom: "10px" }}>{product.name}</h5>
                    <p className="card-text" style={{ color: "#555", marginBottom: "10px" }}>{product.description}</p>
                    <p className="card-text" style={{ fontWeight: "bold", marginBottom: "5px" }}>Price: ₹{product.price}</p>
                    <p className="card-text" style={{ color: "#777", marginBottom: "5px" }}>Stock: {product.stock} available</p>
                    <p className="card-text" style={{ color: "#777", marginBottom: "10px" }}>Category: {product.category}</p>
                    <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        );
    }else if(size === "medium"){
        return (
            <div className="card" style={{ width: "18rem", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", margin: "10px" }}>
                <img src={product.images} className="card-img-top" alt={product.name} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body" style={{ padding: "15px" }}>
                    <h5 className="card-title" style={{ fontWeight: "bold", marginBottom: "10px" }}>{product.name}</h5>
                    <p className="card-text" style={{ color: "#555", marginBottom: "10px" }}>{product.description}</p>
                    <p className="card-text" style={{ fontWeight: "bold", marginBottom: "5px" }}>Price: ₹{product.price}</p>
                    <p className="card-text" style={{ color: "#777", marginBottom: "5px" }}>Stock: {product.stock} available</p>
                    <p className="card-text" style={{ color: "#777", marginBottom: "10px" }}>Category: {product.category}</p>
                    <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        );
    }else{
        return (        
            <div className="card mb-3" style={{  border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", margin: "10px" }}>
                <div className="row g-0">
                    <div className="col-4 col-md-4 d-flex align-items-center justify-content-center">
                        <img src={product.images} className="img-fluid rounded-start" alt={product.name} style={{height : "100%", objectFit: "cover" }} />
                    </div>
                    <div className="col-8 col-md-8 d-flex">
                        <div className="card-body" style={{ padding: "10px" }}>
                            <h5 className="card-title" style={{ fontWeight: "bold", marginBottom: "5px" }}>{product.name}</h5>
                            {/* <p className="card-text" style={{ color: "#555", marginBottom: "10px" }}>{product.description}</p> */}
                            <p className="card-text" style={{ fontWeight: "bold", marginBottom: "2px" }}>Price: ₹{product.price}</p>
                            <p className="card-text" style={{ color: "#777", marginBottom: "5px" }}>Stock: {product.stock} available</p>
                            <p className="card-text" style={{ color: "#777", marginBottom: "5px" }}>Category: {product.category}</p>
                            <button className="btn btn-primary" style={{ width: "100%" , flexDirection : "end" }} onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
        
    
};