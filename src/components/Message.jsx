function Message() {
  return (
    <div className="message owner">
      <div className="message-info">
        <img
          src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <span>Just now</span>
      </div>
      <div className="message-content">
        <p>Hello</p>
        {/* <img
          src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        /> */}
      </div>
    </div>
  );
}

export default Message;
