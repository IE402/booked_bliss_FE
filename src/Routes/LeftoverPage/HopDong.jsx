import React, { useEffect, useState, useContext } from "react";
import "./contactus.scss";
import { AuthContext } from "../../components/context/AuthContext";
import { thueService } from "../../services/thue.service";
import { CardUserReq } from "./comp/CardUserReq";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { userService } from "../../services/user.service";

function ListUserThue() {
  const { currentUser } = useContext(AuthContext);
  const [listUserRequest, setListUserRequest] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { hopDong } = location.state || {};
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userService.getUserById(hopDong.userIDs[1]);
        console.log("res", res);
        setUser(res);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [hopDong]);

  useEffect(() => {
    const fetchListUser = async () => {
      try {
        const res = await thueService.getAllHopDongByUserId(currentUser.id);
        if (Array.isArray(res)) {
          setListUserRequest(res); // Cập nhật danh sách nếu là mảng
        } else {
          console.error("API không trả về đúng định dạng:", res);
          setListUserRequest([]);
        }
      } catch (err) {
        console.error("Lỗi khi lấy danh sách người dùng:", err);
        setListUserRequest([]); // Đảm bảo danh sách là mảng rỗng khi có lỗi
      } finally {
      }
    };

    if (currentUser?.id) {
      fetchListUser();
    }
  }, []);

  return (
    <div className="list-user-thue">
      <h1>Danh Sách Người Yêu Cầu Thuê</h1>
      {false ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <ul>
          {listUserRequest.length > 0 ? (
            listUserRequest.map((hopdong) => (
              <CardUserReq
                userId={hopdong.userIDs[1]}
                hopDong={hopdong}
                key={hopdong.userIDs[1]}
              />
            ))
          ) : (
            <p>Không có người dùng nào.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default ListUserThue;
