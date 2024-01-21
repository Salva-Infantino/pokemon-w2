// src/components/Favorites.js
import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import data from '../doc/pokedex.json';

const Favorites = () => {
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  useEffect(() => {
    // Récupérer la liste des favoris depuis le local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Filtrer les données des pokémons en fonction des favoris
    const favoritePokemonsData = data.filter((pokemon) =>
        favorites.includes(String(pokemon.Id))
    );

    setFavoritePokemons(favoritePokemonsData);
  }, []);

  return (
    <>
      {favoritePokemons.length === 0 ? (
        <>
          <p>Aucun Pokémon en favori pour le moment.</p>
        </>
      ) : (
        <PokemonList data={favoritePokemons} />
      )}
    </>
  );
};

export default Favorites;
