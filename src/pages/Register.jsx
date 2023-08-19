import AddImg from '../images/file-plus.png';
function Register() {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">CHATix</span>
        <span className="title">Register</span>
        <form>
          <input type="text" placeholder="Write your name" />
          <input type="email" placeholder="Pass your email" />
          <input type="password" placeholder="Write your password" />
          <input type="file" id="file" style={{ display: 'none' }} />
          <label htmlFor="file">
            <img src={AddImg} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        <small>You do have an account? Login</small>
      </div>
    </div>
  );
}

export default Register;