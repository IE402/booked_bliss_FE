import './type.scss';
import './cooperation.scss';

function Cooperation() {
    return (
        <div className="type__page">

            <div className="type__page__container">
                <div className="type__page__title">
                    <h1>Booked Blissed Cooperations</h1>
                </div>

                <div className="grid-container">
                    
                    <div className="grid-item left">
                        <img src="/landing_cover.png" alt="Left House" />
                    </div>

                    <div className="grid-item center">
                        <div className="textContent">
                            <p>Welcome to Booked Bliss!</p>
                            <p>
                                At Booked Bliss, we pride ourselves on creating unforgettable experiences tailored just for you. Our unique partnerships with local businesses ensure that every moment is filled with joy and excitement. Here’s what you can expect when you collaborate with us:
                            </p>
                            <ul>
                                <li>Exclusive Offers: Enjoy special discounts and packages that are only available through our partnerships. Whether it’s a romantic getaway or a family adventure, we have something for everyone.</li>
                                <li>Personalized Services: Our team works closely with you to customize your experience. From curated itineraries to special requests, we ensure that your needs are met with the utmost care.</li>
                                <li>Local Insights: Gain access to insider tips and recommendations from our network of local experts. Discover hidden gems and must-visit spots that will make your trip truly memorable.</li>
                                <li>Sustainability Focus: We are committed to supporting local businesses that prioritize sustainability. By choosing Booked Bliss, you contribute to the well-being of the community and the environment.</li>
                                <li>Seamless Booking Experience: Our user-friendly platform makes it easy to book your next adventure. With just a few clicks, you can secure your dream getaway without any hassle.</li>
                            </ul>
                            <p>
                                Join Us Today! Become a part of the Booked Bliss family and experience the difference. Whether you’re planning a solo retreat, a romantic escape, or a fun-filled family vacation, we’re here to make it happen. Contact us today to learn more about our partnerships and how we can help you create lasting memories!
                            </p>
                        </div>
                    </div>
                    <div className="grid-item right">
                        <img src="/landing_cover.png" alt="Right House" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cooperation;