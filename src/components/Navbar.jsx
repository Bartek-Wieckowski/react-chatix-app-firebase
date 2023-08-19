import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">CHATix</span>
      <div className="user">
        <img
          src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <span>John</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
}

export default Navbar;
