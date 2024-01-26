// src/App.js
import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Modifier ici

import Header from './components/Header';
import Favorites from './components/Favorites';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail'; // Assurez-vous d'importer le composant PokemonDetail
import ErrorPage from './components/ErrorPage';
import ErrorDevice from './components/ErrorDevice';

import data from './doc/pokedex.json';


const App = () => {

  const [width, setWidth] = useState(window.innerWidth);
  
  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  return (
    <Router>
      {width > 768 ? <ErrorDevice /> :
      <>
        <Header />
        <Routes> {/* Modifier ici */}
          <Route path="/" element={<PokemonList data={data} />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} /> {/* Ajoutez cette ligne */}
          <Route path="/error" element={<ErrorPage />} /> {/* Route par défaut pour les erreurs 404 */}
          <Route path="/*" element={<ErrorPage />} /> {/* Route par défaut pour les erreurs 404 */}
        </Routes> {/* Modifier ici */}
      </>}
    </Router>
  );
}

export default App;
