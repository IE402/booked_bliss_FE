import React, { useEffect, useState } from "react";
import "./contactus.scss";
import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { thueService } from "../../services/thue.service";
function ListUserThue() {
  const { currentUser } = useContext(AuthContext);
  const [listUserRequest, setListUserRequest] = useState([]);
  // State lưu danh sách người dùng
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const res = thueService.getAllHopDongByUserId(currentUser.id);
      setListUserRequest(res);
    } catch {
      console.log(err);
    }
  });

  // Hiển thị loading hoặc danh sách người dùng
  return (
    <div className="list-user-thue">
      <h1>Danh Sách Người Yêu Cầu Thuê</h1>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                <h3>{user.fullName}</h3>
                <p>Email: {user.email}</p>
                <p>Số điện thoại: {user.phone}</p>
                <p>CMND: {user.CMND}</p>
              </li>
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
