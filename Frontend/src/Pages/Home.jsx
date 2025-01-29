import { useState, useEffect } from "react";
import { Carousel } from "../Components/Carousel";
import { HomeCard } from "../Components/Home-card";
import { ShopCard } from "../Components/Shop-card";
import { useStore } from "../Store/store";
import { toast } from "react-toastify";

export const Home = ({ searchQuery, allProducts }) => {

    const { setIsSearchBarVisible, url } = useStore();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        CategoryCollection();
        setIsSearchBarVisible(true);
    }, []);

    useEffect(() => {
        const lowercasedQuery = (searchQuery || "").toLowerCase();
        const filtered = allProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(lowercasedQuery)
                || product.description.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredProducts(filtered);
    }, [searchQuery, allProducts]);

    const CategoryCollection = async () => {
        try {
            const response = await fetch(`${url}/`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                setCategory(data.response);
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <></>;
    }

    return (
        <>
            <Carousel />
            <h1 className="m-5" style={{ textAlign: "center" }}>SHOP BY COLLECTION</h1>
            {
                (filteredProducts.length === allProducts.length) ? (
                    <div className="container">
                        <div className="row">
                            {/* Display categories in 4 columns on large screens, 3 on medium screens, and 1 on small screens */}
                            {category.map((item, index) => (
                                <div className="col-12 col-md-6 col-lg-3 mb-4" key={item._id}>
                                    <HomeCard category={item} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="container">
                        <div className="row">
                            {/* Display filtered products in 4 columns on large screens, 3 on medium screens, and 1 on small screens */}
                            {filteredProducts.map((item) => (
                                <div className="col-12 col-md-4 col-lg-3 mb-4" key={item._id}>
                                    <ShopCard product={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </>
    );
};
