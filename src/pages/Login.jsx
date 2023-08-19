function Login() {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">CHATix</span>
        <span className="title">Login</span>
        <form>
          <input type="email" placeholder="Pass your email" />
          <input type="password" placeholder="Write your password" />
          <button>Login</button>
        </form>
        <small>You don't have an account? Register</small>
      </div>
    </div>
  );
}

export default Login;
