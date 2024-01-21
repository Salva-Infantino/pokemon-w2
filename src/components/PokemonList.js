// src/components/PokemonList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatId, getImage } from '../utils/Utils';

import {Row, Col} from 'react-bootstrap';

import { ImCross } from "react-icons/im";

const PokemonList = ({ data, disableSearch, carousel }) => {
  const [searchTerm, setSearchTerm] = useState('');
  let filteredPokemon;

  // Filtrer les Pokémon en fonction du terme de recherche
  if (!disableSearch) {
    filteredPokemon = data.filter((pokemon) => {
      const searchValue = searchTerm.toLowerCase();
      return (
        pokemon.Name.toLowerCase().includes(searchValue) ||
        String(formatId(pokemon.Id)).includes(searchValue)
      );
    });
  } else {
    filteredPokemon = [data];
  }

  return (
    <div className={!carousel ? "container" : ""}>
      <Row>
        <Col xs={12}>{!disableSearch && 
          <div className='d-flex align-items-center'>
            <input className='w-100 my-4' type="text" placeholder="Search by name or id" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <ImCross className='position-absolute end-0 me-4' onClick={() => setSearchTerm('')} />
          </div>}
        </Col>

        {filteredPokemon.map((pokemon) => (
          <Col xs={12} sm={6} className={!carousel ? 'mb-4' : ''} key={pokemon.Id}>
            <Link key={pokemon.Id} to={`/pokemon/${formatId(pokemon.Id)}`} className='text-decoration-none'>
              <div className={`pokemon-card p-3 rounded-4 h-100 type-${pokemon.Types[0]} position-relative overflow-hidden`}>
                <p className='m-0 text-end display-6 fw-bold text-black text-opacity-25'>#{`${formatId(pokemon.Id)}`}</p>
                <p className='fw-bold text-white display-6'>{pokemon.Name}</p>
                <div className='d-inline-flex flex-column'>
                  {pokemon.Types.map((type, i) => {
                    return <span key={i} className='badge rounded-pill m-1 bg-white bg-opacity-25'>{type}</span>
                  })}
                </div>
                <img src={getImage(pokemon.Id)} alt={pokemon.Name} className={`${carousel ? 'w-50' : ''} position-absolute`}/>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PokemonList;