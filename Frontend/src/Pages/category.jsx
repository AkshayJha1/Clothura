import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopCard } from '../Components/Shop-card';
import { useStore } from '../Store/store';
import { toast } from "react-toastify";

export const Category = ({searchQuery ,allProducts }) => {
    const { setIsSearchBarVisible , url } = useStore();
    const [ specificCategoryItem , setSpecificCategoryItem ] = useState([]);

    const { category } = useParams();
    
    useEffect( ()=>{
        fetchingCategory(category);
        setIsSearchBarVisible(true);
    },[])

    const fetchingCategory = async (category) => {
        try {
            const response = await fetch(`${url}/category/${category}`,{
                method:"GET",
            })

            if(response.ok){
                const data = await response.json();
                setSpecificCategoryItem(data.response);
            }else{
                console.log(error);
            }
        } catch (error) {
            console.log("category ke ander error",error);
        }
    }

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

    return (
        <>
        {
            (filteredProducts.length === allProducts.length) ? (
                <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", padding: "16px" }}>
                        {specificCategoryItem.map((item)=>(
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