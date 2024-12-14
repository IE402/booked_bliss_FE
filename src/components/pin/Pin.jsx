import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import './pin.scss';

function Pin({ item, isRed }) {
  const navigate = useNavigate();

  // Tạo icon mặc định của Leaflet
  const redIcon = new L.Icon({
    iconUrl: 'https://www.vtsc.one/wp-content/uploads/2022/07/gps.png', // Sử dụng icon mặc định của Leaflet
    iconSize: [32, 41],  // Kích thước của icon
    iconAnchor: [12, 41],  // Mốc neo của icon
    popupAnchor: [1, -34],  // Vị trí của popup
    // shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
        
  const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon-2x.png', // Sử dụng icon mặc định của Leaflet
    iconSize: [25, 41],  // Kích thước của icon
    iconAnchor: [12, 41],  // Mốc neo của icon
    popupAnchor: [1, -34],  // Vị trí của popup
    // shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  // Xử lý khi người dùng nhấn vào ảnh
  const handleClick = () => {
    navigate('/' + item.id);
    window.scrollTo(0, 0);
    
  };

  return (
    <Marker position={[item.latitude, item.longitude]} icon={isRed ? redIcon : defaultIcon}>
      <Popup autoClose={false}>
        <div className="popupContainer">
          <img onClick={handleClick} src={item.images[0]} alt={item.title} />
          <div className="textContainer">
            <h3>{item.title}</h3>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
