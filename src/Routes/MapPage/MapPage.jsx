// eslint-disable-next-line no-unused-vars
import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Filter from "../../components/filter/filter";
import Map from "../../components/map/Map";
import "../listPage/listPage.scss";

function MapPage() {
  const data = useLoaderData();
  console.log("jojjjjjjjjjj", data.postResponse);

  return (
    <div className="listPage">
      {/* Main Content */}
      <div className="listContent">
        {/* Map and Filter */}
        <div className="mapContainer">
          <Suspense fallback={<p>Loading map...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading map!</p>}
            >
              {(postResponse) => <Map items={postResponse.data} />}
            </Await>
          </Suspense>
          <Filter />
        </div>
        <div className="listContainer">
          <Suspense fallback={<p>Loading posts...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
