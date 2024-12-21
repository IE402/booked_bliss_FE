import './homePage.scss';
import { Await, Link, useLoaderData } from 'react-router-dom';
import SearchBar from '../../components/searchBar/SearchBar';
// import Card from '../../components/card/card';
// import { listData } from '../../lib/dummydata';
import { Suspense, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/context/AuthContext';
import List from '../../components/list/List';

function HomePage() {

  const [visiblePosts, setVisiblePosts] = useState(3); // Default to 3 posts

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 738px)").matches) {
        setVisiblePosts(1); 
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setVisiblePosts(2); 
      } else {
        setVisiblePosts(3); // Show 3 posts otherwise
      }
    };

    // Initial check
    handleResize();

    // Add listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const data = useLoaderData();

  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  return (
    <div className='homePage'>
      <div className="homeImg">
        <img src="/homePage.png" alt="" />
      </div>
      <div className="head">
        <div className="headText">
          <h1>TÌM KIẾM PHÒNG TRỌ</h1>
          <span>Tìm kiếm phòng khu vực làng đại học</span>
          <p>Bạn đang tìm phòng? Chúng tôi sẵn sàng giúp bạn</p>
        </div>
        <SearchBar />
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
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => (
              <List posts={postResponse.data.slice(0, visiblePosts)} />
            )}
          </Await>
        </Suspense>
        </div>
      </div>
      <div className="whatWeDo">
        <div className="wwdcontent">
          <h3>Bạn muốn tìm phòng?</h3>
          <div className="action">
            <div className="rent">
              <img src="/rent.png" alt="" />
            </div>
            <div className="sales">
              <img src="/sale.png" alt="" />
            </div>
          </div>
          <span>
            <Link to={`/list`}>Hiển thị tất cả</Link>
          </span>
        </div>
      </div>
      
      {/* <div className="peopleSay">
        <h3>What People Say About Us?</h3>
        <div className="peopleItems">
          <div className="peopleItem">
            <div className="peopleItemImg">
              <img src="/user1.png" alt="" />
            </div>
            <div className="peopleItemText">
              <div className="textTitle">
                <h3>JONHNAS J.D</h3>
              </div>
              <div className="textContent">
                <p>The interface is clean and easy to use. I found my dream apartment in just a few clicks!</p>
              </div>
            </div>
          </div>
          <div className="peopleItem">
            <div className="peopleItemImg">
              <img src="/daphne.webp" alt="" />
            </div>
            <div className="peopleItemText">
              <div className="textTitle">
                <h3>Emily Davis</h3>
              </div>
              <div className="textContent">
                <p>A great platform with detailed listings. The comparison tool really helped me decide between renting and buying.</p>
              </div>
            </div>
          </div>
          <div className="peopleItem">
            <div className="peopleItemImg">
              <img src="/simon.webp" alt="" />
            </div>
            <div className="peopleItemText">
              <div className="textTitle">
                <h3>Simon Basset</h3>
              </div>
              <div className="textContent">
                <p>Fast and reliable! The property recommendations were spot on for my budget and preferences.</p>
              </div>
            </div>
          </div>
          <div className="peopleItem">
            <div className="peopleItemImg">
              <img src="/queen.jpg" alt="" />
            </div>
            <div className="peopleItemText">
              <div className="textTitle">
                <h3>Sarah Johnson</h3>
              </div>
              <div className="textContent">
                <p>I love the map integration feature. It made exploring neighborhoods so much easier!</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default HomePage