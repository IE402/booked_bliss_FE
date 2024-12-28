import { useContext, useEffect, useState } from "react";
import { userService } from "../../../services/user.service";
import "./Card.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../components/context/AuthContext";

export function CardUserReq({ userId, hopDong }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userService.getUserById(userId);
        console.log("res", res);
        console.log("hopDong", hopDong);
        setUser(res);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleCreateContract = () => {
    console.log(`Tạo hợp đồng cho người dùng: ${userId}`);
    navigate("/rent", { state: { hopDong } });
    // Gọi API tạo hợp đồng tại đây, ví dụ:
    // await contractService.createContract(userId);
  };

  return (
    <li className="card-user-req">
      <div className="info">
        <h3>
          {user.fullName || (
            <span className="card-user-req__fallback">Không có tên</span>
          )}
        </h3>
        <p>
          Email:{" "}
          {user.email || (
            <span className="card-user-req__fallback">Không có email</span>
          )}
        </p>
        <p>
          Số điện thoại:{" "}
          {user.phone || (
            <span className="card-user-req__fallback">
              Không có số điện thoại
            </span>
          )}
        </p>
        <p>
          CMND:{" "}
          {user.CMND || (
            <span className="card-user-req__fallback">Không có CMND</span>
          )}
        </p>
      </div>
      <button className="create-contract-btn" onClick={handleCreateContract}>
        Tạo hợp đồng
      </button>
    </li>
  );
}
