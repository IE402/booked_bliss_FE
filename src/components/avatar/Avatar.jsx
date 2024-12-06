// eslint-disable-next-line no-unused-vars
import {useState} from "react";
import "./avatar.scss";

// eslint-disable-next-line react/prop-types
function Avatar({ src, alt = "UserAvatar", size = 40 }) {
    return (
        <div className="avatar" style={{ width: size, height: size }}>
            <img src={src} alt={alt} className="avatar-image" />
        </div>
    );
}

export default Avatar;
