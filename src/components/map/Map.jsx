import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.scss";
import Pin from "../pin/Pin";
import { postService } from "../../services/post.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import L from "leaflet"; // Để sử dụng leaflet-routing-machine
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // Import CSS cho routing machine
import "leaflet-routing-machine";

function Map({ itemCurrents }) {
  console.log("itemCurrent", itemCurrents[0]);
  const [posts, setPosts] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([10.8744082, 106.8015733]);
  const [highlightedDistrict, setHighlightedDistrict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState(itemCurrents[0]);
  const [geojsonData, setGeojsonData] = useState(null);

  async function fetchPosts() {
    const posts = await postService.getAllPosts();
    setPosts(posts);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetch("src/components/map/data.json")
      .then((res) => res.json())
      .then((data) => {
        setGeojsonData(data);
      });
  }, []);

  const districtColors = {
    "Di An": "#FF6347", // Màu đỏ cho quận 1
    "Linh Xuan": "#1E90FF", // Màu xanh dương cho quận 2
    "Linh Trung": "#32CD32", // Màu xanh lá cho quận 3
    "Tang Nhon Phu A": "#FFD700", // Màu vàng cho quận 4
    "Tan Phu": "#8A2BE2", // Màu tím cho quận 5
    "District 6": "#FF4500", // Màu cam cho quận 6

  };
  

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        setHighlightedDistrict(feature.name);
        // Cập nhật URL khi click vào quận huyện
        history.push(`/Map?type=&city=${encodeURIComponent(feature.name)}`);
      },
    });

    // Sử dụng màu của quận từ districtColors
    const districtName = feature.name;
    const fillColor = districtColors[districtName] || "#D3D3D3"; // Nếu không có màu, dùng màu mặc định

    if (highlightedDistrict === districtName) {
      layer.setStyle({
        weight: 5,
        color: "red", // Màu viền khi highlight
        fillOpacity: 0.7,
        fillColor: fillColor, // Màu nền khi highlight
      });
    } else {
      layer.setStyle({
        weight: 1,
        color: "gray", // Màu viền mặc định
        fillOpacity: 0.3,
        fillColor: fillColor, // Màu nền mặc định
      });
    }
  };

  const handlePinClick = (item) => {
    setSelectedItem(item); // Lưu lại item được chọn
  };

  const handleCalculateRoute = () => {
    if (!map) {
      console.log("Map object is not initialized.");
      return;
    }

    if (selectedItem) {
      if (routeControl && L.Routing) {
        map.removeControl(routeControl); // Xóa tuyến đường cũ trước khi vẽ tuyến đường mới
      }

      const route = L.Routing.control({
        waypoints: [
          L.latLng(currentPosition[0], currentPosition[1]), // Current location
          L.latLng(selectedItem.latitude, selectedItem.longitude), // Selected item location
        ],
        routeWhileDragging: true,
        instructions: false,
      }).addTo(map);

      setRouteControl(route); // Lưu đối tượng routing control để có thể xóa sau này
    }
  };

  const redIcon = new L.Icon({
    iconUrl: "https://www.vtsc.one/wp-content/uploads/2022/07/gps.png", // Sử dụng icon mặc định của Leaflet
    iconSize: [32, 41], // Kích thước của icon
    iconAnchor: [12, 41], // Mốc neo của icon
    popupAnchor: [1, -34], // Vị trí của popup
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={[10.8700089, 106.8004792]}
      zoom={13}
      scrollWheelZoom={false}
      className="map"
      whenReady={({ target }) => setMap(target)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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
        <Pin
          item={item}
          isRed={item.id === id}
          key={item.id}
          onClick={handlePinClick}
        />
      ))}

      {selectedItem && (
        <button onClick={handleCalculateRoute} className="calculateRouteBtn">
          Tính đường đi
        </button>
      )}

      {geojsonData && (
        <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />
      )}
    </MapContainer>
  );
}

export default Map;
