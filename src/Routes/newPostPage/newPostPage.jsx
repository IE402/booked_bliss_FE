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
        if (!response.ok) throw new Error("Failed to load GeoJSON data");
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
                {geojsonData &&
                  geojsonData.map &&
                  geojsonData.map((item, index) => (
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
              <label htmlFor="bedroom">Số phòng ngủ</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Số phòng tắm</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Kinh độ</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Vĩ độ</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Loại</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Thuê
                </option>
                <option value="buy">Mua</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Loại Phòng</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Chính sách tiện ích</label>
              <select name="utilities">
                <option value="owner">Chủ nhà chịu trách nhiệm</option>
                <option value="tenant">Người thuê chịu trách nhiệm</option>
                <option value="shared">Chia sẻ</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Thú cưng</label>
              <select name="pet">
                <option value="allowed">Được phép</option>
                <option value="not-allowed">Không được phép</option>
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
              <label htmlFor="size">Chiểu rộng</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="roomSpace">Số phòng trống</label>
              <input min={0} id="roomSpace" name="roomSpace" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">Trường học</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">Trạm xe bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Chợ</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>

            <button className="sendButton">Tải lên</button>
            {error && <span>Lỗi</span>}
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
