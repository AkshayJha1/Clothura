import { createContext, useContext, useEffect, useReducer, useState } from "react"; 

export const  StoreContext = createContext();

const reducer = (state , action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price , finalPrice : action.price , quantity : action.quantity }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            return state.map((item) => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        quantity:(action.quantity),           // Update the quantity directly
                        finalPrice: action.finalPrice         // Update the price directly
                    };
                }
                return item;  // Return the unchanged item
            });
            return arr
        default:
            console.log("Error in Reducer");
    }
}

export const StoreProvider = ({children}) => {
    const url = import.meta.env.MODE === "development" ? "http://localhost:5000" : "";
    const [ isSeller , setIsSeller ] = useState(localStorage.getItem("role"));
    const [ authToken , setAuthToken ] = useState(localStorage.getItem("authToken"));
    const [ isSearchBarVisible , setIsSearchBarVisible ] = useState(true);
    const [state, dispatch] = useReducer(reducer, [],() => 
        JSON.parse(localStorage.getItem("cartItems")) || []
    );

    const addOrder = async (newOrder) => {
        try {
            const response = await fetch(`${url}/myorders/add`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({ token : authToken , name : newOrder.name , price : newOrder.price , quantity : newOrder.quantity })
            })

        } catch (error) {
            console.log("error in addOrder" , error);
        }
    }

    const addAllOrders = async (orders) => {
        for (let i = 0; i < orders.length; i++) {
            try {
                await addOrder(orders[i]);
            } catch (error) {
                console.error(`Error adding order ${orders[i].name}:`, error);
            }
        }
    }

    
    useEffect(()=>{
        if (state.length === 0) {
            const newOrder = JSON.parse(localStorage.getItem("cartItems")) || [];
            
            if (newOrder.length > 0) {
                addAllOrders(newOrder);
            }      
            // Clear cartItems
            localStorage.removeItem("cartItems");
        }
        localStorage.setItem("cartItems",JSON.stringify(state));
    },[state])
    
    return <StoreContext.Provider value={{url ,state , dispatch , authToken , setAuthToken , isSeller , setIsSeller , isSearchBarVisible , setIsSearchBarVisible }}>
        {children}
    </StoreContext.Provider>
}

export const useStore = () => {
    const StoreContextValue = useContext(StoreContext);

    if(!StoreContextValue){
        throw new Error(" check you main.jsx correctly");
    }

    return StoreContextValue; 
}
