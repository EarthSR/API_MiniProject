import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from './components/Mainpage';
import SignInAdmin from './components/SignInAdmin';
import Dashboard from './components/Dashboard';
import { Navigate } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/mainpage" />} /> 
      <Route exact path='/mainpage' element={<Mainpage />} />
      <Route exact path='/SignInAdmin' element={<SignInAdmin />} />
      <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
