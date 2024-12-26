export const redIcon = new L.Icon({
  iconUrl: "https://www.vtsc.one/wp-content/uploads/2022/07/gps.png", // Sử dụng icon mặc định của Leaflet
  iconSize: [32, 41], // Kích thước của icon
  iconAnchor: [12, 41], // Mốc neo của icon
  popupAnchor: [1, -34], // Vị trí của popup
  shadowSize: [41, 41],
});
export const currentLocationIcon = new L.Icon({
  iconUrl: "https://icon-library.com/images/current-location-icon-png/current-location-icon-png-12.jpg", // Sử dụng icon mặc định của Leaflet
  iconSize: [32, 41], // Kích thước của icon
  iconAnchor: [12, 41], // Mốc neo của icon
  popupAnchor: [1, -34], // Vị trí của popup
  shadowSize: [0, 0],
});
export const UniversityIcon = new L.Icon({
  iconUrl:
    "https://cdn3.iconfinder.com/data/icons/placeholder-3/64/education-college-school-placeholder-pin-pointer-gps-map-location-1024.png",
  iconSize: [32, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
export const busStopIcon = new L.Icon({
  iconUrl: "https://cdn3.iconfinder.com/data/icons/transport-29/100/14-512.png",
  iconSize: [32, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
export const districtColors = {
  "Di An": "#FF6347", // Màu đỏ cho quận 1
  "Linh Xuan": "#1E90FF", // Màu xanh dương cho quận 2
  "Linh Trung": "#32CD32", // Màu xanh lá cho quận 3
  "Tang Nhon Phu A": "#FFD700", // Màu vàng cho quận 4
  "Tan Phu": "#8A2BE2", // Màu tím cho quận 5
  "Linh Chieu": "#FFA500", // Màu cam cho quận 6
  "Hiep Phu": "#00FFFF", // Màu cyan cho quận 7
  "Binh Tho": "#FF00FF", // Màu hồng cho quận 8
  "Linh Tay": "#FF1493", // Màu hồng nhạt cho quận 9
  "Truong Tho": "#00FF00", // Màu xanh lá cây cho quận 10
  "Tang Nhon Phu B": "#FFC0CB", // Màu lavender cho quận 11
  "Binh Chieu": "#FF4500", // Màu orangered cho quận 12
  "Tam Phu": "#FF69B4", // Màu hotpink cho quận Binh Tan
};

export const DisplayMode = {
  ALL_POSTS: "ALL_POSTS",
  UNIVERSITY_RADIUS: "UNIVERSITY_RADIUS",
};

// Định nghĩa các giá trị radius có sẵn
export const RADIUS_OPTIONS = [
  { value: 1000, label: "1km" },
  { value: 2000, label: "2km" },
  { value: 3000, label: "3km" },
  { value: 5000, label: "5km" },
];