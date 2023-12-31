import Cam from '../images/video-camera.png';
import Add from '../images/user-plus.png';
import More from '../images/dots-three-outline.png';
import Messages from './Messages';
import Input from './Input';

import { useChat } from '../context/ChatContext';

function Chat() {
  const { data } = useChat();
  return (
    <div className="chat">
      <div className="chat-info">
        <span>{data.user?.displayName}</span>
        <div className="chat-icons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
