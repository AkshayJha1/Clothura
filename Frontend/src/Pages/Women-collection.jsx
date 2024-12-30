import { useEffect, useState } from "react"
import { ShopCard } from "../Components/Shop-card";
import { useStore } from "../Store/store";
import { toast } from "react-toastify";

export const Women = ({searchQuery ,allProducts }) => {
    const { setIsSearchBarVisible , url } = useStore();
    const [women , setWomen ] = useState([]);
    const [isLoading , setIsLoading ] = useState(true);

    useEffect(()=>{
        productsFetching();
        setIsSearchBarVisible(true);
    },[]);

    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {    
        const lowercasedQuery = (searchQuery || "").toLowerCase();    
        const filtered = (allProducts).filter(
            (product) =>
                product.name.toLowerCase().includes(lowercasedQuery) 
            || product.description.toLowerCase().includes(lowercasedQuery)
        );
        console.log("Filtered Products:", filtered);
    
        setFilteredProducts(filtered);
    }, [searchQuery, allProducts]);

    const productsFetching = async () => {

        try {
            const response = await fetch(`${url}/shop/women`,{
                method:"GET",
            })

            if(response.ok){
                const data = await response.json();
                setWomen(data.response);
            }
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    if(isLoading){
        return <h1>Women's Section is Loading...........</h1>
    }

    return (
        <>
        {
            (filteredProducts.length === allProducts.length) ? (
                <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", padding: "16px" }}>
                        {women.map((item)=>(
                            <ShopCard key={item._id} product={item}/>
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