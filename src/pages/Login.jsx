import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setErr(true);
    }
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">CHATix</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Pass your email" />
          <input type="password" placeholder="Write your password" />
          <button>Login</button>
        </form>
        {err && <span className="errMsg">Something went wrong!</span>}
        <small>
          You don't have an account? <Link to="/register">Register</Link>
        </small>
      </div>
    </div>
  );
}

export default Login;
