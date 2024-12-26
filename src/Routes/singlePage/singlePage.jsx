import Slider from "../../components/slider/Slider";
import "./singlePage.scss";
// import { singlePostData, userData } from '../../lib/dummydata'
import Map from "../../components/map/Map";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { postService } from "../../services/post.service";
import List from "../../components/list/List";
import { reviewService } from "../../services/reviews.service";
import { formatPrice } from "../../services/func";
function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [countComments, setCountComments] = useState(3);
  const [confirmThue, setConfirmThue] = useState(false);

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
  const fetchReviews = async () => {
    try {
      const res = await reviewService.getAllReviewByPost(post.id);
      setReviews(res.slice(0, countComments));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(
    () => {
      fetchReviews();
    },
    [post.id],
    reviews.length
  );

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
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      const reviewData = {
        review: {
          comment: newComment,
          star: rating,
        },
        postId: post.id,
        userId: currentUser.id,
      };

      const res = await reviewService.addReview(reviewData);
      setReviews((prev) => [...prev, res]);
      fetchReviews();
      setNewComment("");
      setRating(5);
    } catch (err) {
      console.log(err);
    }
  };
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.star, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const calculateStarPercentages = (reviews) => {
    const total = reviews.length;
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach((review) => {
      counts[review.star] = (counts[review.star] || 0) + 1;
    });

    return Object.keys(counts).reduce((acc, star) => {
      acc[star] = total > 0 ? (counts[star] / total) * 100 : 0;
      return acc;
    }, {});
  };
  const toRent = () => {
    if (!confirmThue) {
      const confirm = window.confirm("bạn chắc chắn muốn yêu cầu thuê thuê?");
      if (confirm) {
        setConfirmThue(true);
      }
    } else {
      const confirm = window.confirm("bạn muốn hủy yêu cầu thuê?");
      if (confirm) {
        setConfirmThue(false);
      }
    }
  };
  return (
    <div className="singlePage">
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
                <div className="address">
                  <img src="/ic_phone.png" alt="" />
                  <span>{post.user.phone}</span>
                </div>
                <div className="price"> {formatPrice(post.price)} VND</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Buttons (send & save) */}
      <div className="buttons">
        <button
          onClick={() =>
            navigate("/chat", { state: { userId: post.id, postId: post.id } })
          }
        >
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
        <button
          onClick={toRent}  
          style={{
            backgroundColor: confirmThue ? "#fece51" : "white",
          }}
        >
          <img src="/save.png" alt="" />
          {confirmThue ? "Yêu cầu thuê" : "Hủy Yêu cầu"}
        </button>
      </div>
      <div className="features">
        {/* General */}
        <div className="featureContainer">
          <p className="title">Tổng quan</p>
          <div className="feature">
            <img src="/utility.png" alt="" />
            {/* <span>Renter is responsible</span> */}
            {post.postDetail.utilities === "owner" ? (
              <p>Chủ trọ chịu trách nhiệm</p>
            ) : (
              <p>Người thuê chịu trách nhiệm</p>
            )}
          </div>
          <div className="feature">
            <img src="/pet.png" alt="" />
            {/* <span>Pet Allowed</span> */}
            {post.postDetail.pet === "allowed" ? (
              <p>Được nuôi thú cưng</p>
            ) : (
              <p>Không được nuôi thú cưng</p>
            )}
          </div>
          <div className="feature">
            <img src="/fee.png" alt="" />
            {/* <span>Property Policy</span> */}
            <p>Tối đa: {post.postDetail.income} người</p>
          </div>
        </div>
        {/* Size */}
        <div className="featureContainer">
          <p className="title">Chi tiết</p>
          <div className="feature">
            <img src="/area.png" alt="" />
            <span>{post.postDetail.size} m2</span>
          </div>

          <div className="feature">
            <img src="/bed.png" alt="" />
            <span>{post.bedroom} phòng ngủ</span>
          </div>

          <div className="feature">
            <img src="/bathroom.png" alt="" />
            <span>{post.bathroom} phòng tắm</span>
          </div>
        </div>
        {/* Nearby Places */}
        <div className="places">
          <p className="title">Địa điểm xung quanh</p>
          <div className="place">
            <img src="/school.png" alt="" />
            <span>Trường học</span>
            <p>
              khoảng{" "}
              {post.postDetail.school > 999
                ? post.postDetail.school / 1000 + "km"
                : post.postDetail.school + "m"}{" "}
            </p>
          </div>

          <div className="place">
            <img src="/bus.png" alt="" />
            <span>Trạm xe bus</span>
            <p>khoảng {post.postDetail.bus}m </p>
          </div>

          <div className="place">
            <img src="/restaurant.png" alt="" />
            <span>Chợ</span>
            <p>khoảng {post.postDetail.restaurant}m </p>
          </div>
        </div>
      </div>
      {/* Location */}

      <h2>Đánh giá và bình luận</h2>
      <div className="reviews">
        {/* Rating Statistics */}
        <div className="ratingStats">
          <div className="averageRating">
            <h3>{calculateAverageRating(reviews)}</h3>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${
                    calculateAverageRating(reviews) >= star ? "active" : ""
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p>{reviews.length} đánh giá</p>
          </div>

          <div className="ratingBars">
            {[5, 4, 3, 2, 1].map((star) => {
              const percentage = calculateStarPercentages(reviews)[star];
              return (
                <div key={star} className="ratingBar">
                  <span className="starLabel">{star} ★</span>
                  <div className="barContainer">
                    <div
                      className="bar"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="percentage">{percentage.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Comment Form */}
        <div className="cmt">
          <div className="commentForm">
            <div className="ratingSelect">
              <span>Đánh giá: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`starButton ${rating >= star ? "active" : ""}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmitReview}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Viết đánh giá của bạn..."
                required
              />
              <button type="submit">Gửi đánh giá</button>
            </form>
          </div>

          {/* Comments List */}
          <div className="commentsList">
            <h2>Danh sách đánh giá</h2>
            {reviews.length > 0 ? (
              reviews.map(
                (review) =>
                  review &&
                  review.user &&
                  review.user.avatar && (
                    <div key={review.id} className="commentItem">
                      <div className="commentHeader">
                        <div className="userInfo">
                          <img
                            src={
                              review.user.avatar ||
                              "https://th.bing.com/th/id/OIP.ItvA9eX1ZIYT8NHePqeuCgHaHa?rs=1&pid=ImgDetMain"
                            }
                            alt=""
                          />
                          <span className="username">
                            {review.user.username}
                          </span>
                        </div>
                        <div className="rating">
                          {[...Array(review.star)].map((_, index) => (
                            <span key={index} className="star">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="commentText">{review.comment}</p>
                      <span className="commentDate">
                        {/* {new Date(review.createdAt).toLocaleDateString()} */}
                      </span>
                    </div>
                  )
              )
            ) : (
              <p>Chưa có đánh giá nào</p>
            )}
          </div>
        </div>
      </div>

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
            <Await resolve={posts} errorElement={<p>Error loading posts!</p>}>
              {(posts) => <List posts={posts.slice(0, visiblePosts)} />}
            </Await>
          </Suspense>
        </div>
      </div>
      {/* Similar Posts */}
    </div>
  );
}

export default SinglePage;
