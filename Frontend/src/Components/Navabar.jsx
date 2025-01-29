import { NavLink, useNavigate } from "react-router-dom"
import { useStore } from "../Store/store"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Navbar = ({searchQuery , setSearchQuery}) => {

    const navigate = useNavigate();
    const { authToken , setAuthToken , isSeller , setIsSeller , dispatch  , isSearchBarVisible , setIsSearchBarVisible } = useStore();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
    };

    return (
        <>
            <nav className="navbar navbar-expand-md bg-body-tertiary">
                <div className="container-fluid ms-5">
                    <a className="navbar-brand fw-bold text-black" href="/">CLOTHAURA</a>
                    <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isMenuOpen ? "true" : "false"} // Dynamically change expanded state
            aria-label="Toggle navigation"
            onClick={toggleMenu} // Toggle the menu on click
          >
            <span className="navbar-toggler-icon"></span>
          </button>
                    <div className={`collapse navbar-collapse slide-navbar ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <div className="d-flex justify-content-center flex-grow-1">
              {/* Search Bar */}
              <form className="d-flex w-100" role="search">
                <input
                  className="form-control flex-grow-1 me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchOnChange}
                />
              </form>
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* All Tabs in Sidebar */}
              <li className="nav-item">
                <NavLink className="nav-link fw-bolder text-black" to="/shop/men">Men</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bolder text-black" to="/shop/women">Women</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bolder text-black" to="/shop/kids">Kids</NavLink>
              </li>

              {/* Conditional Rendering of "My Order" if user is logged in */}
              {authToken && (
                <li className="nav-item">
                  <NavLink className="nav-link fw-bolder text-black" to="/myorder">My Order</NavLink>
                </li>
              )}

              {/* Cart Tab */}
              <li className="nav-item">
                <NavLink className="nav-link fw-bolder text-black" to="/cart">Cart</NavLink>
              </li>

              {/* Seller Section Tab if the user is a seller */}
              {isSeller && (
                <li className="nav-item">
                  <NavLink className="nav-link fw-bolder text-black" to="/sellersection">Seller Section</NavLink>
                </li>
              )}

              {/* Login/Logout/Register Tabs */}
              {authToken ? (
                <li className="nav-item">
                  <div className="nav-link fw-bolder text-black" onClick={handleLogout}>Logout</div>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bolder text-black" to="/register">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bolder text-black" to="/login">Login</NavLink>
                  </li>
                </>
              )}
            <button className="btn btn-danger" onClick={toggleMenu}>
              Close
            </button>
            </ul>
          </div>
                <div className="collapse navbar-collapse ms-5">
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