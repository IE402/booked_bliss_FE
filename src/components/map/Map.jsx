// eslint-disable-next-line no-unused-vars
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.scss";
import Pin from "../pin/Pin";
import { postService } from "../../services/post.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Map({ itemCurrents }) {
  console.log("itemCurrent", itemCurrents[0]);
  const [posts, setPosts] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([
    10.8744082, 106.8015733,
  ]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  async function fetchPosts() {
    const posts = await postService.getAllPosts();
    setPosts(posts);
  }
  useEffect(() => {
    fetchPosts();
  }, []);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentPosition([latitude, longitude]); // Cập nhật vị trí người dùng
//           console.log("currentPosition", currentPosition);
//           setLoading(false);
//         },
//         (error) => {
//           console.error("Error fetching geolocation: ", error);
//           setLoading(false); // Xử lý lỗi
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//       setLoading(false);
//     }
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Bạn có thể tùy chỉnh giao diện loading
//   }
  const redIcon = new L.Icon({
      iconUrl: 'https://www.vtsc.one/wp-content/uploads/2022/07/gps.png', // Sử dụng icon mặc định của Leaflet
      iconSize: [32, 41],  // Kích thước của icon
      iconAnchor: [12, 41],  // Mốc neo của icon
      popupAnchor: [1, -34],  // Vị trí của popup
      // shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
      shadowSize: [41, 41],
    });
  return (
    // console.log('items', item),
    <MapContainer
      center={
        // itemCurrent.length === 1
        //     // ? [items[0].latitude, items[0].longitude]
        //     ? [10.8700089,106.8004792]

        [10.8700089, 106.8004792]
      }
      zoom={12}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Hiển thị marker cho vị trí hiện tại */}
      <Marker position={[currentPosition[0], currentPosition[1]]} icon={redIcon}>
        <Popup autoClose={false}>
          <div className="popupContainer">
            <div className="textContainer">
              <span>Vị trí hiện tại</span>
            </div>
          </div>
        </Popup>
      </Marker>

      {itemCurrents.map((item) => (
        <Pin item={item} isRed={item.id === id} key={item.id} />
      ))}
      
    </MapContainer>
  );
}

export default Map;
