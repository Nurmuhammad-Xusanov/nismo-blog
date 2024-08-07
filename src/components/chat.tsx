import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./navbar";
import { styles } from "../utils/styles";
import { FaArrowDown } from "react-icons/fa";
import { Loader2 } from "lucide-react";

interface Message {
    id: string;
    text: string;
    createdAt: Timestamp;
    uid: string;
    displayName: string;
}

const Chat: React.FC = () => {
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        try {
            const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
            setIsLoading(true)
            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                const messages: Message[] = [];
                await querySnapshot.forEach((doc) => {
                    messages.push({ id: doc.id, ...doc.data() } as Message);
                });
                setMessages(messages);
                setIsLoading(false)
                scrollToBottom();
                return () => unsubscribe();
            });
        } catch (error) {
            console.log(error);
        }


    }, []);
    console.log(isLoading);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newMessage.trim() === "") {
            return;
        }

        try {
            await addDoc(collection(db, "messages"), {
                text: newMessage,
                createdAt: Timestamp.fromDate(new Date()),
                uid: user?.uid,
                displayName: user?.displayName,
            });
            setNewMessage("");
            scrollToBottom();
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };


    const handleScrollTop = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={`${styles.container} chat-con`}>
            <div className="nav-con">
                <Navbar />
            </div>
            {isLoading ? (
                <div className="flex justify-center mt-52 items-center h-24">
                    <Loader2 size={34} className="animate-spin text-sky-500" />
                </div>
            ) : (
                <div className={`w-100 ${styles.container}`}>
                    <div className="chat-box mb-[50px]">
                        {messages.map((message) => (
                            <div key={message.id} className={`message ${message.uid === user?.uid ? "sent" : "received"}`}>
                                <div className="message-info">
                                    <span className={`ss:text-[15px] text-[10px]`}>{message.displayName}</span>
                                    <span className={`ss:text-[15px] text-[10px]`}>{new Date(message.createdAt.toDate()).toLocaleString()}</span>
                                </div>
                                <p>{message.text}</p>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className={`chat-input fixed w-[100%] bottom-0`}>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            required
                        />
                        <button type="submit">Send</button>
                    </form>
                    <button className="text-white nav-top bottom-[90px]" onClick={handleScrollTop}>
                        <FaArrowDown />
                    </button>
                </div>
            )}

        </div>
    );
};

export default Chat;
