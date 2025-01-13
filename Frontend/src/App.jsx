import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Navbar } from './Components/Navabar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { RegistrationPage } from './Pages/Register';
import { LoginPage } from './Pages/Login';
import { LoginViaOtpPage } from './Pages/LoginViaOtp';
import { Shop } from './Pages/all-collection'
import { Men } from './Pages/Men-collection';
import { Women } from './Pages/Women-collection';
import { Kids } from './Pages/Kids-collection';
import { Category } from './Pages/category';
import Cart from './Pages/Cart';
import { MyOrder } from './Pages/MyOrder';
import { useStore } from './Store/store';
import { Error } from './Pages/Error';
import { Seller } from './Pages/Seller';
import { SellerAddProduct } from './Pages/sellerAddProduct';
import { SelleUpdateProduct } from './Pages/SellerUpdateProduct';

const App = () => {
  const { url } = useStore();
  const [ searchQuery , setSearchQuery ] = useState("");
  const [allProducts , setAllProducts] = useState([]);

  const fetchingAllProducts = async () => {
          try {
              const response = await fetch(`${url}/shop/allProducts`,{
                  method : "GET",
              })
  
              if(response.ok){
                  const data = await response.json();
                  setAllProducts(data.response);
              }
          } catch (error) {
              console.error("Error in fetching Products",error);
          }
  }
  
  useEffect(()=>{
    fetchingAllProducts();
  },[]);

    return (
      <>
        <BrowserRouter>
          <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Routes>
            <Route path='/' element = {<Home allProducts={allProducts} searchQuery={searchQuery} />} />
            <Route path='/register' element = {<RegistrationPage />} />
            <Route path='/login' element = {<LoginPage />} />
            <Route path='/loginViaOtp' element = {<LoginViaOtpPage />} />
            <Route path='/shop' element= {<Shop allProducts={allProducts} searchQuery={searchQuery} />}>
              <Route path='men' element = {<Men allProducts={allProducts} searchQuery={searchQuery} />} />
              <Route path='women' element = {<Women allProducts={allProducts} searchQuery={searchQuery} />} />
              <Route path='kids' element = {<Kids allProducts={allProducts} searchQuery={searchQuery} />} />
            </Route>
            <Route path={`/category/:category`} element = {<Category  allProducts={allProducts} searchQuery={searchQuery} />} /> 
            <Route path='/cart' element = {<Cart />} />
            {/* <Route path='/payment' element = {<Payment />} /> */}
            <Route path='/myorder' element = {<MyOrder />} />
            <Route path='/sellersection' element = {<Seller />} /> 
            <Route path='/sellersection/addproduct' element = {<SellerAddProduct />} />
            <Route path={`/sellersection/updateproduct`} element = {<SelleUpdateProduct />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </>
    )
}

export default App;