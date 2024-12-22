import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";

function Register() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const fullName = formData.get("fullName");
        const phone = formData.get("phone");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await apiRequest.post("/auth/register", {
                username, fullName, phone, email, password
            })

            navigate("/login");
        }catch(err){
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }finally{
            setIsLoading(false);
        }  
    };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Tạo tài khoản</h1>
          <input name="username" type="text" placeholder="Tài Khoản" />
          <input name="fullName" type="text" placeholder="Họ Tên" />
          <input name="phone" type="text" placeholder="Số điện thoại" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Mật khẩu" />
          <button disabled={isLoading}>Đăng ký</button>
          {error && <span>{error}</span>}
          <Link to="/login">Bạn đã có tài khoản?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/homePage.png" alt="" />
      </div>
    </div>
  );
}

export default Register;