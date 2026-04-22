import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
   <div className='container-fluid'>
    <Navbar />
    <Outlet /> 
    <Footer/>
   </div>
  );
}

export default App;