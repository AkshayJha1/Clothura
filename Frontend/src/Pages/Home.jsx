import { useState , useEffect } from "react";
import { Carousel  } from "../Components/Carousel";
import {HomeCard} from "../Components/Home-card";
import { ShopCard } from "../Components/Shop-card";
import { useStore } from "../Store/store";
import { toast } from "react-toastify";

export const Home = ({searchQuery ,allProducts }) => {

    const { setIsSearchBarVisible , url } = useStore();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [ category , setCategory ] = useState([]);
    const [loading , setLoading ] = useState(true);

    useEffect(() => {
        CategoryCollection();
        setIsSearchBarVisible(true);
    }, []);
    
    useEffect(() => {    
        const lowercasedQuery = (searchQuery || "").toLowerCase();    
        const filtered = (allProducts).filter(
            (product) =>
                product.name.toLowerCase().includes(lowercasedQuery) 
            || product.description.toLowerCase().includes(lowercasedQuery)
        );    
        setFilteredProducts(filtered);
    }, [searchQuery, allProducts]);

    const CategoryCollection = async () => {
        try {
            const response = await fetch(`${url}/`,{
                method: "GET",
            })

            if(response.ok){
                const data = await response.json();
                setCategory(data.response)
            }

        } catch (error) {
            console.error("Failed to fetch categories:", response.statusText);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>; // Render a loading indicator
    }

    return (
        <>
        {
            (filteredProducts.length === allProducts.length) ? (
                <>
                    <Carousel />
                    <h1 className="m-5" style={{textAlign : "center"}}>SHOP BY COLLECTION </h1>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", padding: "16px" }}>
                        {category.map((item , index) => (
                            <HomeCard key={item._id} category={item} index={index} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", padding: "16px" }}>
                        {filteredProducts.map((item)=>(
                            <ShopCard key={item._id} product={item}/>
                        ))}
                    </div>
                </>
            )
        }
        </>
    )
    
} 