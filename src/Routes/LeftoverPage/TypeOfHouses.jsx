import {useNavigate} from "react-router-dom"
import './type.scss'

function TypeofHouses() {
    const navigate = useNavigate();
    const handleListPage = () => {
      navigate('/list');
  }

    return (
        <div className="type__page">
        <div className="type__page__container">
          <div className="type__page__title">
            <h1>Type of Houses</h1>

            <div className="type__page_display">

              <div className="houseItems">
                {/* houses */}
                <div className="houseItem">
                  <div className="houseItemImg">
                    <img src="/ty_house.jpg" alt="" />
                  </div>
                  <div className="houseItemText">
                    <div className="textTitle">
                      <h3>Houses</h3>
                    </div>
                    <div className="textContent">
                      <p>A standalone residential building, typically more space and privacy, often with a yard or garden. Houses can vary in size and style, from single-family homes to larger multi-story structures.</p>
                    </div>
                  </div>
                  <div className="discover-container-btn">
                    <button className="discover-btn" onClick={handleListPage}>Discover Now</button>
                  </div>
                </div>

                {/* lands */}
                <div className="houseItem">
                  <div className="houseItemImg">
                    <img src="/ty_land.jpg" alt="" />
                  </div>
                  <div className="houseItemText">
                    <div className="textTitle">
                      <h3>Land</h3>
                    </div>
                    <div className="textContent">
                      <p>A parcel of unde veloped property that can be used for various purposes, including residential, commercial, or agricultural development. Land can be raw, meaning it has not been improved or built upon, or it can have existing structures.</p>
                    </div>
                  </div>
                  <div className="discover-container-btn">
                    <button className="discover-btn" onClick={handleListPage}>Discover Now</button>
                  </div>
                </div>

                {/* condos */}
                <div className="houseItem">
                  <div className="houseItemImg">
                    <img src="/ty_condo.webp" alt="" />
                  </div>
                  <div className="houseItemText">
                    <div className="textTitle">
                      <h3>Condo</h3>
                    </div>
                    <div className="textContent">
                      <p>A type of residential property where individuals own their specific unit within a larger building or complex, sharing common areas and amenities with other residents. Condos often come with features like pools, gyms, and security services, and they typically have a homeowners association (HOA) that manages the property.</p>
                    </div>
                  </div>
                  <div className="discover-container-btn">
                    <button className="discover-btn" onClick={handleListPage}>Discover Now</button>
                  </div>
                </div>

                {/* apartments */}
                <div className="houseItem">
                  <div className="houseItemImg">
                    <img src="/ty_apart.jpg" alt="" />
                  </div>
                  <div className="houseItemText">
                    <div className="textTitle">
                      <h3>Apartments</h3>
                    </div>
                    <div className="textContent">
                      <p>A rental unit within a larger building, typically owned by a landlord or property management company. Apartments can vary in size and layout, and they often come with shared amenities. Unlike condos, residents do not own their apartments but pay rent for their living space.</p>
                    </div>
                  </div>
                  <div className="discover-container-btn">
                    <button className="discover-btn" onClick={handleListPage}>Discover Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>


    );

}

export default TypeofHouses;