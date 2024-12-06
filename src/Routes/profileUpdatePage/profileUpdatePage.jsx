import { useState } from "react";
import { useContext } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../components/context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";

function ProfileUpdatePage() {
    const { currentUser, updateUser } = useContext(AuthContext);

    const [error, setError] = useState("");
    const [avatar, setAvatar] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData);

        try {
            const res = await apiRequest.put(`/users/${currentUser.id}`, {
                username,
                email,
                password,
                avatar: avatar[0], 
            });
            updateUser(res.data);
            navigate("/profile");
            console.log("User updated:", res.data);
        } catch (err) {
            console.error("Error object:", err);
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("An unknown error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="profileUpdatePage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Update Profile</h1>
                    <div className="item">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            defaultValue={currentUser.username}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={currentUser.email}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <button>Update</button>
                    {error && <span style={{ color: "red" }}>{error}</span>}
                </form>
            </div>
            <div className="sideContainer">
                <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="update-avatar" />
                <UploadWidget uwConfig={{
                    apiKey: "871951181472748",
                    cloudName: "djqh6tbyl",
                    uploadPreset: "booked bliss",
                    multiple: false,
                    maxImageFileSize: 2000000,
                    folder: "avatars",
                }}
                setState={setAvatar}/>
            </div>
        </div>
    );
}

export default ProfileUpdatePage;
