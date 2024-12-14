// eslint-disable-next-line no-unused-vars
import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Filter from "../../components/filter/filter";
import Map from "../../components/map/Map";
import "./listPage.scss";

function MapPage() {
  const { postResponse } = useLoaderData();
  console.log("jojjjjjjjjjj", postResponse);
  

  return (
    <div className="listPage">
      <div className="listContent">
        <div className="filter">
          <Filter />
        </div>
        <div className="mapContainer">
          <Suspense fallback={<p>Loading map...</p>}>
            <Await
              resolve={postResponse}
              errorElement={<p>Error loading map!</p>}
            >
              {(postResponse) => <Map itemCurrents={postResponse.data} />}
            </Await>
          </Suspense>
        </div>

      </div>
    </div>
  );
}

export default MapPage;
