// NewRelationForm.js
/* global data */

import React, { useState } from 'react';
import axios from 'axios';


let showNewRelationForm = false;

const toggleNewRelationForm = () => {
    showNewRelationForm = !showNewRelationForm;
    console.log(showNewRelationForm);
};

const NewRelationForm = ({ setShowForm }) => {
    const [image, setImage] = useState('');
    const [dataNewRelation, setDataNewRelation] = useState({
        type: '',
        fromDate: '',
        toDate: '',
        withExistingPerson: true,
        personId: '', // L'ID de la personne sélectionnée (si existante)
        newPersonData: { // Les données de la nouvelle personne à ajouter
            email: '',
            nom: '',
            prenom: '',
            sexe: 'Homme',
            dateNaissance: '',
            dateDeces: '',
            professions: '',
            adresse: '',
            tel: '',
            photo: ''
        }
    });

    const addRelation = async () => {

        // e.preventDefault(); // Empêche le comportement par défaut de la soumission du formulaire
        console.log(dataNewRelation);

        if (
            dataNewRelation.newPersonData.prenom.trim() === "" ||
            dataNewRelation.newPersonData.nom.trim() === "" ||
            dataNewRelation.newPersonData.sexe.trim() === "" ||
            dataNewRelation.newPersonData.email.trim() === ""
        ) {

            alert("Veuillez remplir tous les champs obligatoires (Prénom, Nom, Genre, e-mail");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('prenom', dataNewRelation.newPersonData.prenom);
            formData.append('nom', dataNewRelation.newPersonData.nom);
            formData.append('sexe', dataNewRelation.newPersonData.sexe);
            formData.append('email', dataNewRelation.newPersonData.email);
            if (image) formData.append('photo', image);
            formData.append('professions', dataNewRelation.newPersonData.professions);
            formData.append('tel', dataNewRelation.newPersonData.tel);
            formData.append('adresse', dataNewRelation.newPersonData.adresse);

            const formattedBirthday = dataNewRelation.newPersonData.dateNaissance ? new Date(dataNewRelation.newPersonData.dateNaissance) : "";
            const formattedDeathday = dataNewRelation.newPersonData.dateDeces ? new Date(dataNewRelation.newPersonData.dateDeces) : "";
            
            formData.append('dateNaissance', formattedBirthday);
            formData.append('dateDeces', formattedDeathday);

            var id = localStorage.getItem("id_tmp");
            const dataRelation = {
                relation: dataNewRelation.type,
            };
        
            if (dataNewRelation.type === 'conjoint') {
                dataRelation.dateUnion = dataNewRelation.fromDate ? new Date(dataNewRelation.fromDate) : "";
                dataRelation.dateSeparation = dataNewRelation.toDate ? new Date(dataNewRelation.toDate) : "";
            }
        
            if (dataNewRelation.withExistingPerson) {
                var idMember = dataNewRelation.personId;

                const response = await axios.post(`/people/addRelationByEmail/${data.persons[idMember].email}/${id}`, dataRelation);
                console.log("Relation ajoutée avec succès :", response.data);

            } else {
                // Si c'est une nouvelle personne, envoyez les données de la nouvelle personne avec les informations de la relation
                for (const key in dataRelation) {
                    formData.append(key, dataRelation[key]);
                }
                console.log(formData);
                const response = await axios.post(`/people/addRelation/${id}`, formData);
                console.log("Relation ajoutée avec succès :", response.data);
            }

            // window.location.reload();

        } catch (error) {
            console.error("Erreur lors de l'ajout de la relation :", error);
        }
    }
    

    return (
        <form onSubmit={(e) => addRelation(e)}>
            <h3>Ajouter une relation</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Type de relation :</td>
                        <td>
                            <select
                                value={dataNewRelation.type}
                                onChange={(e) => setDataNewRelation({ ...dataNewRelation, type: e.target.value })}
                            >
                                <option value="">Sélectionner le type de relation</option>
                                <option value="pere">Ajouter un père</option>
                                <option value="mere">Ajouter une mère</option>
                                <option value="enfant">Ajouter un enfant</option>
                                <option value="conjoint">Ajouter un conjoint</option>
                            </select>
                        </td>
                    </tr>
                    {dataNewRelation.type === 'conjoint' && (
                        <>
                            <tr>
                                <td>Depuis quand :</td>
                                <td>
                                    <input
                                        type="date"
                                        value={dataNewRelation.fromDate}
                                        onChange={(e) => setDataNewRelation({ ...dataNewRelation, fromDate: e.target.value })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Jusqu'à quand :</td>
                                <td>
                                    <input
                                        type="date"
                                        value={dataNewRelation.toDate}
                                        onChange={(e) => setDataNewRelation({ ...dataNewRelation, toDate: e.target.value })}
                                    />
                                </td>
                            </tr>
                        </>
                    )}
                    <tr>
                        <td>Qui ? :</td>
                        <td>
                            <select
                                value={dataNewRelation.withExistingPerson ? dataNewRelation.personId : 'new'}
                                onChange={(e) => {
                                    console.log(dataNewRelation);
                                    const value = e.target.value;
                                    if (value === 'new') {
                                        setDataNewRelation({ ...dataNewRelation, withExistingPerson: false, personId: '' });
                                    } else {
                                        setDataNewRelation({ ...dataNewRelation, withExistingPerson: true, personId: value });
                                    }
                                }}
                            >
                                <option value="">-</option>
                                {Object.keys(data.persons).map(personId => {
                                    if (personId !== localStorage.getItem('id_tmp')) {
                                        console.log(personId);
                                        return (
                                            <option key={personId} value={personId}>
                                                {data.persons[personId].prenom + " " + data.persons[personId].nom}
                                            </option>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                                <option value="new">Nouvelle personne</option>
                            </select>
                        </td>
                    </tr>
                    {!dataNewRelation.withExistingPerson && (
                        <>
                            <tr>
                                <td colSpan="2">
                                    <h3>Complétez les informations suivantes</h3>
                                </td>
                            </tr>
                            <tr>
                                <td>Prénom :</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Prénom"
                                        value={dataNewRelation.newPersonData.prenom}
                                        onChange={(e) => setDataNewRelation({ ...dataNewRelation, newPersonData: { ...dataNewRelation.newPersonData, prenom: e.target.value } })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Nom :</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        value={dataNewRelation.newPersonData.nom}
                                        onChange={(e) => setDataNewRelation({ ...dataNewRelation, newPersonData: { ...dataNewRelation.newPersonData, nom: e.target.value } })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Genre :</td>
                                <td>
                                    <select
                                        value={dataNewRelation.newPersonData.sexe}
                                        onChange={(e) => setDataNewRelation({ ...dataNewRelation, newPersonData: { ...dataNewRelation.newPersonData, sexe: e.target.value } })}
                                    >
                                        <option value="Homme">Homme</option>
                                        <option value="Femme">Femme</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Né(e) le :</td>
                                <td>
                                    <input
                                        type="date"
                                        placeholder="Date de naissance"
                                        value={dataNewRelation.newPersonData.dateNaissance}
                                        onChange={(e) => setDataNewRelation({ ...dataNewRelation, newPersonData: { ...dataNewRelation.newPersonData, dateNaissance: e.target.value } })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Mort(e) le :</td>
                                <td>
                                    <input
                                        type="date"
                                        placeholder="Date de décès"
                                        value={dataNewRelation.newPersonData.dateDeces}
                                        onChange={(e) => setDataNewRelation({ ...dataNewRelation, newPersonData: { ...dataNewRelation.newPersonData, dateDeces: e.target.value } })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Contacts :</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Profession"
                                        value={dataNewRelation.newPersonData.professions}
                                        onChange={(e) => setDataNewRelation({ ...dataNewRelation, newPersonData: { ...dataNewRelation.newPersonData, professions: e.target.value } })}
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="Adresse"
                                        value={dataNewRelation.newPersonData.adresse}
                                        onChange={(e) => setDataNewRelation({ ...dataNewRelation, newPersonData: { ...dataNewRelation.newPersonData, adresse: e.target.value } })}
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="Téléphone"
                                        value={dataNewRelation.newPersonData.tel}
                                        onChange={(e) => setDataNewRelation({ ...dataNewRelation, newPersonData: { ...dataNewRelation.newPersonData, tel: e.target.value } })}
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="email"
                                        value={dataNewRelation.newPersonData.email}
                                        onChange={(e) => setDataNewRelation({ ...dataNewRelation, newPersonData: { ...dataNewRelation.newPersonData, email: e.target.value } })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Photo: </td>
                                <td>
                                <input
                                        type="file"
                                        id="photo"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0]) }
                                    />
                                </td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
            <button type="button" onClick={() => addRelation()}>Ajouter</button>
        </form>
    );
}
export { toggleNewRelationForm, showNewRelationForm, NewRelationForm }; // Exportation de showNewRelationForm et dataNewRelationDefault
