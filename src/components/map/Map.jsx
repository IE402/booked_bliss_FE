import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.scss";
import Pin from "../pin/Pin";
import { postService } from "../../services/post.service";
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { Universitys } from "../../data/university";
import {
  redIcon,
  UniversityIcon,
  districtColors,
  DisplayMode,
  RADIUS_OPTIONS,
} from "./setUp";

function Map({ itemCurrents, onMessageShow, selected_University, r, showOne }) {
  // Core states
  const [currentPosition, setCurrentPosition] = useState([
    10.8744082, 106.8015733,
  ]);

  const [map, setMap] = useState(null);
  const [selectedItem, setSelectedItem] = useState(itemCurrents[0]);
  const { id } = useParams();

  // Feature states
  const [displayMode, setDisplayMode] = useState(DisplayMode.ALL_POSTS);
  const [showUniversityMarkers, setShowUniversityMarkers] = useState(false);
  const [postsByUniversity, setPostsByUniversity] = useState([]);
  const [geojsonData, setGeojsonData] = useState(null);
  const [highlightedDistrict, setHighlightedDistrict] = useState(null);
  const [selectedRadius, setSelectedRadius] = useState(RADIUS_OPTIONS[0].value);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);

  // Refs for cleanup
  const routeControlRef = useRef(null);
  const radiusCirclesRef = useRef([]);
  useEffect(() => {
    console.log("Load GeoJSON data", selected_University, r);
    renderHostelsInRadius(selected_University);
    setSelectedUniversity(selected_University);
    setSelectedRadius(r);
  }, [selected_University, r]);

  // Load GeoJSON data
  useEffect(() => {
    const loadGeoJSON = async () => {
      try {
        const response = await fetch("src/components/map/data.json");
        if (!response.ok) throw new Error("Failed to load GeoJSON data");
        const data = await response.json();
        setGeojsonData(data);
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    };

    loadGeoJSON();
  }, []);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (routeControlRef.current && map) {
        map.removeControl(routeControlRef.current);
      }
      radiusCirclesRef.current.forEach((circle) => {
        if (map) map.removeLayer(circle);
      });
    };
  }, [map]);

  // Update radius effect
  useEffect(() => {
    if (selectedUniversity) {
      renderHostelsInRadius(selectedUniversity);
    }
  }, [selectedRadius]);

  const onEachFeature = useCallback(
    (feature, layer) => {
      layer.on({
        click: () => {
          setHighlightedDistrict(feature.name);
          history.push(`/Map?type=&city=${encodeURIComponent(feature.name)}`);
        },
      });

      const districtName = feature.name;
      const fillColor = districtColors[districtName] || "#D3D3D3";

      layer.setStyle({
        weight: highlightedDistrict === districtName ? 5 : 1,
        color: highlightedDistrict === districtName ? "red" : "gray",
        fillOpacity: highlightedDistrict === districtName ? 0.7 : 0.3,
        fillColor,
      });
    },
    [highlightedDistrict]
  );

  const handleCalculateRoute = useCallback(() => {
    if (!map) return;

    // If calculator is showing, clean up and hide
    if (showCalculator) {
      if (routeControlRef.current) {
        map.removeControl(routeControlRef.current);
        routeControlRef.current = null;
      }
      setShowCalculator(false);
      return;
    }

    // Need selected item to calculate route
    if (!selectedItem) return;

    // Remove existing route if any
    if (routeControlRef.current) {
      map.removeControl(routeControlRef.current);
      routeControlRef.current = null;
    }

    try {
      const route = L.Routing.control({
        waypoints: [
          L.latLng(currentPosition[0], currentPosition[1]),
          L.latLng(selectedItem.latitude, selectedItem.longitude),
        ],
        routeWhileDragging: true,
        instructions: false,
      }).addTo(map);

      routeControlRef.current = route;
      setShowCalculator(true);
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  }, [map, selectedItem, currentPosition, showCalculator]);

  const renderHostelsInRadius = useCallback(
    (university) => {
      if (!map) return;

      setSelectedUniversity(university);

      // Clear existing circles
      radiusCirclesRef.current.forEach((circle) => map.removeLayer(circle));
      radiusCirclesRef.current = [];

      try {
        // Create new circle with selected radius
        const circle = L.circle([university.latitude, university.longitude], {
          color: "blue",
          fillColor: "blue",
          fillOpacity: 0.2,
          radius: selectedRadius,
        }).addTo(map);

        radiusCirclesRef.current.push(circle);

        // Filter posts within selected radius
        const postsInRadius = itemCurrents.filter((itemCurrent) => {
          const distance = map.distance(
            [university.latitude, university.longitude],
            [itemCurrent.latitude, itemCurrent.longitude]
          );
          return distance <= selectedRadius;
        });

        setPostsByUniversity(postsInRadius);
        setDisplayMode(DisplayMode.UNIVERSITY_RADIUS);
      } catch (error) {
        console.error("Error rendering radius search:", error);
      }
    },
    [map, itemCurrents, selectedRadius]
  );

  const toggleUniversityMarkers = useCallback(() => {
    setShowUniversityMarkers((prev) => !prev);
    if (displayMode === DisplayMode.UNIVERSITY_RADIUS) {
      setDisplayMode(DisplayMode.ALL_POSTS);
      setSelectedUniversity(null);
      radiusCirclesRef.current.forEach((circle) => map?.removeLayer(circle));
      radiusCirclesRef.current = [];
    }
  }, [displayMode, map]);

  const handlePinClick = useCallback((item) => {
    setSelectedItem(item);
  }, []);

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

      {/* Current position marker */}
      <Marker position={currentPosition} icon={redIcon}>
        <Popup autoClose={false}>
          <div className="popupContainer">
            <div className="textContainer">
              <span>Vị trí hiện tại</span>
            </div>
          </div>
        </Popup>
      </Marker>

      {/* Display posts based on mode */}
      {displayMode === DisplayMode.ALL_POSTS &&
        itemCurrents.map((item) => (
          <Pin
            item={item}
            isRed={item.id === id}
            key={item.id}
            onClick={handlePinClick}
          />
        ))}

      {displayMode === DisplayMode.UNIVERSITY_RADIUS &&
        postsByUniversity.map((item) => (
          <Pin
            item={item}
            isRed={item.id === id}
            key={item.id}
            onClick={handlePinClick}
          />
        ))}

      {/* University markers */}
      {showUniversityMarkers &&
        !showOne &&
        Universitys.map((item) => (
          <Marker
            position={[item.latitude, item.longitude]}
            icon={UniversityIcon}
            key={item.id}
          >
            <Popup>
              <div className="popupContainer">
                <div className="textContainer">
                  <h3>{item.name}</h3>
                  <span>{item.fullname}</span>
                  <div className="controls">
                    {/* Radius selection dropdown */}
                    <select
                      value={selectedRadius}
                      onChange={(e) =>
                        setSelectedRadius(Number(e.target.value))
                      }
                      className="radiusSelect"
                    >
                      {RADIUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => renderHostelsInRadius(item)}
                      className="showPostsBtn"
                    >
                      {selectedUniversity?.id === item.id ? "" : "Hiện"}
                    </button>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      {showUniversityMarkers && showOne && (
        <Marker
          position={[
            selected_University.latitude,
            selected_University.longitude,
          ]}
          icon={UniversityIcon}
          key={selected_University.id}
        >
          <Popup>
            <div className="popupContainer">
              <div className="textContainer">
                <h3>{selected_University.name}</h3>
                <span>{selected_University.fullname}</span>
                <div className="controls">
                  {/* Radius selection dropdown */}
                  <select
                    value={selectedRadius}
                    onChange={(e) => setSelectedRadius(Number(e.target.value))}
                    className="radiusSelect"
                  >
                    {RADIUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => renderHostelsInRadius(selected_University)}
                    className="showPostsBtn"
                  >
                    {selectedUniversity?.id === selected_University.id
                      ? ""
                      : "Hiện"}
                  </button>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Control buttons */}
      {
        <button onClick={handleCalculateRoute} className="calculateRouteBtn">
          {showCalculator ? "Ẩn" : "Tính đường"}
        </button>
      }

      <button
        onClick={() => {
          toggleUniversityMarkers();
          onMessageShow(!showUniversityMarkers);
        }}
        className="toggleUniversityBtn"
      >
        {showUniversityMarkers ? "Ẩn trường đại học" : "Hiện trường đại học"}
      </button>

      {/* GeoJSON layer */}
      {geojsonData && (
        <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />
      )}

      {/* Radius control panel */}
      {displayMode === DisplayMode.UNIVERSITY_RADIUS && (
        <div className="radiusInfo">
          <p>
            Tìm thấy {postsByUniversity.length} kết quả trong bán kính{" "}
            {selectedRadius / 1000}km
          </p>
        </div>
      )}
    </MapContainer>
  );
}

export default Map;
