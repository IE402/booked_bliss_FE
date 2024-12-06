// import {useNavigate} from "react-router-dom"
import './contactus.scss'

function ContactUs() {
    // const navigate = useNavigate();

    return (
        <div className="contactus__page">
            <div className="contactus__container">

                <div className="contactus_header">
                    <h1>Contact Us</h1>
                </div>

                <div className="contactus__cover">
                    <div className='coverImg'>
                        <img src='/landing_cover.png'></img>
                    </div>
                </div>

                <div className="contactus__compo">
                    <div className='contactus__phone'>
                        <h2>Get in Touch by <a href="tel:+84 765 071 670">+84 765 071 670</a> </h2>
                    </div>

                    <div className='contactus__email'>
                        <h2>Email: <a href="mailto: bookedbliss@gmail.com ">bookedbliss@gmail.com</a></h2>
                    </div>

                    <div className="contactus__location">
                        <h2>Location: <a href="#">1614 Bridgeton St, Fearthering District, London</a></h2>
                    </div>
                </div>

                <div className='contactus__footer'>
                    <h2>Please feel free to contact us. Have a good day!</h2>
                </div>

            </div>
        </div>



    );

}

export default ContactUs;