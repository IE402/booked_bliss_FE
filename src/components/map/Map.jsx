// eslint-disable-next-line no-unused-vars
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.scss';
import Pin from '../pin/Pin';
import { postService } from '../../services/post.service';
import { useEffect, useState } from 'react';
function Map({ itemCurrent }) {
    console.log('itemCurrent', itemCurrent);
    const [posts, setPosts] = useState([]);
    async function fetchPosts() {
        const posts = await postService.getAllPosts();
        setPosts(posts);
        console.log('posts',posts[0].id,itemCurrent.id, posts[0].id == itemCurrent.id);
        
    }
    useEffect(() => {
        fetchPosts();
    }, []);
    
    return (
        // console.log('items', item),
        <MapContainer center={
            // itemCurrent.length === 1
            //     // ? [items[0].latitude, items[0].longitude]
            //     ? [10.8700089,106.8004792]

                 [10.8700089,106.8004792]
        }
            zoom={11}
            scrollWheelZoom={false}
            className='map'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {posts.map(item => (
                <Pin item={item} isRed={item.id === itemCurrent.id}  key={item.id} />
            ))}
            

        </MapContainer>
    )
}

export default Map