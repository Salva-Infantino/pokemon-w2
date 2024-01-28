// src/components/Favorites.js
import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import data from '../doc/pokedex.json';
import { formatId } from '../utils/Utils';
import { Container } from 'react-bootstrap';

const Favorites = () => {
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  useEffect(() => {
    // Récupérer la liste des favoris depuis le local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Filtrer les données des pokémons en fonction des favoris
    const favoritePokemonsData = data.filter((pokemon) =>
        favorites.includes(String(formatId(pokemon.Id)))
    );

    setFavoritePokemons(favoritePokemonsData);
  }, []);

  return (
    <>
      {favoritePokemons.length === 0 ? (
        <Container>
          <small className='text-center mt-5 text-muted d-block'>No pokemon in favorite list for now.</small>
        </Container>
      ) : (
        <PokemonList data={favoritePokemons} />
      )}
    </>
  );
};

export default Favorites;
