import Attach from '../images/paperclip.png';
import Img from '../images/file-image.png';
import { useState } from 'react';
import { db, storage } from '../firebaseConfig';
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function Input() {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const { currentUser } = useAuth();
  const { data } = useChat();

  async function handleSend() {
    const unqID = crypto.randomUUID();

    if (img) {
      const storageRef = ref(storage, unqID);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatID), {
              messages: arrayUnion({
                id: unqID,
                text,
                senderID: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, 'chats', data.chatID), {
        messages: arrayUnion({
          id: unqID,
          text,
          senderID: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatID + '.lastMessage']: {
        text,
      },
      [data.chatID + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatID + '.lastMessage']: {
        text,
      },
      [data.chatID + '.date']: serverTimestamp(),
    });

    setImg(null);
    setText('');
  }
  function handleKey(e) {
    if (e.code === 'Enter') {
      handleSend();
      setImg(null);
      setText('');
    }
  }

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKey}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Input;
