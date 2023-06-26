// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.css';

import NxWelcome from './nx-welcome';
import '../assets/css/app.css'

import Footer from './components/Footer';
import Order from './components/Order';

export function App() {

  
  return (
   <>
        <Order/>
        <Footer/>
   </>
  );
}

export default App;
