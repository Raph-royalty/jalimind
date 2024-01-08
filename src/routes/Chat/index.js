import { h, Component } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import axios from 'axios';
import './chat.css';
import ChatNav from '../../components/ChatNav';
import send from '../../assets/icons/send.svg';

const Chat = ({ username, uid }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversationId, setConversationId] = useState('');
    const [typingMessage, setTypingMessage] = useState('Loading');

    useEffect(() => {

        let randomIDFromFirestore = firebase.firestore().collection('chat').doc().id;
        setConversationId(randomIDFromFirestore);
        console.log(randomIDFromFirestore);
    }, []);

    useEffect(() => {
        if(uid == ''){
            return;
        }
        setLoading(true);
        let query = firebase.firestore().collection('messages')
        query = query.where('uid', '==', uid);
        query = query.orderBy('timestamp', 'asc');
        query.onSnapshot((querySnapshot) => {
            let data = [];
            
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            console.log(data);
            setMessages(data);
            setLoading(false);
            setTypingMessage('Typing');
        });

    }, [uid]);



    useEffect(() => {
        let names = username.replace(/\s/g, '');
        setName(names);
    }, [username]);


    const sendMessage = () => {
        if (!inputText) {
            return;
        }
        const newMessages = [...messages, { role: 'user', content: inputText }];

        console.log(newMessages);
        setMessages(newMessages);
        setInputText('');
        //settimeout 1 sec to show typing
        setTimeout(() => {
            setLoading(true);
        }, 1000);

        let data = JSON.stringify({
            "uid": uid,
            "messages": newMessages
        });
        firebase.firestore().collection('messages').add({
            role: 'user',
            content: inputText,
            uid: uid,
            conversationId: conversationId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        let config = {
            method: 'post',
            url: 'http://localhost:5000/jalimind/us-central1/chatbot/chat/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data,
        };
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const data = response.data;
                const reply = data.reply;
                const updatedMessages = [...newMessages, { role: 'assistant', content: reply }];
                setLoading(false);
                setMessages(updatedMessages);

                firebase.firestore().collection('messages').add({
                    role: 'assistant',
                    content: reply,
                    uid: uid,
                    conversationId: conversationId,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const submitForm = (e) => {
        e.preventDefault();
        sendMessage();
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat">
            <div className="chat-contents">
                <div className="chat-background"></div>
                <div className="chats">
                    <ChatNav username={username} />
                    <div className="chat-container">
                        <div className="chat-message chat-message-assistant">
                            <div className="chat-profile chat-profile-assistant"></div>
                            <div className="chat-text chat-text-assistant">
                                Hi, I'm Jalimind. I am here to help you with your mental health.
                                Please feel free to share what's on your mind and we can work together to find the answers that resonate with you.
                            </div>
                        </div>
                        {messages.map((message, index) => (
                            <div key={index} className={`chat-message chat-message-${message.role}`}>
                                {message.role === 'assistant' ? <div className="chat-profile chat-profile-assistant"></div> : null}
                                <div className={`chat-text chat-text-${message.role}`}>{message.content}</div>
                                {message.role === 'user' ? <div className="chat-profile chat-profile-user" style={{ backgroundImage: `url("https://api.dicebear.com/6.x/thumbs/svg?backgroundColor=161F30&seed=${name}")` }}></div> : null}
                            </div>
                        ))}
                        {loading &&
                            <div className="chat-message chat-message-assistant">
                                <div className="chat-profile chat-profile-assistant"></div>
                                <div className="chat-text chat-text-assistant">
                                    <p style="display:flex">{typingMessage} <p class="typing">...</p></p>
                                </div>
                            </div>
                        }

                        <div ref={messagesEndRef} />
                    </div>
                    <form className="chat-input-container" onSubmit={submitForm}>
                        <input
                            className="chat-input"
                            type="text"
                            value={inputText}
                            placeholder="Talk to me..."
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <button
                            className="chat-send-button"
                            type="submit"
                        >
                            <img src={send} class="chat-send-icon" />
                        </button>
                    </form>
                    <div className="chat-footer">
                        <div className="chat-footer-text">© 2023 Jalimind</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
