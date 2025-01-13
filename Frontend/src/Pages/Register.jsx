import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../Store/store';
import { toast } from "react-toastify";

export const RegistrationPage = () => {
    const { setAuthToken , setIsSeller , isSeller , setIsSearchBarVisible , url} = useStore();

    useEffect(()=>{
        setIsSearchBarVisible(false);
    },[])
    
    const navigate = useNavigate();
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: {
            state: "",
            city: "",
            street: "",
            pincode: ""
        },
        password: "",
        role: "customer",
        otp: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [addressField]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };  

    const fetchingRegisterOTPMailing = async (email) => {
        try {
            const response = await fetch(`${url}/users/registerOTPMailing`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({email}),
            })
    
            if(response.ok){
                setIsOtpSent(true);
                toast.success('OTP Sent');
            }
            
        } catch (error) {
            
        }
    }

    const fetchingResgisterViaOtp = async (formData) => {
        try {
            const response = await fetch(`${url}/users/resgisterViaOtp`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(formData),
            })

            const res_data = await response.json();

            if(response.ok){
                localStorage.setItem("authToken" , res_data.authToken)
                setAuthToken(res_data.authToken);
                setFormData({name: "", email: "", phone: "", address: {state: "", city: "", street: "", pincode: ""}, password: "", role: "customer", otp: ""})
                setIsOtpSent(false);
                toast.success("Registered Successfully");
                navigate('/');
            }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

        } catch (error) {
            console.log("registration error =",error);
        }
    }

    const fetchingResgisterAsSellerViaOtp = async (updatedFormData) => {
        try {
            const response = await fetch(`${url}/users/resgisterViaOtp`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(updatedFormData),
            })

            const res_data = await response.json();

            if(response.ok){
                localStorage.setItem("authToken" , res_data.authToken)
                setAuthToken(res_data.authToken);
                setFormData({name: "", email: "", phone: "", address: { state: "", city: "", street: "", pincode: "" }, password: "", role: "customer" , otp: ""})
                setIsOtpSent(false);
                toast.success("Registered Successfully as Seller");
                navigate('/');
                localStorage.setItem("role",true);
                setIsSeller(true);                
            }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

        } catch (error) {
            console.log("registration error =",error);
        }
    }

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        await fetchingRegisterOTPMailing(formData.email);
    }

    const handleRegisterSubmit = async (e) =>{
        e.preventDefault();
        await fetchingResgisterViaOtp(formData);
    }

    const handleRegisterAsSeller = async (e) =>{
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            role: "seller"
        };
        await fetchingResgisterAsSellerViaOtp(updatedFormData);
    }
    const handleLoginOnClick = (e) => {
        e.preventDefault();
      navigate('/login');
    }

    return (
      <div className="container" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 className="text-center mb-4 text-bold">Registration Page</h1>
      {
        isOtpSent ? (
            <>
            <form onSubmit={handleRegisterSubmit}>
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  readOnly
              />
          </div>
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                  type="email"
                  id="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly
              />
          </div>
          <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone:</label>
              <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  readOnly
              />
          </div>
          <div className="mb-3">
              <label htmlFor="state" className="form-label">State:</label>
              <input
                  type="text"
                  id="state"
                  className="form-control"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  readOnly
              />
          </div>
          <div className="mb-3">
              <label htmlFor="city" className="form-label">City:</label>
              <input
                  type="text"
                  id="city"
                  className="form-control"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  readOnly
              />
          </div>
          <div className="mb-3">
              <label htmlFor="street" className="form-label">Street:</label>
              <input
                  type="text"
                  id="street"
                  className="form-control"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  readOnly
              />
          </div>
          <div className="mb-3">
              <label htmlFor="pincode" className="form-label">Pincode:</label>
              <input
                  type="text"
                  id="pincode"
                  className="form-control"
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  readOnly
              />
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                  type="password"
                  id="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  readOnly
              />
          </div>
          <div className="mb-3">
              <label htmlFor="otp" className="form-label">OTP:</label>
              <input
                  type="text"
                  id="otp"
                  className="form-control"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  required
              />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3"> Register </button>
        </form>
        <div className="text-center">
            <button  className="btn btn-primary w-100 mb-3" onClick={handleRegisterAsSeller}>Register As Seller</button>
        </div>
        </>
        ) : (
            <form onSubmit={handleOTPSubmit}>
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                  type="email"
                  id="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone:</label>
              <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="mb-3">
              <label htmlFor="state" className="form-label">State:</label>
              <input
                  type="text"
                  id="state"
                  className="form-control"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="mb-3">
              <label htmlFor="city" className="form-label">City:</label>
              <input
                  type="text"
                  id="city"
                  className="form-control"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="mb-3">
              <label htmlFor="street" className="form-label">Street:</label>
              <input
                  type="text"
                  id="street"
                  className="form-control"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="mb-3">
              <label htmlFor="pincode" className="form-label">Pincode:</label>
              <input
                  type="text"
                  id="pincode"
                  className="form-control"
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                  type="password"
                  id="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
              />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3" >Send OTP</button>
        </form>
        )
      }
      <div className="text-center">
          <p>Already a user? <button className="btn btn-link" onClick={handleLoginOnClick}>Login</button></p>
      </div>
  </div>
    );
}

