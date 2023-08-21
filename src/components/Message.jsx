import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

function Message({ message }) {
  const { currentUser } = useAuth();
  const { data } = useChat();

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  function calculateMessageDateTime() {
    if (message.date) {
      const timestamp = message.date;
      const messageDate = timestamp.toDate();
      const currentDate = new Date();

      if (
        messageDate.getDate() === currentDate.getDate() &&
        messageDate.getMonth() === currentDate.getMonth() &&
        messageDate.getFullYear() === currentDate.getFullYear()
      ) {
        return messageDate.toLocaleTimeString();
      } else {
        return messageDate.toLocaleString();
      }
    }
    return;
  }

  return (
    <div
      ref={ref}
      className={`message ${message.senderID === currentUser.uid && 'owner'}`}
    >
      <div className="message-info">
        <img
          src={
            message.senderID === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
        />
        <small>{calculateMessageDateTime()}</small>
      </div>
      <div className="message-content">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}

export default Message;
