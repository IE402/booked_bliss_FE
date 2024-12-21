import { useNavigate, Link, useLoaderData, Await } from "react-router-dom";
import "./userprofile.scss";
import apiRequest from "../../lib/apiRequest";
import { Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import List from "../../components/list/List";
import Card from "../../components/card/card";

function Profile() {
  const data = useLoaderData();
  const [savePosts, setSavePosts] = useState([]);
  const [posts, setPosts] = useState([]);


  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(()  =>  {
    getAllPostByUser();
    getAllSavePosts();
    console.log(savePosts);
  }, []);
  const getAllSavePosts = async () => {
    await apiRequest
      .get("/posts/savePost/" + currentUser.id)
      .then((res) => {
        console.log(res.data);
        setSavePosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllPostByUser = async () => {
    await apiRequest
     .get("/posts/getByUser/" + currentUser.id)
     .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
     .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  // const data = listData;

  return (
    <div>
      <div className="profile-container">
        <div className="cover">
          <img src="/profile_cover.png" alt="Profile Cover" />
        </div>

        <div className="profile-box">
          <div className="profile-box-info">
            <div className="profile-box-avt">
              <img
                src={currentUser.avatar || "noavatar.jpg"}
                alt="Profile Avatar"
                className="Avatar"
              />
            </div>
            <div className="user-info">
              <p className="username">{currentUser.username}</p>
              <p className="email">{currentUser.email}</p>
            </div>
          </div>

          <div className="btn-side">
            {/* edit profile btn */}
            <Link to={`/profile/update`}>
              <div className="profile-edit-container">
                <button className="edit-btn">Chỉnh sửa</button>
              </div>
            </Link>

            {/* send message btn */}
            <div className="send-msg-container">
              <Link to={`/chat`}>
                <button className="send-msg-button">
                  <span className="icon-container">
                    <img src="/sendmsg.png" alt="sent" className="icon2" />
                  </span>
                </button>
              </Link>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* current post section */}
      <div className="align">
        <div className="current-post-tittle">
          <h1>Phòng trọ của bạn</h1>
        </div>
        {/* create new post btn*/}
        <div className="create-post-container">
          <Link to={`/add`}>
            <button className="create-post-button">
              <span className="icon-container">
                <img src="/plus.png" alt="plus" className="icon" />
              </span>
              Thêm phòng trọ
            </button>
          </Link>
        </div>
      </div>

      <Suspense fallback={<p>Loading posts...</p>}>
        <Await
          resolve={posts}
          errorElement={<p>Error loading posts!</p>}
        >
          {(posts) => (
            // {data.map(item => (
            //     <Card key={item.id} item={item} />
            // ))}
            <List posts={posts} />
          )}
        </Await>
      </Suspense>


      <div className="saved-post-tittle">
        <h1>Phòng đã lưu</h1>
      </div>
      {/* {savePosts.map(item => (
                    <Card key={item.id} item={item} />
                ))}  */}
      

      <Suspense fallback={<p>Loading posts...</p>}>
                <Await
                    resolve={savePosts}
                    errorElement={<p>Error loading posts!</p>}
                >
                    {(savePosts) =>
                        // {data.map(item => (
                        //     <Card key={item.id} item={item} />
                        // ))}
                        <List posts={savePosts} />
                    }
                </Await>
            </Suspense>
    </div>
  );
}

export default Profile;
