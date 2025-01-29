import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopCard } from '../Components/Shop-card';
import { useStore } from '../Store/store';
import { toast } from "react-toastify";

export const Category = ({ searchQuery, allProducts }) => {
  const { setIsSearchBarVisible, url } = useStore();
  const [specificCategoryItem, setSpecificCategoryItem] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State to track screen size
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const { category } = useParams();

  // Fetch category products and search bar visibility
  useEffect(() => {
    fetchingCategory(category);
    setIsSearchBarVisible(true);

    // Listen for window resize events to update screen size
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [category]);

  const fetchingCategory = async (category) => {
    try {
      const response = await fetch(`${url}/category/${category}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setSpecificCategoryItem(data.response);
      } else {
        console.log("Error fetching category");
      }
    } catch (error) {
      console.log("Catching error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const lowercasedQuery = (searchQuery || "").toLowerCase();
    const filtered = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery)
    );

    setFilteredProducts(filtered);
  }, [searchQuery, allProducts]);

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
              {specificCategoryItem.map((item) => (
                <ShopCard key={item._id} product={item} size={"large"}/>
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
              {specificCategoryItem.map((item) => (
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
              {specificCategoryItem.map((item) => (
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
                <ShopCard key={item._id} product={item} size={"large"}/>
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
