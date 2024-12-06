import { useNavigate } from "react-router-dom";
import "./faqpage.scss"


function FAQPage() {
    const navigate = useNavigate();

    const handleListPage = () => {
        navigate('/list');
    }
    return (
        <div className="faq-page">
            <h1 className="faq-heading">Frequently Questions and Answers  </h1>
    
            <div className="faq-container">
                <div className="faq-question-1">
                    <h2>Q: What services does Booked Bliss offer?</h2>
                    <p>A: Booked Bliss specializes in [insert your services, e.g., travel bookings, wellness retreats, vacation planning, etc.]. We provide personalized itineraries, exclusive deals, and expert recommendations to help you create unforgettable experiences.</p>
                </div>
                <div className="faq-question-2">
                    <h2>Q: What is Booked Bliss?</h2>
                    <p>A: Booked Bliss is an innovative platform that combines social media engagement with real estate renting and selling. Our goal is to connect property seekers and sellers through a dynamic online community, making the process of finding or listing a property more interactive and engaging.</p>
                </div>
                <div className="faq-question-3">
                    <h2>Q: Can I list my property for rent or sale on Booked Bliss?</h2>
                    <p>A: Absolutely! Users can create listings for properties they want to rent or sell. Our user-friendly interface makes it easy to upload photos, descriptions, and pricing, and share your listing across social media platforms.</p>
                </div>
                <div className="faq-question-4">
                    <h2>Q: How can I find properties available for rent or sale?</h2>
                    <p>A: You can search for properties using our advanced search features, which allow you to filter by location, price, type, and more. Additionally, you can follow your favorite real estate agents and listings on social media for real-time updates.</p>
                </div>
                <div className="faq-question-5">
                    <h2>Q: Is there a way to connect with other users on Booked Bliss?</h2>
                    <p>A: Yes! Booked Bliss encourages community interaction. You can follow other users, comment on listings, share experiences, and even join groups focused on specific neighborhoods or property types.</p>
                </div>
                <div className="faq-question-6">
                    <h2>Q: How do I ensure my privacy while using Booked Bliss?</h2>
                    <p>A: Your privacy is important to us. We implement strict privacy policies and security measures to protect your personal information. You can control what information you share and who can see your listings and interactions.</p>
                </div>
                <div className="faq-question-7">
                    <h2>Q: How can I stay updated on real estate trends and listings?</h2>
                    <p>A: By following relevant hashtags and accounts on social media through Booked Bliss, you can stay informed about the latest trends, market insights, and new listings. Additionally, subscribe to our newsletter for curated content and updates.</p>
                </div>
                <div className="faq-question-8">
                    <h2>Q: How does Booked Bliss integrate social media with real estate?</h2>
                    <p>A: Booked Bliss allows users to share property listings, experiences, and insights on social media. You can easily post your listings to platforms like Facebook, Instagram, and Twitter, helping you reach a wider audience and engage potential buyers or renters.</p>
                </div>
                <div className="faq-question-9">
                    <h2>Q: Can I chat with multiple users at once?</h2>
                    <p>A: Yes! You can have multiple chat conversations simultaneously. This is especially useful if communicating with different sellers or agents about various properties.</p>
                </div>
                <div className="faq-question-10">
                    <h2>Q: How can I start a chat with a property seller or agent?</h2>
                    <p>A: To start a chat, simply navigate to the property listing you’re interested in and click the chat icon. This will open a chat window where you can send your message directly to the seller or agent.</p>
                </div>
            </div>

            <div className="discover-container-btn">
                    <button className="discover-btn" onClick={handleListPage}>Discover Now</button>
                </div>

</div>


    );

}

export default FAQPage;