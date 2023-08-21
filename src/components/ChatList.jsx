import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

function ChatList() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth();
  const { dispatch } = useChat();

  useEffect(() => {
    function getChats() {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    }

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  function handleSelect(userInfo) {
    dispatch({ type: 'changeUser', payload: userInfo });
  }

  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat) => (
        <div
          className="user-chat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="user-chat-info">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].userInfo.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
