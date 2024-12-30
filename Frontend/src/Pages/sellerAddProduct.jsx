import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/store";
import { Error } from "./Error";
import { toast } from "react-toastify";

export const SellerAddProduct = () => {
    const { authToken , isSeller , setIsSearchBarVisible , url} = useStore() 
    const navigate = useNavigate();

    useEffect(()=>{
      setIsSearchBarVisible(false);
    },[])

    if(!(authToken && isSeller)){
       return <Error />
    }

    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      targetAudience: '',
      images: '',
      token : authToken
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const fetchingAddProduct = async() =>{
        try {
            const response = await fetch(`${url}/seller/addproduct`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(formData)
            })

            if(response.ok){
                setFormData({name: '',description: '',price: '',stock: '',category: '',targetAudience: '',images: '' , token : authToken});
                toast.success('Product Added');
            }
        } catch (error) {
            console.log("Error in Adding Product" , error);
        }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      await fetchingAddProduct();
      navigate('/sellersection')

    };
  
    return (
      <div className="container my-5">
        <h2 className="text-black text-center mb-4">Add Product</h2>
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
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
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
  
          <button type="submit" className="btn btn-primary w-100">Add Product</button>
        </form>
        <button className="btn btn-primary w-100 " onClick={() => {
              navigate('/sellersection')
            }}>Back</button>
      </div>
    );
};  