import { Carousel } from 'react-bootstrap';

import PokemonList from './PokemonList';

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useState } from 'react';

const Evolution = ({pokemon}) => {

    const [index, setIndex] = useState(0);

    const handleSelect = (direction) => {
        setIndex(direction);
    };

    return (
        <div className="Evolution">
            {
                pokemon.length === 0 ?
                <p className='text-secondary text-center'>This pokemon does'nt have any evolution</p>
                :
                <>
                    <div className='d-flex justify-content-between'>
                        <Carousel className='d-flex align-items-center w-100' activeIndex={index} onSelect={handleSelect} indicators={false} interval={null} prevIcon={<FaAngleLeft />} nextIcon={<FaAngleRight />}>
                            {pokemon.map(pok => {
                                return <Carousel.Item key={pok.Id}>
                                    <PokemonList data={pok} disableSearch={true} carousel={true} />
                                </Carousel.Item>
                            })}
                        </Carousel>      
                    </div>
                    <div className='indicators d-flex justify-content-center mt-3'>{pokemon.map((_, i) => {return <div key={i} className={`${index === i ? `type-${pokemon[0].Types[0]}` : 'bg-black opacity-25'} rounded-circle mx-2 position-relative`}></div>})}</div>
                </>
            }
        </div>
    )
}

export default Evolution;