import { Suspense, useState } from "react";
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import "./chat.scss";
import Chat from "../../components/chat/chat";
// import BackSiteButton from "../../components/backsite/backsite";
function ChatPage() {
    const data = useLoaderData();
    return (
        <div className="chatContainer">
                <Suspense fallback={<p>Loading...</p>}>
                    <Await
                        resolve={data.chatResponse}
                        errorElement={<p>Error loading chats!</p>}
                    >
                        {(chatResponse) => <Chat chats={chatResponse.data} />}
                    </Await>
                </Suspense>
        </div>
            /* <div className="return-btn" onClick={handleReturn}>
                <button className="return-caret-button" aria-label="Return to Profile">
                    <div className="icon-container1">
                        <img src="/caret_left.png" alt="caret-l" className="icon1" />
                    </div>
                </button>
            </div>

            <div className={`chat-container ${showHistory ? "show-history" : ""}`}>
                <div className="chat-history">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search for someone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className={`recent-user-${i + 1}`}
                            onClick={toggleHistory} // Show message-pop when clicked
                        >
                            <Avatar src="/user-avatar.png" alt="UserAvatar" size={40} />
                            <span>User Name</span>
                            <p>abcxynuznujkn</p>
                        </div>
                    ))}
                </div>

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
            </div> */
    );
}

export default ChatPage;
