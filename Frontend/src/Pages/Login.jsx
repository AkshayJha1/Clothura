import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/store";
import { toast } from "react-toastify";

export const LoginPage = () => {
    const {setAuthToken , setIsSeller , setIsSearchBarVisible , url } = useStore();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(()=>{
        setIsSearchBarVisible(false);
    },[])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/users/login`,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(formData)
            })

            const res_data = await response.json();
            
            if(response.ok){
                localStorage.setItem("authToken" , res_data.authToken)
                setAuthToken(res_data.authToken);
                console.log(res_data.role);

                if(res_data.role === "seller"){
                    localStorage.setItem("role",true);
                    setIsSeller(true);
                }
                
                setFormData({email: '', password: ''});
                toast.success("Logged In successfully")
                navigate("/");                
            }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log("login error",error);
        }
    };

    const handleForgotPassword = () => {
        navigate("/loginViaOtp");
    };

    return (
        <div className="container" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 className="text-center mb-4">Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
            </form>

            <div className="text-center">
                <p><button className="btn btn-link" onClick={handleForgotPassword}>Forgot Password?</button></p>
            </div>
        </div>
    );
}