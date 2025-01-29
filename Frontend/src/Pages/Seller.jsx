import { useStore } from "../Store/store";
import { Error } from "./Error";
import { SellerCard } from "../Components/Seller-card";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Seller = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { authToken, isSeller, setIsSearchBarVisible, url } = useStore();

    useEffect(() => {
        setIsSearchBarVisible(false);
    }, []);

    if (!(authToken && isSeller)) {
        return <Error />;
    }

    const sellerProducts = async () => {
        try {
            const response = await fetch(`${url}/seller/sellerproducts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: authToken }),
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data.ProductExist);
            }
        } catch (error) {
            console.log("Error in fetching Seller Products", error);
        }
    };

    useEffect(() => {
        sellerProducts();
    }, []);

    const handleProductDelete = (productId) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    };

    // State to track screen size
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        // Listen for window resize events to update screen size
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Render logic based on screen size
    const isLargeScreen = screenSize >= 1200;
    const isMediumScreen = screenSize >= 768 && screenSize < 1200;
    const isSmallScreen = screenSize < 768;

    return (
        <>
            <div className="container py-5">
                <h1 className="mb-4">Your Products</h1>
                {products.length === 0 ? (
                    <div className="alert alert-info" role="alert">
                        You have no products yet.
                    </div>
                ) : (
                    <>
                        {isLargeScreen && (
                            <div
                                className="d-none d-lg-grid"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4, 1fr)",
                                    gap: "16px",
                                    padding: "16px",
                                }}
                            >
                                {products.map((item, index) => (
                                    <SellerCard
                                        key={item._id}
                                        products={item}
                                        onProductDelete={handleProductDelete}
                                        index={index}
                                        size={"large"}
                                    />
                                ))}
                            </div>
                        )}

                        {isMediumScreen && (
                            <div
                                className="d-none d-md-grid"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: "16px",
                                    padding: "16px",
                                }}
                            >
                                {products.map((item, index) => (
                                    <SellerCard
                                        key={item._id}
                                        products={item}
                                        onProductDelete={handleProductDelete}
                                        index={index}
                                        size={"medium"}
                                    />
                                ))}
                            </div>
                        )}

                        {isSmallScreen && (
                            <div
                                className="d-grid d-md-none"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(1, 1fr)",
                                    gap: "16px",
                                    padding: "16px",
                                }}
                            >
                                {products.map((item, index) => (
                                    <SellerCard
                                        key={item._id}
                                        products={item}
                                        onProductDelete={handleProductDelete}
                                        index={index}
                                        size={"extraSmall"}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                <button
                    className="d-flex justify-content-center align-items-center btn btn-primary"
                    onClick={() => {
                        navigate("/sellersection/addproduct");
                    }}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        color: "white",
                        fontSize: "18px",
                    }}
                >
                    ADD
                </button>
            </div>
        </>
    );
};
