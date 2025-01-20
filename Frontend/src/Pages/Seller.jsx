import { useStore } from "../Store/store"
import { Error } from "./Error";
import { SellerCard } from "../Components/Seller-card";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Seller = () => {

    const [ products , setProducts ] = useState([]);
    const navigate = useNavigate();
    const { authToken , isSeller , setIsSearchBarVisible , url } = useStore();

    useEffect(()=>{
        setIsSearchBarVisible(false);
    },[])

    if(!(authToken && isSeller)){
        return <Error />
    }

    const sellerProducts = async () =>{
        try {
            const response = await fetch(`${url}/seller/sellerproducts`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({ "token" : authToken})
            })

            if(response.ok){
                const data = await response.json();
                setProducts(data.ProductExist)
            }
        } catch (error) {
            console.log("Error in fetching Seller Products" , error);
        }
    }
    
    useEffect(()=>{
        sellerProducts();
    },[])

    const handleProductDelete = (productId) => {
        setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
    };

    return (
        <>
            <div className="container py-5">
            <h1 className="mb-4" >Your Products</h1>
            {
                products.length === 0 ? (
                    <div className="alert alert-info" role="alert">
                      You have no products yet.
                    </div>
                ) :( 
                 <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", padding: "16px" }}>
                {products.map((item , index) => (
                    <SellerCard key={item._id} products={item} onProductDelete={handleProductDelete} index={index} />
                ))}
                </div>
                )
            }
            
            <button className="d-flex justify-content-center align-items-center btn btn-primary" onClick={()=>{ navigate('/sellersection/addproduct') }} style={{ position: 'fixed',bottom: '20px',right: '20px',width: '80px',height: '80px',borderRadius: '50%',color: 'white',fontSize: '18px'}}>
                ADD
            </button>
            </div>
        </>
    )
}