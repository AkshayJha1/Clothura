import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from '../Store/store';
import { Error } from './Error';
import { toast } from "react-toastify";


export const SelleUpdateProduct = () => {

  const navigate = useNavigate();

  const { authToken , isSeller , setIsSearchBarVisible  , url} = useStore();

  useEffect(()=>{
    setIsSearchBarVisible(false);
  },[])
  
  if(!(authToken && isSeller)){
    return <Error />
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const product = JSON.parse(queryParams.get("product"));
    
    const [formData, setFormData] = useState({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          targetAudience: product.targetAudience,
          images: product.images,
          productId : product._id,
          token : authToken
    });

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };

    const fetchingUpdateProduct = async () => {
        try {
            const response = await fetch(`${url}/seller/updateproduct`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(formData)
            })

            if(response.ok){
                setFormData({name: product.name, description: product.description, price: product.price, stock: product.stock, targetAudience: product.targetAudience, images: product.images, productId : product._id });
                toast.success('Product Updated');
            }else{
              toast.error('Product Not Updated');
            }
        } catch (error) {
            console.log("error in fetchingUpdateProduct" , error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchingUpdateProduct();
        navigate('/sellersection')
  
    };

    return (
        <div className="container my-5">
          <h2 className="text-black text-center mb-4">Update Product</h2>
          <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="targetAudience" className="form-label">Target Audience</label>
              <input
                type="text"
                className="form-control"
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="images" className="form-label">Product Image URL</label>
              <input
                type="url"
                className="form-control"
                id="images"
                name="images"
                value={formData.images}
                onChange={handleChange}
                required
              />
            </div>
    
            <button type="submit" className="btn btn-primary w-100">Update Product</button>
          </form>
          <div style={{ "display" : "flex" , "justifyContent": "space-between"}}>
            <button className="btn btn-primary w-100 " onClick={() => {
              navigate('/sellersection')
            }}>Back</button>
            <button className="btn btn-primary w-100 ms-5" onClick={() => {
              navigate('/sellersection/addproduct')
            }}>Add Product</button>
          </div>
        </div>
    );
}