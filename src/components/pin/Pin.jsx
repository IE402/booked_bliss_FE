import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import './pin.scss';
import { useNavigate } from 'react-router-dom';

function Pin({item}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/'+item.id)
    }
    return (
        <Marker position={[item.latitude, item.longitude]}>
            <Popup>
                <div className="popupContainer">
                    <img onClick={handleClick} src={item.images[0]} alt="" />
                    <div className="textContainer">
                        <h3>{item.title}</h3>
                        {/* <Link to={`${item.id}`}>{item.title}</Link> */}
                        <span>{item.bedroom} bedroom</span>
                        <b>$ {item.price}</b>
                    </div>
                </div>
            </Popup>
        </Marker>
    )
}

export default Pin