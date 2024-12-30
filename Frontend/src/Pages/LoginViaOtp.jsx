import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/store";
import { toast } from "react-toastify";

export const LoginViaOtpPage = () => {
    const { setAuthToken , setIsSeller , setIsSearchBarVisible , url} = useStore();
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [formData, setFormData] = useState({ email: '', otp: '' });
    const navigate = useNavigate();

    useEffect(()=>{
        setIsSearchBarVisible(false);
    },[])

    const handleSendOTP = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/users/loginOTPMailing`,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({"email" : formData.email})
            })
            if(response.ok){
                const data = response.json();
                toast.success("OTP SENT");
                setIsOtpSent(true);
            }else{
                toast.error("OTP NOT SENT")
            }
            console.log(formData.email);
        } catch (error) {
            console.log("Otp sending error ",error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(formData.otp);
        try {
            const response = await fetch(`${url}/users/loginViaOtp`,{
                method : "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({"otp" : formData.otp})
            })

            if(response.ok){
                const data = await response.json();
                localStorage.setItem("authToken" , data.authToken)
                setAuthToken(data.authToken);

                if(data.role === "seller"){
                    localStorage.setItem("role",true);
                    setIsSeller(true);
                }
                
                toast.success("LoggedIn");
                navigate('/');
                setFormData({ email: '', otp: '' });
            }else{
                toast.error("WRONG OTP");
            }
            
        } catch (error) {
            console.log(error);
        }
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 className="text-center mb-4">Login Page</h2>
            {isOtpSent ? (
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            readOnly // Email is uneditable after OTP is sent
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="otp" className="form-label">OTP:</label>
                        <input
                            type="text"
                            id="otp"
                            className="form-control"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Login
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSendOTP}>
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

                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Send OTP
                    </button>
                </form>
            )}
        </div>
    );
};
