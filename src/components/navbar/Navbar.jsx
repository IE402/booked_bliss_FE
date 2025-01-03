import { useState } from "react";
import { useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { AuthContext } from "../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <nav>
      <div className="navbar-left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>Tìm phòng trọ</span>
        </a>
      </div>
      <div className="navbar-center">
        <a href="/Map">Map</a>
        <a href="/list">Tìm kiếm Phòng</a>
        {currentUser && currentUser.role != "user" && (
          <a href="/reqRent">Yêu Cầu thuê phòng</a>
        )}
        <a href="/coop">Hợp tác</a>
      </div>
      <div className="navbar-right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link className="profile" to="/profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Trang cá nhân</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login" className="sign">
              Đăng nhập
            </a>
            <a href="/register" className="sign">
              Đăng ký
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/map">Agents</a>
          <a href="/houses">Type of House</a>
          <a href="/contactus">Contact Us</a>
          <a href="/">Cooperation</a>
          <a href="/">Sign In</a>
          <a href="/">Sign Up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
