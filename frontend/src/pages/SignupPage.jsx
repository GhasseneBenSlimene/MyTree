import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./styles/LoginPage.css";
import './styles/background.css';


export default function Signup() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [sexe, setSexe] = useState('');
    const [photo, setPhoto] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [dateDeces, setDateDeces] = useState('');
    const [professions, setProfessions] = useState('');
    const [adresse, setAdresse] = useState('');
    const [tel, setTel] = useState('');
    const [error, setError] = useState('');

    const handleFirstStepSubmit = async (event) => {
        event.preventDefault();
        try {
            if (password1 === password2) {
                if (password1.length >= 6 && /[a-zA-Z]/.test(password1) && /[0-9]/.test(password1)) {
                    setStep(2);
                } else {
                    setError("Le mot de passe doit contenir 6 caractères (chiffres et lettres).");
                }
            } else {
                setError("Les mots de passe ne sont pas identiques.");
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.response.data.error || error.response.data.message || 'Une erreur s\'est produite');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Création d'un objet FormData
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password1);
            formData.append('nom', nom);
            formData.append('prenom', prenom);
            formData.append('sexe', sexe);
            formData.append('photo', photo);
            formData.append('dateNaissance', dateNaissance);
            formData.append('dateDeces', dateDeces);
            formData.append('professions', professions);
            formData.append('adresse', adresse);
            formData.append('tel', tel);

            console.log(formData)

            // Envoi de la requête avec FormData
            const response = await axios.post('/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('response:', response);
            window.location.href = '/login';
        } catch (error) {
            setError("Une erreur s'est produite lors du traitement de votre demande.");
            console.error('Error:', error);
        }
    };

    return (
        <div className='background'>
            {step === 1 && (
                <div className="login-container">
                    <h2>S'inscrire</h2>
                    <form onSubmit={handleFirstStepSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" placeholder="example@gmail.com" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="password">Mot de passe:</label>
                        <input type="password" id="password1" placeholder="Password.123" value={password1} onChange={(e) => setPassword1(e.target.value)} required />
                        <label htmlFor="password">Vérifier le mot de passe:</label>
                        <input type="password" id="password2" placeholder="Password.123" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                        <button type="submit">Suivant</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    <p>Vous avez déjà un compte ? <Link to="/login">Se connecter</Link></p>
                </div>
            )}

            {step === 2 && (
                <div className="login-container">
                    <h2>Informations personnelles</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nom">Nom de famille*:</label>
                        <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                        <label htmlFor="prenom">Prénom*:</label>
                        <input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                        <label htmlFor="sexe">Genre*:</label>
                        <select id="sexe" value={sexe} onChange={(e) => setSexe(e.target.value)} required>
                        <option value="">Choisir le sexe</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                        </select>
                        <label htmlFor="photo">Photo:</label>
                        <input type="file" id="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
                        <label htmlFor="dateNaissance">Date de naissance:</label>
                        <input type="date" id="dateNaissance" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} />
                        <label htmlFor="dateDeces">Date de mort:</label>
                        <input type="date" id="dateDeces" value={dateDeces} onChange={(e) => setDateDeces(e.target.value)} />
                        <label htmlFor="professions">Profession:</label>
                        <input type="text" id="professions" value={professions} onChange={(e) => setProfessions(e.target.value)} />
                        <label htmlFor="adresse">Adresse:</label>
                        <input type="text" id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                        <label htmlFor="tel">Téléphone:</label>
                        <input type="tel" id="tel" value={tel} onChange={(e) => setTel(e.target.value)} />
                        <button type="submit">S'inscrire</button>
                    </form>
                    <p>(*): Ce champs est requis.</p>
                    {error && <p className="error-message">{error}</p>}
                    <br></br>
                </div>
                
            )}
        <br></br>
        <br></br>
        <br></br>
        </div>
    );
}
