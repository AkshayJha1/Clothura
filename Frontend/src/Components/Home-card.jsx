import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "../Store/store";
export const HomeCard = ({category , index}) => {
    const { url } = useStore();
    const navigate = useNavigate();
    const categoryFetching = async(category) => {
        try {
            const response = await fetch(`${url}/category/${category}`,{
                method:"GET",
            })

            if(response.ok){
                const data = await response.json();
                return data.response ; 
            }
        } catch (error) {
            console.log(error);
        }
    }    

    const handleOnClick = async (category) => {
        try {
            const data = await categoryFetching(category);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <div class="card" style={{width: "18rem" , }} onClick={async ()=>{
            await handleOnClick(category.category);
            navigate(`category/${category.category}`);
        }}>
            <img src={category.img} class="card-img-top" alt="..." />
            <div class="card-body" style={{display:"flex" , justifyContent : "center" }}>
                <h4 class="card-title" style={{ textAlign : "center"}}>{category.category}</h4>
            </div>
        </div>
      </>
    )
}
