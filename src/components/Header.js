// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { removeLeadingZeros, formatId } from '../utils/Utils';
import data from '../doc/pokedex.json';

import { Container, Navbar } from 'react-bootstrap';

import { FaRegHeart, FaHeart, FaListUl } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { FaArrowLeftLong } from "react-icons/fa6";

const Header = () => {
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const pokemonId = location.pathname.split('/pokemon/')[1]; // Extraire l'ID du Pokémon de l'URL
  const [bgColor, setBgColor] = useState('');
  
  useEffect(() => {
    pokemonId && setBgColor(data.find(x => x.Id === Number(removeLeadingZeros(pokemonId)))?.Types[0])
  }, [pokemonId])

  useEffect(() => {
    // Récupérer la liste des favoris depuis le local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Vérifier si l'ID du Pokémon actuel est présent dans la liste des favoris
    const isPokemonFavorite = favorites.includes(formatId(pokemonId));

    // Mettre à jour l'état isFavorite en conséquence
    setIsFavorite(isPokemonFavorite);
  }, [location.pathname, pokemonId]);

  const handleFavoriteToggle = () => {
    // Récupérer la liste des favoris depuis le local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Vérifier si l'ID du Pokémon actuel est déjà en favori
    const isPokemonFavorite = favorites.includes(pokemonId);

    // Mettre à jour la liste des favoris en ajoutant ou retirant l'ID du Pokémon
    if (isPokemonFavorite) {
      const updatedFavorites = favorites.filter((id) => id !== pokemonId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(pokemonId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Inverser la valeur actuelle de isFavorite
    setIsFavorite((prevValue) => !prevValue);
  };

  document.querySelector('#root').classList.remove('overflow-hidden');

  const renderHeaderContent = () => {

    // Ne pas afficher le header sur la page d'erreur
    if (location.pathname === '/error') {
      return null;
    }
    
    switch (location.pathname) {
      case '/favorites':
        return (
          <>
            <h1 className='m-0'>Favorites</h1>
            <Link to="/" className='d-flex justify-content-center align-items-center text-black'><HiOutlineHome /></Link>
          </>
        );
      case `/pokemon/${pokemonId}`:

        document.querySelector('#root').classList.add('overflow-hidden');

        return (
          <>
            <Link to="/" className='d-flex justify-content-center align-items-center text-white'><FaArrowLeftLong /></Link>
            <label className='d-flex justify-content-center align-items-center text-white'>
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
              <input
                className='d-none'
                type="checkbox"
                checked={isFavorite}
                onChange={handleFavoriteToggle}
              />
            </label>
          </>
        );
      default:
        return (
          <>
            <h1 className='m-0'>Pokedex</h1>
            <Link to="/favorites" className='d-flex justify-content-center align-items-center text-black'><FaListUl /></Link>
          </>
        );
    }
  };

  return (
    <Navbar sticky='top' className={`pt-4 ${pokemonId ? 'type-'+bgColor : "bg-white"}`}>
      <Container>
        {renderHeaderContent()}
      </Container>
    </Navbar>
  );
};

export default Header;
