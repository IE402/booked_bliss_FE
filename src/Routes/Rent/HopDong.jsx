import React, { useContext, useEffect, useState } from "react";
import "./HopDong.scss"; // Import file CSS
import { useLocation } from "react-router-dom";
import { userService } from "../../services/user.service";
import { AuthContext } from "../../components/context/AuthContext";
import { postService } from "../../services/post.service";

export function HopDong() {
  const location = useLocation();
  const { hopDong } = location.state || {};
  const [benB, setBenB] = useState({});
  const [post, setPost] = useState({});
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchBenB = async () => {
      const res = await userService.getUserById(hopDong.userIDs[1]);
      setBenB(res);
    };
    const fetchPost = async () => {
      const res = await postService.getPostById(hopDong.postId);
      setPost(res);
    };
    fetchPost();
    fetchBenB();
    console.log("Hợp đồng:", hopDong);
    console.log("Người dùng:", currentUser);
    console.log("Bên B:", benB);
    console.log("Bài đăng:", post);
  }, [hopDong]);
  return (
    <div className="a4-paper">
      <h1 className="header">Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam</h1>
      <h2 className="subheader">Độc Lập - Tự Do - Hạnh Phúc</h2>
      <hr />
      <h2 className="title">Hợp Đồng Thuê Phòng Trọ</h2>
      <p className="contract-number">(HĐ số: ....../2019)</p>

      <div className="content">
        <h3>Bên A: Bên cho thuê</h3>
        <p>Họ và tên: {currentUser.fullName} </p>
        <p>Năm sinh: 1987</p>
        <p>CMND: {currentUser.CMND} </p>
        <p>
          Thường trú: 125/47 Bùi Đình Tuý, Phường 24, Quận Bình Thạnh, Tp.HCM
        </p>

        <h3>Bên B: Bên thuê</h3>
        <p>Họ và tên: {benB.fullName} </p>
        <p>Năm sinh: 26/06/1995</p>
        <p>CMND: {benB.CMND} </p>
        <p>
          Thường trú: 163/11A Bùi Trọng Nghĩa, Trảng Dài, Tp. Biên Hòa, Đồng Nai
        </p>

        <h3>Điều 1: Thỏa thuận thuê</h3>
        <p>
          Bên A đồng ý cho bên B thuê và bên B đồng ý thuê phòng trọ số: 21,
          thuộc dãy phòng trọ của bên A tại: 125/47 Bùi Đình Tuý, Phường 24,
          Quận Bình Thạnh, Tp.HCM.
        </p>
        <p>Thời hạn thuê: 12 tháng (từ ngày 01/10/2019 đến ngày 01/10/2020).</p>

        <h3>Điều 2: Tiền thuê nhà trọ và tiền đặt cọc</h3>
        <p>
          - Tiền thuê nhà là: {post.price} đồng/tháng (Bốn triệu năm trăm ngàn
          đồng).
        </p>
        <p>- Tiền đặt cọc: {post.price * 2} (Chín triệu đồng).</p>
        <p>
          - Bên B phải đóng tiền thuê trước vào ngày 01 hàng tháng. Nếu quá 05
          ngày không thanh toán, bên A có quyền yêu cầu bên B dọn trả phòng.
        </p>
        <p>
          - Bên B có quyền được hoàn lại tiền cọc khi thanh lý hợp đồng, nếu
          không vi phạm quy định thuê.
        </p>

        <h3>Điều 3: Trách nhiệm của bên A</h3>
        <p>
          - Đảm bảo điều kiện tốt trong nhà cho bên B đúng như mô tả ban đầu.
        </p>

        <h3>Điều 4: Trách nhiệm của bên B</h3>
        <p>- Đóng tiền đúng hạn và giữ gìn tài sản thuê.</p>
      </div>
      <div className="chuKy">
        <div className="chuTroKy">
          <p>Chữ ký bên cho thuê</p>
          <p>(Ký và ghi rõ họ tên)</p>
          <p>Ngày 01 tháng 01 năm 2020</p>
        </div>

      </div>
    </div>
  );
}
