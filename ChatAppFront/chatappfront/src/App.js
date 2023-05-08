import './App.css';
import Login from './components/login/Login';
import {Routes, Route} from 'react-router-dom';
import Register from "./components/login/Register";
const App = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </>
  );
}

export default App;
