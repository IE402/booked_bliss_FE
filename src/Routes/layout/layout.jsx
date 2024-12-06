import './layout.scss';
import Navbar from "../../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../components/context/AuthContext';
import Footer from '../../components/footer/Footer';

function Layout() {
    const location = useLocation();  // Get the current location

    const isChatPage = location.pathname === "/chat";

    return (
        <div className='layout'>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
            {/* Chỉ render Footer nếu không phải là trang "/chat" */}
            {!isChatPage && (
                <div className="footer">
                    <Footer />
                </div>
            )}
        </div>
    );
}

function RequireAuth() {
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();  // Get the current location

    const isChatPage = location.pathname === "/chat";

    return !currentUser ? (
        <Navigate to="/login" />
    ) : (
        <div className='layout'>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
            {/* Chỉ render Footer nếu không phải là trang "/chat" */}
            {!isChatPage && (
                <div className="footer">
                    <Footer />
                </div>
            )}
        </div>
    );
}


export { Layout, RequireAuth }