import { useEffect, useState } from 'react';
import Message from './Message';
import { useChat } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useChat();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatID]);

  return (
    <div className="messages">
      {messages.map((msg) => (
        <Message message={msg} key={msg.id} />
      ))}
    </div>
  );
}

export default Messages;
