import { NavLink, useNavigate } from "react-router-dom"
import { useStore } from "../Store/store";
import { toast } from "react-toastify";
export const SellerCard = ({products , onProductDelete , size}) => {

    const navigate = useNavigate();
    const { authToken , url } = useStore(); 
    const fetchingRemovingProduct = async (productId) => {
        try {
            const response = await fetch(`${url}/seller/removeproduct`,{
                method: "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({ productId , token : authToken })
            })

            if(response.ok){
                toast.success("Product Deleted");
                onProductDelete(productId);
            }
        } catch (error) {
            console.log("Error in Deleting Product" , error);
        }
    }
    if(size === "large" || size === "medium"){
        return (
            <>
                <div className="card" style={{ width: "18rem", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", margin: "10px" }}>
                <img src={products.images} className="card-img-top" alt={products.name} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body" style={{ padding: "15px" }}>
                    <h5 className="card-title" style={{ fontWeight: "bold", marginBottom: "10px" }}>{products.name}</h5>
                    <p className="card-text" style={{ color: "#555", marginBottom: "10px" }}>{products.description}</p>
                    <p className="card-text" style={{ fontWeight: "bold", marginBottom: "5px" }}>Price: ₹{products.price}</p>
                    <p className="card-text" style={{ color: "#777", marginBottom: "5px" }}>Stock: {products.stock} available</p>
                    <p className="card-text" style={{ color: "#777", marginBottom: "10px" }}>Category: {products.category}</p>
                    <div style={{"display" : "flex"}}>
                        <button className="btn btn-primary" onClick={()=>{ navigate(`/sellersection/updateproduct?product=${encodeURIComponent(JSON.stringify(products))}`) }} style={{ width: "100%" }} >Update</button>
                        <button className="btn btn-primary ms-3" onClick={async ()=>{
                            await fetchingRemovingProduct(products._id);
                        }} style={{ width: "100%"  }} >Delete</button>
                    </div>
                </div>
                </div>
            </>
        )
    }else {
        return (        
            <div className="card mb-3" style={{  border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", margin: "10px" }}>
                <div className="row g-0">
                    <div className="col-4 col-md-4 d-flex align-items-center justify-content-center">
                        <img src={products.images} className="img-fluid rounded-start" alt={products.name} style={{height : "100%", objectFit: "cover" }} />
                    </div>
                    <div className="col-8 col-md-8 d-flex">
                        <div className="card-body" style={{ padding: "10px" }}>
                            <h5 className="card-title" style={{ fontWeight: "bold", marginBottom: "5px" }}>{products.name}</h5>
                            {/* <p className="card-text" style={{ color: "#555", marginBottom: "10px" }}>{product.description}</p> */}
                            <p className="card-text" style={{ fontWeight: "bold", marginBottom: "2px" }}>Price: ₹{products.price}</p>
                            <p className="card-text" style={{ color: "#777", marginBottom: "5px" }}>Stock: {products.stock} available</p>
                            <p className="card-text" style={{ color: "#777", marginBottom: "5px" }}>Category: {products.category}</p>
                            <div style={{"display" : "flex"}}>
                                <button className="btn btn-primary" onClick={()=>{ navigate(`/sellersection/updateproduct?product=${encodeURIComponent(JSON.stringify(products))}`) }} style={{ width: "100%" }} >Update</button>
                                <button className="btn btn-primary ms-3" onClick={async ()=>{
                                    await fetchingRemovingProduct(products._id);
                                }} style={{ width: "100%"  }} >Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}