// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.css';

import NxWelcome from './nx-welcome';

export function App() {

  
  const [message,setMessage] = useState("");
  useEffect(() => {
    fetch("/api")
    .then(response => response.json())
    .then(response => setMessage(response.message) )
  })
  return (
    <div>
      {/*<NxWelcome title="client" />*/}
      <h1>Respuesta de la API: {message}</h1>
    </div>
  );
}

export default App;
