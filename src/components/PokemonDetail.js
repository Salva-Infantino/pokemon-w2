// src/components/PokemonDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import data from '../doc/pokedex.json';

import About from './About';
import BaseStats from './BaseStats';
import Evolution from './Evolution';

import { formatId, getImage } from '../utils/Utils';

import { Container, Image } from 'react-bootstrap';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [pokemonExists, setPokemonExists] = useState(true);

  const nav = ['About', 'Base Stats', 'Evolution'];
  const [activeNav, setActiveNav] = useState(nav[0]);

  useEffect(() => {// Recherche du Pokémon dans les données en fonction de l'ID
    const selectedPokemon = data.find((pokemon) => String(formatId(pokemon.Id)) === id);

    if (selectedPokemon) {
      // Mettre à jour l'état avec les détails du Pokémon
      setPokemonDetails(selectedPokemon);
    } else {
      // Si le Pokémon n'existe pas, mettre à jour l'état pour afficher la page d'erreur
      setPokemonExists(false);
    }
  }, [id]);

  useEffect(() => {
        if (pokemonDetails) {
            const evoPokemonsData = data.filter((pokemon) =>
                pokemonDetails.Evolution.includes(pokemon.Name)
            );
            setEvolution(evoPokemonsData);
        }
    }, [pokemonDetails])

    if (!pokemonExists) {
        return <Navigate to="/error" />;
    }

  if (!pokemonDetails) {
    // Si les détails du Pokémon ne sont pas encore chargés, vous pouvez afficher un indicateur de chargement
    return <p>Chargement...</p>;
  }

  return (
    <div className={`App pokemonPage type-${pokemonDetails.Types[0]}`}>
            <Container className='text-white topPage'>
                <div className='d-flex justify-content-between'>
                    <h1>{pokemonDetails.Name}</h1>
                    <span className='d-block fw-light text-end display-1 opacity-50'>#{formatId(pokemonDetails.Id)}</span>
                </div>
                {
                    pokemonDetails.Types.map(type => {
                        return <small key={pokemonDetails.Id+type} className='badge rounded-pill m-1 pokemon-type'>{type}</small>
                    })
                }
                <div className='d-flex justify-content-center align-items-center bg-img position-relative z-2'>
                    <Image src={getImage(pokemonDetails.Id)} alt={pokemonDetails.Name} style={{transform: "translateY(5%)"}} />
                </div>
            </Container>
            <Container className='pt-5 rounded-top-5 bottomPage bg-white position-relative z-1'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                    {
                        nav.map(item => {
                            return <div 
                                    key={item} 
                                    className={`p-2 ${item === activeNav ? 'text-black border-'+pokemonDetails.Types[0] : 'text-secondary border-bottom'}`}
                                    onClick={() => setActiveNav(item)}>
                                        {item}
                                </div>
                        })
                    }
                </div>
                {
                    activeNav === nav[0] ?
                    <About pokemon={pokemonDetails} /> :
                    activeNav === nav[1] ?
                    <BaseStats pokemon={pokemonDetails} /> :
                    activeNav === nav[2 ]
                    && <Evolution pokemon={evolution} />
                }
            </Container>
        </div>
  );
};

export default PokemonDetail;
