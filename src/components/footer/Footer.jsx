import './footer.scss';

function Footer() {
  return (
    <div className="container">

      <div className="left">
        <div className="top-left">
          <img src="/logo.png" alt="Logo" className='Logo' />
          <div className="title">
            <h2>Booked</h2>
            <h2>Bliss</h2>
          </div>
        </div>

        <div className="details">
          <div className="Location">
            <img src="/ic_location.png" alt="location" className='iconleft' />
            <span>Address: 1614 Bridgeton St, Fearthering District, London</span>
          </div>


          <div className="Phone">
            <img src="/ic_phone.png" alt="phone" className='iconleft' />
            <span><a href="tel:+84 765 071 670">Phone: +84 765 071 670</a></span>
          </div>


          <div className="Mail">
            <img src="/ic_mail.png" alt="mail" className='iconleft' />
            <span> <a href="mailto: bookedbliss@gmail.com ">Email: bookblissed@gmail.co</a>m</span>
          </div>

        </div>
      </div>

      <div className="right">
        <div className="menu">
          <a href="/faq">Frequently Ask & Question</a>
          <a href="/contactus">Contact Us</a>
          <a href="/houses">Type of Houses</a>
          <a href="#">Testimonial</a>

          <div className="follow">
            <h2>Follow up with the latest news</h2>
            <input type="text" value="abc@gmail.com" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Footer;
