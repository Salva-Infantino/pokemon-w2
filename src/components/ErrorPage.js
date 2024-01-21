// src/components/ErrorPage.js
import { Link, Navigate, useLocation } from 'react-router-dom'


const ErrorPage = () => {

    const location = useLocation();

    if (location.pathname !== '/error') {
        return <Navigate to="/error" />
    } else {
        return (
            <div>
            <h1>Page non trouvée</h1>
            <p>La page que vous cherchez n'existe pas.</p>
            <Link to='/'>Page Home</Link>
            </div>
        );
    }
};

export default ErrorPage;
