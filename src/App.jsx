import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import './styles.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function App() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
