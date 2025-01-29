import { useEffect, useState } from "react";
import { ShopCard } from "../Components/Shop-card";
import { useStore } from "../Store/store";
import { toast } from "react-toastify";

export const Women = ({ searchQuery, allProducts }) => {
    const { setIsSearchBarVisible, url } = useStore();
    const [women, setWomen] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // State to track screen size
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        productsFetching();
        setIsSearchBarVisible(true);

        // Listen for window resize events to update screen size
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        const lowercasedQuery = (searchQuery || "").toLowerCase();
        const filtered = allProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(lowercasedQuery) ||
                product.description.toLowerCase().includes(lowercasedQuery)
        );

        setFilteredProducts(filtered);
    }, [searchQuery, allProducts]);

    const productsFetching = async () => {
        try {
            const response = await fetch(`${url}/shop/women`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                setWomen(data.response);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <></>;
    }

    // Render logic based on screen size
    const isLargeScreen = screenSize >= 1200;
    const isMediumScreen = screenSize >= 768 && screenSize < 1200;
    const isSmallScreen = screenSize < 768;

    return (
        <>
            {filteredProducts.length === allProducts.length ? (
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
                            {women.map((item) => (
                                <ShopCard key={item._id} product={item} size={"large"} />
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
                            {women.map((item) => (
                                <ShopCard key={item._id} product={item} size={"medium"} />
                            ))}
                        </div>
                    )}

                    {isSmallScreen && (
                        <div
                            className="d-block d-md-none"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(1, 1fr)",
                                gap: "16px",
                                padding: "16px",
                            }}
                        >
                            {women.map((item) => (
                                <ShopCard key={item._id} product={item} size={"extraSmall"} />
                            ))}
                        </div>
                    )}
                </>
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
                            {filteredProducts.map((item) => (
                                <ShopCard key={item._id} product={item} size={"large"} />
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
                            {filteredProducts.map((item) => (
                                <ShopCard key={item._id} product={item} size={"medium"} />
                            ))}
                        </div>
                    )}

                    {isSmallScreen && (
                        <div
                            className="d-block d-md-none"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(1, 1fr)",
                                gap: "16px",
                                padding: "16px",
                            }}
                        >
                            {filteredProducts.map((item) => (
                                <ShopCard key={item._id} product={item} size={"extraSmall"} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
};
