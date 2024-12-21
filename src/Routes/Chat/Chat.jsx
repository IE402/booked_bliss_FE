import { Suspense, useContext, useEffect, useState } from "react";
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import "./chat.scss";
import Chat from "../../components/chat/chat";
import Avatar from "../../components/avatar/avatar";  
import { chatService } from "../../services/chat.service";// Assuming you have an Avatar component
import { postService } from "../../services/post.service";
import { AuthContext } from "../../components/context/AuthContext";
import { useLocation } from 'react-router-dom';
function ChatPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState([]);
    const {currentUser} = useContext(AuthContext);  
    const { postId, additionalData } = location.state;
    useEffect(() => {
        // Fetch chat data
        chatService.createChat({})
        console.log(data);
        
    }, []);

    // Handle the action of going back to the previous page
    const handleReturn = () => {
        navigate(-1); // Go back one step in history
    };

    // Toggle message history visibility
    const toggleHistory = () => {
        setShowHistory(!showHistory);
    };

    // Handle sending a new message
    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { type: "sent", text: message }]);
            setMessage(""); // Clear input field
        }
    };

    // Filter chat based on search term
    const filteredChats = data.chatResponse.data.filter(chat =>
        chat.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="chatContainer">
            <Suspense fallback={<p>Loading...</p>}>
                <Await
                    resolve={data.chatResponse}
                    errorElement={<p>Error loading chats!</p>}
                >
                    {(chatResponse) => (
                        <div>
                            <div className="return-btn" onClick={handleReturn}>
                                <button className="return-caret-button" aria-label="Return to Profile">
                                    <div className="icon-container1">
                                        <img src="/caret_left.png" alt="caret-l" className="icon1" />
                                    </div>
                                </button>
                            </div>

                            <div className="chat-container">
                                <div className="chat-history">
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            placeholder="Search for someone..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    {filteredChats.map((chat, index) => (
                                        <div
                                            key={index}
                                            className="recent-user"
                                            onClick={toggleHistory}
                                        >
                                            <Avatar src={chat.user.avatar} alt="UserAvatar" size={40} />
                                            <span>{chat.user.fullName}</span>
                                            <p>{chat.lastMessage}</p>
                                        </div>
                                    ))}
                                </div>

                                {showHistory && (
                                    <div className="message-pop">
                                        <div className="message-history-title" onClick={toggleHistory}>
                                            <Avatar src="/user-avatar.png" alt="UserAvatar" size={50} />
                                            <span>User Name</span>
                                        </div>

                                        <div className="message-history">
                                            {messages.map((msg, index) => (
                                                <div
                                                    key={index}
                                                    className={`message ${msg.type === "sent" ? "sent" : "received"}`}
                                                >
                                                    {msg.text}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="current-message">
                                            <div className="message-input">
                                                <textarea
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    placeholder="Send a message"
                                                />
                                                <button onClick={handleSendMessage}>Send</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </Await>
            </Suspense>
        </div>
    );
}

export default ChatPage;
