import './type.scss'

function Agents() {
    
    return (
        <div className="type__page">
        <div className="type__page__container">
          <div className="type__page__title">
            <h1>Monthly Agents</h1>

            <div className="type__page_display">

              <div className="houseItems">
                {/* 1st pp */}
                <div className="houseItem">
                  <div className="houseItemImg">
                    <img src="/pp1.jpeg" alt="" />
                  </div>
                  <div className="houseItemText">
                    <div className="textTitle">
                      <h3>Mr. Simon Deloaintte</h3>
                    </div>
                    <div className="textContent">
                      <p>A standalone residential building, typically more space and privacy, often with a yard or garden. Houses can vary in size and style, from single-family homes to larger multi-story structures.</p>
                    </div>
                  </div>
                 
                </div>

                {/* 2nd pp */}
                <div className="houseItem">
                  <div className="houseItemImg">
                    <img src="/pp4.jpeg" alt="" />
                  </div>
                  <div className="houseItemText">
                    <div className="textTitle">
                      <h3>Mr. William Henry</h3>
                    </div>
                    <div className="textContent">
                      <p>A parcel of unde veloped property that can be used for various purposes, including residential, commercial, or agricultural development. Land can be raw, meaning it has not been improved or built upon, or it can have existing structures.</p>
                    </div>
                  </div>
                 
                </div>

                {/* 3rd pp */}
                <div className="houseItem">
                  <div className="houseItemImg">
                    <img src="/pp1.jpeg" alt="" />
                  </div>
                  <div className="houseItemText">
                    <div className="textTitle">
                      <h3>Mr. Sophie Alexander</h3>
                    </div>
                    <div className="textContent">
                      <p>A type of residential property where individuals own their specific unit within a larger building or complex, sharing common areas and amenities with other residents. Condos often come with features like pools, gyms, and security services, and they typically have a homeowners association (HOA) that manages the property.</p>
                    </div>
                  </div>
                  
                </div>

                {/* 4th pp */}
                <div className="houseItem">
                  <div className="houseItemImg">
                    <img src="/pp4.jpeg" alt="" />
                  </div>
                  <div className="houseItemText">
                    <div className="textTitle">
                      <h3>Mr. Boboboi</h3>
                    </div>
                    <div className="textContent">
                      <p>A rental unit within a larger building, typically owned by a landlord or property management company. Apartments can vary in size and layout, and they often come with shared amenities. Unlike condos, residents do not own their apartments but pay rent for their living space.</p>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>


    );

}

export default Agents;