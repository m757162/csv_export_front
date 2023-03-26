import logo from './logo.svg';
import './App.css';
import Home from './Books/Home';
import Admin from './Books/Admin';
import Edit from './Books/Edit';
import Login from './Auth/Login';
import Registation from './Auth/Registation';
import {Route,Routes} from 'react-router-dom';
function App() {
  return(
    <>               
      <Routes> 
            <Route  exact  path="/" element={<Home />}/>  
            <Route  exact  path="admin" element={<Admin />}/>  
            <Route  exact  path="/edit/:id" element={<Edit />}/>  
            <Route  exact  path="login" element={<Login />}/>    
            <Route  exact  path="registation" element={<Registation />}/>  
      </Routes>
    </>
);
}

export default App;
