import React from 'react';
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom
import "./styles/HomePage.css";
import './styles/background.css';


export default function HomePage() {
    return (
        <div className='background'>
            <div className="text-container">
                <h1 id="title">Explorez les Racines de Votre Famille</h1>
                <p id="subtitle">Découvrez l'histoire fascinante de votre famille à travers les générations avec
        Arbre Généalogique. Notre plateforme conviviale vous permet de créer des arbres généalogiques interactifs,
        de retracer les liens familiaux et de découvrir des histoires inédites sur vos ancêtres.</p>
                <Link to="/register" id="start-button">Commencer</Link>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div>
    );
};
