import Navbar from './Navbar';
import Search from './Search';
import ChatList from './ChatList';

function Sidebar() {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <ChatList />
    </div>
  );
}

export default Sidebar;
