import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function Search() {
  const [searchUsername, setSearchUsername] = useState('');
  const [findUser, setFindUser] = useState(null);
  const [err, setErr] = useState(false);

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

  return (
    <div className="search">
      <div className="search-form">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setSearchUsername(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>

      {err && <span className="errMsg">User not found!</span>}
      {findUser && (
        <div className="user-chat">
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
