// eslint-disable-next-line no-unused-vars
import React, { Suspense, useEffect } from "react";
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
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <hr />
      {/* <div className="listContainer">
        <Suspense fallback={<p>Loading posts...</p>}>
          <Await
            resolve={postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) =>
              postResponse.map((post) => (
                <Card key={post.id} item={post} />
              ))
            }
          </Await>
        </Suspense>
      </div> */}
    </div>
  );
}

export default MapPage;
