// eslint-disable-next-line no-unused-vars
import React, { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import SearchBar from '../../components/searchBar/SearchBar';
import Filter from '../../components/filter/filter';
import Map from '../../components/map/Map';
import Card from '../../components/card/card';
import './listPage.scss';

function ListPage() {
    const data = useLoaderData();
    console.log(data.postResponse);

    return (
        <div className="listPage">
            {/* Header Section */}
            <div className="head">
                <div className="headImg">
                    <img src="/headImg.png" alt="Header" />
                </div>
                <SearchBar />
            </div>

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

                {/* List of Posts */}
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

export default ListPage;
