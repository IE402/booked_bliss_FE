import Slider from '../../components/slider/Slider';
import './singlePage.scss'
// import { singlePostData, userData } from '../../lib/dummydata'
import Map from '../../components/map/Map'
import {  Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import DOMPurify from "dompurify";
import { Suspense, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/context/AuthContext'
import apiRequest from '../../lib/apiRequest'
import { postService } from '../../services/post.service';
import List from '../../components/list/List';

function SinglePage() {
  const post = useLoaderData();
  console.log("single post --------",post);
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const [visiblePosts, setVisiblePosts] = useState(3); // Default to 3 posts

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await postService.getAllPosts();
        setPosts(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };
  return (
    <div className='singlePage'>
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price"> {post.price} VND</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.postDetail.desc),
            }}>
            </div>
          </div>
        </div>
      </div>
      
      {/* Buttons (send & save) */}
      <div className="buttons">
        <button onClick={() => navigate("/chat",{ state: { userId: post.id, postId: post.id } } )} >
          <img src="/chat.png" alt="" />
          Nhắn Tin
        </button>
        <button
          onClick={handleSave}
          style={{
            backgroundColor: saved ? "#fece51" : "white",
          }}
        >
          <img src="/save.png" alt="" />
          {saved ? "Đã lưu" : "Lưu"}
        </button>
      </div>
      <div className="features">
        {/* General */}
        <div className="featureContainer">
          <p className="title">General</p>
          <div className="feature">
            <img src="/utility.png" alt="" />
            {/* <span>Renter is responsible</span> */}
            {
              post.postDetail.utilities === "owner" ? (
                <p>Owner is responsible</p>
              ) : (
                <p>Tenant is responsible</p>
              )}
          </div>
          <div className="feature">
            <img src="/pet.png" alt="" />
            {/* <span>Pet Allowed</span> */}
            {
              post.postDetail.pet === "allowed" ? (
                <p>Pet allowed</p>
              ) : (
                <p>Tenant is not allowed</p>
              )}
          </div>
          <div className="feature">
            <img src="/fee.png" alt="" />
            {/* <span>Property Policy</span> */}
            <p>{post.postDetail.income}</p>
          </div>
        </div>
        {/* Size */}
        <div className="featureContainer">
          <p className="title">Sizes</p>
          <div className="feature">
            <img src="/area.png" alt="" />
            <span>{post.postDetail.size} sqft</span>
          </div>

          <div className="feature">
            <img src="/bed.png" alt="" />
            <span>{post.bedroom} beds</span>
          </div>

          <div className="feature">
            <img src="/bathroom.png" alt="" />
            <span>{post.bathroom} bathroom</span>
          </div>
        </div>
        {/* Nearby Places */}
        <div className="places">
          <p className="title">Nearby Places</p>
          <div className="place">
            <img src="/school.png" alt="" />
            <span>School</span>
            <p>{post.postDetail.school > 999 ? post.postDetail.school / 1000 + "km" : post.postDetail.school + "m"} away</p>
          </div>

          <div className="place">
            <img src="/bus.png" alt="" />
            <span>Bus Stop</span>
            <p>{post.postDetail.bus}m away</p>
          </div>

          <div className="place">
            <img src="/restaurant.png" alt="" />
            <span>Restaurant</span>
            <p>{post.postDetail.restaurant}m away</p>
          </div>
        </div>
      </div>
      {/* Location */}
      <div className="location">
        <p className="title">Location</p>
        <div className="mapContainer">
          <Map itemCurrents={[post]} />
        </div>

      </div>
      
      <div className="recentHome">
        <div className="text">
          <h3>Phòng trọ gần đây</h3>
          <span>
            <Link to={`/list`}>Xem tất cả</Link>
          </span>
        </div>
        <div className="homeItem">
          <Suspense fallback={<p>Loading posts...</p>}>
          <Await
            resolve={posts}
            errorElement={<p>Error loading posts!</p>}
          >
            {(posts) => (
              <List posts={posts.slice(0, visiblePosts)} />
            )}
          </Await>
        </Suspense>
        </div>
      </div>
      {/* Similar Posts */}
      
    </div>
  )
}

export default SinglePage