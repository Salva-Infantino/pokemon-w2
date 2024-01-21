// src/components/ErrorPage.js
import { Link, Navigate, useLocation } from 'react-router-dom'

import { Container, Image } from 'react-bootstrap'

import Error1 from '../img/Error1.jpeg'
import Error2 from '../img/Error2.webp'
import Error3 from '../img/Error3.jpeg'
import Error4 from '../img/Error4.png'
import Error5 from '../img/Error5.png'
import Error6 from '../img/Error6.jpeg'
import Error7 from '../img/Error7.png'
import Error8 from '../img/Error8.png'

const ErrorPage = () => {

    const location = useLocation();

    const randomImg = () => {
        const imgs = [Error1, Error2, Error3, Error4, Error5, Error6, Error7, Error8];
        const index = Math.floor(Math.random() * imgs.length) + 0;
        return imgs[index];
    }

    if (location.pathname !== '/error') {
        return <Navigate to="/error" />
    } else {
        return (
            <Container>
                <div className='d-flex flex-column justify-content-center align-items-center text-center'>
                    <h1 className='my-4'>OUPSS</h1>
                    <p className='text-secondary m-0'>The page you are looking for doesn't exist...</p>
                    <Image src={randomImg()} className='w-75 my-5' />
                    <Link to='/' className='btn btn-dark'>Back to home page</Link>
                </div>
            </Container>
        );
    }
};

export default ErrorPage;
