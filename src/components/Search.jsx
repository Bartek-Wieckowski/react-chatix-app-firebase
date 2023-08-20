import { useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

function Search() {
  const [searchUsername, setSearchUsername] = useState('');
  const [findUser, setFindUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useAuth();

  async function handleSearch() {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', searchUsername)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setFindUser(doc.data());
          setErr(false);
        });
      } else {
        setFindUser(null);
        setErr(true);
      }
    } catch (error) {
      setErr(true);
    }
  }

  function handleKey(e) {
    if (e.code === 'Enter') {
      handleSearch();
    }
  }

  async function handleSelect() {
    const combinedID =
      currentUser.uid > findUser.uid
        ? currentUser.uid + findUser.uid
        : findUser.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combinedID));
      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedID), { messages: [] });

        // create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedID + '.userInfo']: {
            uid: findUser.uid,
            displayName: findUser.displayName,
            photoURL: findUser.photoURL,
          },
          [combinedID + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', findUser.uid), {
          [combinedID + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedID + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setFindUser(null);
    setSearchUsername('');
  }

  return (
    <div className="search">
      <div className="search-form">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setSearchUsername(e.target.value)}
          onKeyDown={handleKey}
          value={searchUsername}
        />
      </div>

      {err && <span className="errMsg">User not found!</span>}
      {findUser && (
        <div className="user-chat" onClick={handleSelect}>
          <img src={findUser.photoURL} alt="" />
          <div className="user-chat-info">
            <span>{findUser.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
