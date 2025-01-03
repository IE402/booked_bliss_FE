import { Link } from 'react-router-dom';
import './card.scss'

function Card({item}){
    const scrollToTop = () => {
        window.scrollTo(0, 0);  // Cuộn trang lên đầu
      };
    
  return (
    <div className='card'>
        <Link to={`/${item.id}`} className="imageContainer" onClick={scrollToTop}>
            <img src={item.images[0]} alt="" />
        </Link>
        <div className="textContainer">
            <h2 className="title">
                <Link to={`/${item.id}`}>{item.title}</Link>
            </h2>
            <p className="address">
                <img src="/pin.png" alt="" />
                <span>{item.address}</span>
            </p>
            <p className="price">$ {item.price}</p>
            <div className="bottom">
                <div className="features">
                    <div className="feature">
                        <img src="/bed.png" alt=""/>
                        <span>{item.bedroom} Phòng ngủ</span>
                    </div>
                    <div className="feature">
                        <img src="/bath.png" alt=""/>
                        <span>{item.bathroom} Phòng tắm</span>
                    </div>
                </div>
                <div className="icons">
                    <div className="icon">
                        <img src="/save.png" alt=""/>
                    </div>
                    <div className="icon">
                        <img src="/chat.png" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card