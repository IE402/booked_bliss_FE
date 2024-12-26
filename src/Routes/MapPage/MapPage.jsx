// eslint-disable-next-line no-unused-vars
import React, { Suspense, useEffect, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Filter from "../../components/filterMap/filter";
import Map from "../../components/map/Map";
import "./listPage.scss";

function MapPage() {
  const { postResponse } = useLoaderData();
  const [showUniversitys, setShowUniversitys] = React.useState(false);
  const [selectedUniversity, setSelectedUniversity] = React.useState(null);
  const [r, setR] = React.useState(1000);
  const [showOneUniversity, setShowOneUniversity] = React.useState(false);
  const [showBusStopMarkers, setShowBusStopMarkers] = useState(true);
  const showUniversitysHandler = (data) => {
    setShowUniversitys(data);
    console.log(data);
  };
  const handleSetSelectedUniversity = (data) => {
    setSelectedUniversity(data);
    setShowOneUniversity(true);
  };
  const handleSetR = (data) => {
    console.log(data);
    setR(data);
  };
  useEffect(() => {
    console.log(selectedUniversity);
  }, [selectedUniversity]);

  return (
    <div className="listPage">
      <div className="listContent">
        <div className="filter">
          <Filter
            setSelectUniversity={handleSetSelectedUniversity}
            showUniversitys={showUniversitys}
            set_R={handleSetR}
          />
        </div>

        <div className="mapContainer">
          <div className="toggleBtns">
          <button
            onClick={() => {
              setShowBusStopMarkers(!showBusStopMarkers);
            }}
            className="toggleBuStopBtn"
          >
            {showBusStopMarkers ? "Ẩn trạm xe bus" : "Hiện trạm xe bus"}
          </button>
          <button
            onClick={() => {
              setShowUniversitys(!showUniversitys);
            }}
            className="toggleUniversityBtn"
          >
            {showUniversitys ? "Ẩn trường đại học" : "Hiện trường đại học"}
          </button>
          </div>
          <Suspense fallback={<p>Loading map...</p>}>
            <Await
              resolve={postResponse}
              errorElement={<p>Error loading map!</p>}
            >
              {(postResponse) => (
                <Map
                  onMessageShow={showUniversitysHandler}
                  itemCurrents={postResponse.data}
                  selected_University={selectedUniversity}
                  r={r}
                  showOne={showOneUniversity}
                  showBusStopMarkers={showBusStopMarkers}
                  showUniversitys={showUniversitys}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default MapPage;
