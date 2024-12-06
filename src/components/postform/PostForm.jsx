import { useState } from "react";
import "./postform.scss"

const PostForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        address: '',
        city: '',
        bedroom: '',
        bathroom: '',
        latitude: '',
        longitude: '',
        price: '',
        type: '',
        propertyType: '',
        pictures: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'type') {
            setFormData((prevData) => ({
                ...prevData,
                type: value,
            }));
        } else if (name === 'propertyType') {

            setFormData((prevData) => ({
                ...prevData,
                propertyType: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length < 3) {
            alert('Please select at least 3 photos.');
            return;
        }
        if (files.length > 10) {
            alert('You can upload a maximum of 10 photos.');
            return;
        }
        setFormData((prevData) => ({
            ...prevData,
            pictures: files,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="property-form">
            <h2>Add Property</h2>
            <div>
                <label>
                    Title:
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Price:
                    <input
                        id="price"
                        name="title"
                        type="text"
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Address:
                    <input
                        id="address"
                        name="title"
                        type="text"
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Price:
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <h2>Type</h2>
                <label>
                    <input
                        type="radio"
                        name="Type"
                        value="forRent"
                        checked={formData.Type === 'forRent'}
                        onChange={handleChange}
                    />
                    For Rent
                </label>
                <label>
                    <input
                        type="radio"
                        name="Type"
                        value="forSale"
                        checked={formData.Type === 'forSale'}
                        onChange={handleChange}
                    />
                    For Sale
                </label>
            </div>
            <div>
                <h2>Property Type:</h2>
                <label>
                    <input
                        type="radio"
                        name="propertyType"
                        value="apartment"
                        checked={formData.propertyType === 'apartment'}
                        onChange={handleChange}
                    />
                    Apartment
                </label>
                <label>
                    <input
                        type="radio"
                        name="propertyType"
                        value="condotel"
                        checked={formData.propertyType === 'condotel'}
                        onChange={handleChange}
                    />
                    Condotel
                </label>
                <label>
                    <input
                        type="radio"
                        name="propertyType"
                        value="house"
                        checked={formData.propertyType === 'house'}
                        onChange={handleChange}
                    />
                    House
                </label>
                <label>
                    <input
                        type="radio"
                        name="propertyType"
                        value="land"
                        checked={formData.propertyType === 'land'}
                        onChange={handleChange}
                    />
                    Land
                </label>
            </div>
            <div>
                <label>
                    Upload Pictures:
                    <input
                        type="file"
                        name="pictures"
                        multiple
                        onChange={handleFileChange}
                        required
                    />
                </label>
            </div>
            <div>
                <h2>Terms and Conditions</h2>
                <label>
                    <input
                        type="radio"
                        name="accept"
                        value="accept"
                        checked={formData.accept === 'accept'}
                        onChange={handleChange}
                    />
                    I accept the Terms and Conditions of Booked Bliss
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default PostForm;