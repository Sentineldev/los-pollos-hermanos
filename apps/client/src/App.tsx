import { useState } from 'react';

import './App.css';
import NavBar from './components/NavBar';
import Order from './components/Order';
import Footer from './components/Footer';

function App() {


  return (
    <>
      <NavBar/>
      <Order/>
      <Footer/>
    </>
  )
}

export default App
