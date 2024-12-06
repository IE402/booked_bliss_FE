import { useHistory } from 'react-router-dom'; // Make sure to import useHistory

const BackSiteButton = () => {
    const history = useHistory(); // Get the history object

    const handleClick = () => {
        history.push('/Profile'); // Navigate to the Profile page
    };

    return (
        <div className="backsite">
            <button onClick={handleClick} className="back-button">
                <img src="/caret_left.png" alt="Back" />
            </button>
        </div>
    );
};

export default BackSiteButton;