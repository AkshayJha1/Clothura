import { useEffect, useState } from "react"
import { ShopCard } from "../Components/Shop-card";
import { useStore } from "../Store/store";
import { toast } from "react-toastify";

export const Kids = ({searchQuery ,allProducts }) => {
    const { setIsSearchBarVisible , url } = useStore();
    const [kids , setKids ] = useState([]);
    const [isLoading , setIsLoading ] = useState(true);

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

    useEffect(()=>{
        productsFetching();
        setIsSearchBarVisible(true);
    },[]);

    const productsFetching = async () => {

        try {
            const response = await fetch(`${url}/shop/kids`,{
                method:"GET",
            })

            if(response.ok){
                const data = await response.json();
                setKids(data.response);
            }
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    if(isLoading){
        return <h1>Kid's Section is Loading...........</h1>
    }

    

    return (
        <>
        {
            (filteredProducts.length === allProducts.length) ? (
                <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", padding: "16px" }}>
                        {kids.map((item)=>(
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