import { useState } from 'react';

import './App.css';
import NavBar from './components/NavBar';
import Order from './components/Order';
import Footer from './components/Footer';
import Post from './components/Posts'

function App() {


  return (
    <>
      <NavBar/>
      <Post/>
      <Order/>
      <Footer/>
    </>
  )
}

export default App
