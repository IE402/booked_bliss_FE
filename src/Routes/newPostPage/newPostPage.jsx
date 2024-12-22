import "./newPostPage.scss";
import ReactQuill from "react-quill";
import { useContext, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "../../components/uploadWidget/uploadWidget";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";
import { postService } from "../../services/post.service";
import { PostDto } from "../../Dto/post.dto";

function NewPostPage() {
  const { currentUser } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [geojsonData, setGeojsonData] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
      const loadGeoJSON = async () => {
        try {
          const response = await fetch("src/components/map/data.json");
          if (!response.ok) throw new Error('Failed to load GeoJSON data');
          const data = await response.json();
          setGeojsonData(data.features);
        } catch (error) {
          console.error("Error loading GeoJSON:", error);
        }
      };
  
      loadGeoJSON();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const postDto = new PostDto(
        {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: parseFloat(inputs.latitude),
          longitude: parseFloat(inputs.longitude),
          images: images,
          roomSpace: parseInt(inputs.roomSpace),
        },
        {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
        currentUser.id
      );
      console.log("okokoko", postDto.postData);

      console.log("postDto", postDto);

      const res = await postService.createPost(postDto);
      console.log("Post created successfully:", res);
      navigate("/" + res.id);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Thêm phòng trọ</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            {/* above */}
            <div className="item">
              <label htmlFor="title">Tên Trọ</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            {/* description */}
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            {/* below */}

            {/* <div className="item">
              <label htmlFor="city">Khu vực</label>
              <input id="city" name="city" type="text" />
            </div> */}

            <div className="item">
              <label htmlFor="city">Khu vực</label>
              <select name="city">
                {geojsonData && geojsonData.map && geojsonData.map((item, index) => (
                    <option key={index} value={item.name}>
                        {item.name}
                    </option>
                ))}
                {/* <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option> */}
              </select>
            </div>


            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="roomSpace">Số phòng trống</label>
              <input min={0} id="roomSpace" name="roomSpace" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>

            <button className="sendButton">Upload</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            apiKey: "871951181472748",
            cloudName: "djqh6tbyl",
            uploadPreset: "booked bliss",
            multiple: true,
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
