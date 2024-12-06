import PostForm from "../../components/postform/PostForm";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import "./createpost.scss"

function CreatePost() {

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate('/Profile'); // Navigate back to the Profile page
    };

    // eslint-disable-next-line no-unused-vars
    const boxesData = [
        { title: "Post 1", content: "Content for post 1" },
        { title: "Post 2", content: "Content for post 2" },
        { title: "Post 3", content: "Content for post 3" },
        { title: "Post 4", content: "Content for post 4" },
        { title: "Post 5", content: "Content for post 5" },
    ];

    return (
        <div>
            <Navbar />

            <div className="return-btn" onClick={handleReturn}>
                <button className="return-caret-button" aria-label="Return to Profile">
                    <span className="icon-container1">
                        <img src="/caret_left.png" alt="caret-l" className="icon1" />
                    </span>
                </button>
            </div>

            <div className="form-title">
                <h2>Create a Post</h2>
            </div>
            <div className="form-create">
                <PostForm />
            </div>

            {/* <div className="current-post-tittle">
                <h1>Your Current Posts</h1>
            </div>
            <div className="current-post-container">
                {boxesData.map((box, index) => (
                    <div key={index} className="post-box">
                        <h2>{box.title}</h2>
                        <p>{box.content}</p>
                        <div className="post-title">
                            <h1>Phu Nhuan Charme De Cottage</h1>
                            <div className="pt-heading">
                                <a href="#" alt="Area" className="icon-link">
                                    <img src="/location.png" alt="Area" className="icon" />
                                    Hoa Su St, District Phu Nhuan, Ward 8 HCMC
                                </a>
                            </div>
                            <div className="post-icon">
                                <a href="#" alt="Area" className="icon-link">
                                    <img src="/area.png" alt="Area" className="icon" />
                                    30x50
                                </a>
                                <a href="#" alt="Bed" className="icon-link">

                                    <img src="/bed.png" alt="Bed" className="icon" />
                                    3
                                </a>
                                <a href="#" alt="Bathroom" className="icon-link">

                                    <img src="/bathroom.png" alt="Bathroom" className="icon" />
                                    2
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
}

export default CreatePost;