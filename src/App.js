import React from 'react';
import CifradoCesar from './Components/Cesar';
import Escitala from './Components/Escitala';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Seguridad Informática: Procesos de Cifrado</h1>
          <h2>Cifrado César y Escítala</h2>
        </div>

        <div>
          <img
            src="/Images/Cod.png"
            alt="Cómo usar"
            className="imagen-cifrado"
          />
        </div>
      </header>

      <main className="contenedor-cifrado">
        <div className="cifrado-item">
          <CifradoCesar />
        </div>
        <div className="cifrado-item">
          <Escitala />
        </div>
      </main>
      <header className="App-header">
        <div>
          <h2>Adair Hernández Escobar 7B</h2>
        </div>
      </header>

    </div>
  );
}

export default App;
