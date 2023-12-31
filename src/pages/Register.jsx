import { auth, storage, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import AddImg from '../images/file-plus.png';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const displayFile = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, displayFile);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          });
        }
      );
    } catch (error) {
      setErr(true);
    }
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">CHATix</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Write your name" />
          <input type="email" placeholder="Pass your email" />
          <input type="password" placeholder="Write your password" />
          <input type="file" id="file" style={{ display: 'none' }} />
          <label htmlFor="file">
            <img src={AddImg} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span className="errMsg">Something went wrong!</span>}
        </form>
        <small>
          You do have an account? <Link to="/login">Login</Link>
        </small>
      </div>
    </div>
  );
}

export default Register;
