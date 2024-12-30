import { NavLink, useNavigate } from "react-router-dom"
import { useStore } from "../Store/store"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Navbar = ({searchQuery , setSearchQuery}) => {

    const navigate = useNavigate();
    const { authToken , setAuthToken , isSeller , setIsSeller , dispatch  , isSearchBarVisible , setIsSearchBarVisible } = useStore();

    const handleLogout = async() => {
        await navigate('/');
        localStorage.removeItem("authToken")
        setAuthToken("");
        localStorage.removeItem("role",false)
        setIsSeller(false)
        await dispatch({ type: "DROP" });
        toast.error('Logged Out')
    }

    const handleSearchOnChange = (e) => {
        setSearchQuery(e.target.value)
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid ms-5">
                    <a className="navbar-brand fw-bold text-black" href="/">CLOTHAURA</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item ">
                    <NavLink className="nav-link fw-bolder text-black" to="/shop/men">Men</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link fw-bolder text-black" to="/shop/women">WOMEN</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link fw-bolder text-black" to="/shop/kids" >KIDS</NavLink>
                    </li>
                </ul>
                <form className="d-flex w-100 ms-5 me-5" role="search">
                    {
                        isSearchBarVisible ? (
                            <input className="form-control flex-grow-1 me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={handleSearchOnChange} />
                        ) : (
                            <input className="form-control flex-grow-1 me-2" type="search" style={{"display" : "none"}} placeholder="Search" aria-label="Search" value={searchQuery} onChange={handleSearchOnChange} />
                        )
                    }
                </form>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {
                        authToken ? ( <> 
                            <li className="nav-item ">
                                <NavLink className="nav-link fw-bolder text-black" style={{ whiteSpace: "nowrap" }} to="/myorder" >My Order</NavLink>
                            </li>
                         </>) : (
                            <></>
                        )
                    }
                    <li className="nav-item ">
                        <NavLink className="nav-link fw-bolder text-black" to="/cart" >Cart</NavLink>
                    </li>
                    {
                        isSeller ? (
                            <li className="nav-item ">
                                <NavLink className="nav-link fw-bolder text-black" style={{ whiteSpace: "nowrap" }} to="/sellersection"> Seller Section </NavLink>
                            </li>
                        ) : (
                            <></>
                        )
                    }
                    {
                        authToken ? ( <> 
                            <li className="nav-item">
                                    <div className="nav-link fw-bolder text-black" onClick={handleLogout}>Logout</div>
                            </li>
                         </>) : (
                            <>
                                <li className="nav-item ">
                                    <NavLink className="nav-link fw-bolder text-black" to="/register">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link fw-bolder text-black" to="/login">Login</NavLink>
                                </li>
                            </>
                        )
                    }
                </ul>
                </div>
            </div>
            </nav>
            
        </>
    )
}