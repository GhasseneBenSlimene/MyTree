# Backend MyTree

Cette documentation présente les points d'accès (endpoints) disponibles pour l'application MyTree. Elle inclut des détails sur les entrées de requêtes (inputs) et les sorties attendues (outputs) pour chaque endpoint de l'API, que l'équipe frontend peut utiliser pour intégrer les services backend.

## Architecture du Backend

L'architecture du backend suit une structure modulaire et est organisée comme suit :

- **`/config`** : Contient les fichiers de configuration pour différentes parties de l'application comme la base de données, l'authentification et les variables d'environnement.
- **`/controllers`** : Logique de traitement des requêtes. Chaque contrôleur gère la logique pour un aspect spécifique de l'application (par exemple, les utilisateurs, les arbres généalogiques, etc.).
- **`/handlers`** : Ce dossier contient les handlers utilisés par les contrôleurs pour traiter et gérer les données.
- **`/models`** : Définit les schémas de la base de données MongoDB pour différentes entités comme les utilisateurs et les relations.
- **`/routes`** : Définit les routes de l'API RESTful qui exposent les fonctionnalités du serveur.
- **`/middleware`** : Contient les fonctions middleware pour la gestion des erreurs, l'authentification, la journalisation, et d'autres tâches transversales.
- **`/utils`** : Fonctions utilitaires qui peuvent être utilisées dans différents endroits du backend pour exécuter des tâches communes.
- **`server.js`** : Le point d'entrée principal du serveur backend qui configure et lance le serveur Express.

## Authentification

### Inscription

- **Endpoint** : `POST /auth/register`
- **Description** : Enregistrer un nouvel utilisateur.
- **Entrée** :
  ```json
  {
    "email": "utilisateur@exemple.com",
    "password": "motdepasse123",
    "nom": "Jean",
    "prenom": "Dupont",
    "sexe": "Homme",
    "photo": "urlPhoto",
    "dateNaissance": "1980-01-01",
    "dateDeces": null,
    "professions": "Menuisier",
    "adresse": "123 rue de l'Exemple",
    "tel": "0123456789"
  }
  ```
- **Sortie** :
  ```json
  {
    "message": "Utilisateur enregistré avec succès",
    "userId": "identifiantUniqueUtilisateur"
  }
  ```

**Remarque 1** : Le premier utilisateur inscrit sera automatiquement un administrateur.

**Remarque 2** : Si l'utilisateur est déjà ajouté par un autre membre de la famille et vient d'être inscrit, il trouvera un arbre généalogique déjà créé avec ses relations.

### Connexion

- **Endpoint** : `POST /auth/login`
- **Description** : Authentifier un utilisateur et obtenir un token.
- **Entrée** :
  ```json
  {
    "email": "utilisateur@exemple.com",
    "password": "motdepasse123"
  }
  ```
- **Sortie** :
  ```json
  {
    "token": "jwt.token.ici",
    "userId": "identifiantUniqueUtilisateur",
    "role": "user/admin"
  }
  ```

**Remarque 1** : Si l'utilisateur est approuvé par l'administrateur, l'API retournera la sortie mentionnée. Si l'utilisateur est en attente ou refusé, l'API renverra un message d'erreur.

**Remarque 2** : Le token expirera après une durée spécifiée dans le fichier config/config.js.

### Déconnexion

- **Endpoint** : `GET /auth/logout`
- **Description** : Déconnecter un utilisateur et invalider le token.
- **Entrée** : Aucune, authentification requise.

**Remarque** : Le premier utilisateur inscrit sera automatiquement un administrateur.

- **Sortie** :
  ```json
  {
    "message": "Utilisateur déconnecté avec succès"
  }
  ```

## Gestion des Utilisateurs (Administrateur)

### Changer de Rôle

### Supprimer un Utilisateur

- **Endpoint** : `DELETE /delete/:email`
- **Description** : Supprime un utilisateur de la base de données en utilisant son email.
- **Paramètres** :
  - `email` : L'email de l'utilisateur à supprimer.
- **Entrée** : Aucune.

### Lister les Utilisateurs

- **Endpoint** : `GET /users/list`
- **Description** : Récupère une liste de tous les utilisateurs.
- **Entrée** : Aucune.
- **Sortie** :

  ```json
  [
    {
      "_id": "6637f9de212a5dd35f768959",
      "email": "test1@gmail.com",
      "role": "user",
      "status": "accepte",
      "createdAt": "2024-05-05T21:27:58.559Z",
      "updatedAt": "2024-05-05T21:27:58.559Z",
      "__v": 0
    },
    {
      "_id": "6638a81fc8ab1e33178efbbc",
      "email": "test2@gmail.com",
      "role": "user",
      "status": "refuse",
      "person": "6638a81fc8ab1e33178efbba",
      "createdAt": "2024-05-06T09:51:27.388Z",
      "updatedAt": "2024-05-08T16:28:24.980Z",
      "__v": 0
    }
    // Autres utilisateurs...
  ]
  ```

- **Endpoint supplémentaire** : `GET /users/list/:status`
- **Description** : Récupère une liste des utilisateurs filtrés par leur statut.
- **Paramètres** :
  - `status` : Le statut des utilisateurs à lister (ex. actif, inactif).
- **Sortie** :
  ```json
  [
    {
      "_id": "6637f9de212a5dd35f768959",
      "email": "test1@gmail.com",
      "role": "user",
      "status": "en attente",
      "person": "6638a81fc8ab1e33178e789a",
      "createdAt": "2024-05-05T21:27:58.559Z",
      "updatedAt": "2024-05-05T21:27:58.559Z",
      "__v": 0
    },
    {
      "_id": "6638a81fc8ab1e33178efbbc",
      "email": "test2@gmail.com",
      "role": "user",
      "status": "en attente",
      "person": "6638a81fc8ab1e33178efbba",
      "createdAt": "2024-05-06T09:51:27.388Z",
      "updatedAt": "2024-05-08T16:28:24.980Z",
      "__v": 0
    }
    // Autres utilisateurs...
  ]
  ```

### Valider les Informations d'un Utilisateur

- **Endpoint** : `GET /valid/info/:id`
- **Description** : Récupérer le profil d'un utilisateur à travers son ID.
- **Paramètres** :
  - `id` : ID de l'utilisateur.
- **Entrée** : Aucune.
- **Sortie** :

  ```json
  {
    "_id": "6640c69870d013fff60a4ab0",
    "email": "s1@exp.com",
    "role": "admin",
    "status": "accepte",
    "person": {
      "_id": "6640c69870d013fff60a4aae",
      "nom": "Jean",
      "prenom": "Dupont",
      "email": "s1@exp.com",
      "sexe": "Homme",
      "photo": "2024-05-12T13-39-36.327Z-frame.png",
      "dateNaissance": "1980-01-01T00:00:00.000Z",
      "dateDeces": null,
      "professions": "Menuisier",
      "adresse": "123 rue de l'Exemple",
      "tel": "0123456789",
      "conjoints": [],
      "enfants": [],
      "createdAt": "2024-05-12T13:39:36.666Z",
      "updatedAt": "2024-05-12T13:39:36.666Z",
      "__v": 0
    },
    "createdAt": "2024-05-12T13:39:36.689Z",
    "updatedAt": "2024-05-12T13:47:18.556Z",
    "__v": 0
  }
  ```

- **Endpoint supplémentaire** : `PUT /valid/:id/:status`
- **Description** : Met à jour le statut d'un utilisateur.
- **Paramètres** :
  - `id` : ID de l'utilisateur dont le statut doit être mis à jour.
  - `status` : Nouveau statut de l'utilisateur (ex. actif, inactif).
- **Entrée** : Aucune.
- **Sortie** :
  ```json
  {
    "result": {
      "_id": "6640c69870d013fff60a4ab0",
      "email": "s1@exp.com",
      "role": "user",
      "status": "accepte", //Le status a été mis à jour
      "person": "6640c69870d013fff60a4aae",
      "createdAt": "2024-05-12T13:39:36.689Z",
      "updatedAt": "2024-05-12T14:20:33.462Z",
      "__v": 0
    }
  }
  ```

### Partager les Ressources d'un Utilisateur

- **Endpoint** : `PUT /share/:id/:role`
- **Description** : Attribue ou met à jour le rôle d'un utilisateur concernant l'accès aux ressources partagées.
- **Paramètres** :
  - `id` : ID de l'utilisateur à qui le rôle est attribué.
  - `role` : Rôle à attribuer à l'utilisateur (ex. admin, user).
- **Entrée** : Aucune.
- **Sortie** :
  ```json
  {
    "result": {
      "_id": "6640c69870d013fff60a4ab0",
      "email": "s1@exp.com",
      "role": "admin", //Le role a été mis à jour
      "status": "accepte",
      "person": "6640c69870d013fff60a4aae",
      "createdAt": "2024-05-12T13:39:36.689Z",
      "updatedAt": "2024-05-12T14:20:33.462Z",
      "__v": 0
    }
  }
  ```

## Gestion des Relations Familiales

### Ajout de Relations Familiales (Méthode 1)

- **Endpoint** : `POST /people/addRelation/{id?}`
- **Description** : Ajoute un père, une mère, un conjoint ou un enfant à une personne spécifiée par l'ID fourni ou, si aucun ID n'est fourni, à la personne actuellement connectée. Si l'ID est omis, la relation sera ajoutée à la personne actuellement connectée.
- **Paramètres** :
  - `id` (optionnel) : ID de la personne à laquelle la relation doit être ajoutée. Si non spécifié, la relation sera ajoutée à la personne actuellement connectée.
- **Entrée** :

  ```json
  {
    "email": "testt36@gmail.com",
    "relation": "pere",
    "nom": "blaaa",
    "prenom": "bou",
    "sexe": "Homme",
    "photo": "urlPhoto",
    "dateNaissance": "08/06/2000",
    "dateDeces": "",
    "professions": "Prof",
    "adresse": "4 avenue",
    "tel": "+334964886",
    // si Conjoint
    "dateUnion": "08/06/2000",
    "dateSeparation": "04/07/2005"
  }
  ```

- **Sortie** :

  ```json
  {
    "message": "Relation ajoutée avec succès",
    "personId": "identifiantUniquePersonne"
  }
  ```

### Ajout de Relations Familiales (Méthode 2)

- **Endpoint** : `POST /people/addRelationByEmail/:email/:id?`
- **Description** : Cette route permet d'ajouter une relation à une personne existante, identifiée par son email. Si un ID est fourni, la relation est ajoutée à la personne correspondant à cet ID. Sinon, la relation est ajoutée à la personne actuellement connectée. Cette fonctionnalité est particulièrement utile pour établir des relations familiales (père, mère, conjoint, etc.) entre des personnes déjà présentes dans la base de données.
- **Paramètres** :
  - `email` : Email de la personne qui deviendra le membre de la relation spécifiée (père, mère, conjoint, etc.).
  - `id` (optionnel) : ID de la personne à laquelle la relation doit être ajoutée. Si non spécifié, la relation est ajoutée à la personne actuellement connectée.
- **Corps de la requête** :

  ```json
  {
    "relation": "conjoint",
    // si Conjoint
    "dateUnion": "2024-01-01",
    "dateSeparation": "2025-01-01"
  }
  ```

- **Sortie** :

  ```json
  {
    "message": "Relation ajoutée avec succès",
    "personId": "identifiantUniquePersonne"
  }
  ```

### Obtenir une Relation

- **Endpoint** : `GET /people/getRelation/{id1}/{id2}`
- **Description** : Récupère les détails de la relation entre deux personnes identifiées par `id1` et `id2`. La relation est définie du point de vue de la personne `id1` par rapport à la personne `id2`. Par exemple, si la relation est "enfant", cela signifie que la personne `id1` est l'enfant de la personne `id2`.
- **Paramètres** :
  - `id1` : ID de la personne 1.
  - `id2` (optionnel) : ID de la personne 2. Si non spécifié, l'ID de la personne actuellement connectée sera utilisé.
- **Entrée** : Aucune.
- **Sortie** :
  ```json
  {
    "message": "Relation récupérée avec succès",
    "relation": {
      "id1": "identifiantUniquePersonne1",
      "id2": "identifiantUniquePersonne2",
      "relation": "type de relation"
    }
  }
  ```

### Mise à Jour d'une personne

- **Endpoint** : `PATCH /people/updatePerson/{id?}`
- **Description** : Met à jour une relation spécifique (père, mère, conjoint, ou enfant) pour une personne identifiée par l'ID.
- **Paramètres** :
  - `id` (optionnel) : ID de la personne à laquelle la relation doit être ajoutée. Si non spécifié, la relation sera ajoutée à la personne actuellement connectée.
- **Entrée** :

  ```json
  {
    "nom": "Doe",
    "prenom": "John",
    "adresse": "123 Main St",
    "photo": "nouveau urlPhoto" // Cette action supprime l'ancienne image et ajoute la nouvelle
  }
  ```

- **Sortie** :
  ```json
  {
    "message": "Personne mise à jour avec succès",
    "personId": "identifiantUniquePersonne"
  }
  ```

### Suppression de Relations Familiales

- **Endpoint** : `DELETE /people/deleteRelation/{id1}/{id2?}`
- **Description** : Supprime une relation spécifique (père, mère, conjoint, ou enfant) pour des personnes identifiées par l'ID.
- **Paramètres** :
  - `id1` : ID de la personne 1.
  - `id2` (optionnel) : ID de la personne 2. Si non spécifié, l'ID de la personne actuellement connectée sera utilisé.
- **Entrée** : Aucune.

- **Sortie** :
  ```json
  {
    "message": "Relation supprimée avec succès",
    "id1": "identifiantUniquePersonne1",
    "id2": "identifiantUniquePersonne2"
  }
  ```

### Supprimer une Personne

- **Endpoint** : `DELETE /people/deletePerson/{id}`
- **Description** : Supprime une personne de la base de données, identifiée par son ID.
- **Paramètres** :
  - `id` : ID de la personne à supprimer.
- **Entrée** : Aucune.
- **Sortie** :
  ```json
  {
    "message": "Personne supprimée avec succès",
    "personId": "identifiantUniquePersonne"
  }
  ```
  **Remarque** : Après la suppression, la photo de l'utilisateur sera également supprimée.

## Importation/Exportation de Données

### Exporter l'info d'une personne à travers son ID

- **Endpoint** : `GET /people/{id}`
- **Description** : Exporter les informations d'une personne à travers son id.
- **Entrée** : Aucune.
- **Sortie** : Fichier JSON de l'arbre généalogique.

exemple de sortie:

```json
{
  "_id": "60d6c47e4094a45b0468d7c9",
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "sexe": "Homme",
  "photo": "photo.jpg",
  "dateNaissance": "1980-01-01T00:00:00.000Z",
  "dateDeces": null,
  "professions": "Ingénieur",
  "adresse": "123 Rue de Paris, Paris, France",
  "tel": "+33123456789",
  "informationsComplementaires": {
    "hobbies": "Lecture, randonnée"
  },
  "parents": {
    "pere": "60d6c47e4094a45b0468d7c8",
    "mere": "60d6c47e4094a45b0468d7c7"
  },
  "conjoints": [
    {
      "idConjoint": "60d6c47e4094a45b0468d7c6",
      "dateUnion": "2005-06-30T00:00:00.000Z",
      "dateSeparation": null
    }
  ],
  "enfants": [
    {
      "idEnfant": "60d6c47e4094a45b0468d7c5"
    }
  ]
}
```

## Erreurs

Chaque endpoint renvoie un code d'état HTTP approprié, ainsi qu'un message d'erreur descriptif en cas d'échec de la requête. Le message d'erreur est renvoyé sous la forme d'un objet JSON, comme illustré ci-dessous :

```json
{
  "error": "Description de l'erreur"
}
```

# Structure de la Base de Données MyTree

## Collections MongoDB

### Collection `Users`

La collection `Users` contient des informations sur les utilisateurs qui peuvent se connecter et gérer les données généalogiques.

Chaque document de la collection `Users` peut contenir les champs suivants :

- **\_id** : Identifiant unique MongoDB de l'utilisateur.
- **email** : Adresse email de l'utilisateur, utilisée pour la connexion et unique dans la base de données.
- **passwordHash** : Hash du mot de passe de l'utilisateur pour une sécurité accrue.
- **role** : Rôle de l'utilisateur qui peut être par exemple 'admin' ou 'user', déterminant les niveaux d'accès.
- **status** : Indique le statut actuel de l'utilisateur :
  - `Active` : L'inscription de l'utilisateur a été approuvée par l'administrateur.
  - `Suspended` : L'utilisateur a été suspendu par l'administrateur.
- **person** : Identifiant unique MongoDB de la personne (Person) associée à l'utilisateur.
- **createdAt** : Date de création de l'utilisateur.
- **updatedAt** : Date de la dernière mise à jour de l'utilisateur.

### Collection `Persons`

La collection `Persons` stocke les enregistrements individuels de chaque personne dans l'arbre généalogique.

Chaque document de la collection `Persons` peut contenir les champs suivants :

- **\_id** : Identifiant unique MongoDB de la personne.
- **nom** : Nom de famille de la personne (obligatoire).
- **prenom** : Prénom de la personne (obligatoire).
- **email** : Email de la personne (obligatoire).
- **sexe** : Genre de la personne, 'Homme' ou 'Femme' (obligatoire).
- **photo** : Nom de la photo de la personne (facultatif).
- **dateNaissance** : Date de naissance de la personne (facultative).
- **dateDeces** : Date de décès de la personne (facultative).
- **professions** : Liste des professions de la personne (facultatif).
- **coordonnees** : Coordonnées comprenant l'adresse, le téléphone, l'email, etc. (facultatif).
- **informationsComplementaires** : Toute autre information supplémentaire (facultatif).
- **parents** : Objets contenant les identifiants des parents de la personne (facultatif).
- **conjoints** : Tableau d'objets contenant les identifiants des conjoints de la personne (facultatif).
- **enfants** : [Tableau d'objets contenant les identifiants des enfants de la personne (facultatif).]
- **createdAt** : Date de création du document.
- **updatedAt** : Date de mise à jour du document.

## Sécurité

- Les mots de passe ne sont jamais stockés en clair dans la base de données. Seul le hash du mot de passe, généré à l'aide d'un algorithme de cryptage fort, est stocké dans la collection `Users`.

- Certaines routes sont limitées et ne peuvent être accessibles que par des utilisateurs spécifiques. Les permissions sont gérées au niveau du serveur pour assurer la sécurité et l'intégrité des données.

## Exemple de Document de la Collection `Persons`

```json
{
  "\_id": ObjectId("identifiantUniquePersonne"),
  "nom": "Dupont",
  "prenom": "Jean",
  "sexe": "Homme",
  "photo": "urlPhoto",
  "email": "JeanDupont@gmail.com",
  "dateNaissance": "1970-05-15",
  "dateDeces": null,
  "professions": "Menuisier",
  "adresse": "123 rue de l'Exemple",
  "tel": "0123456789",
  "informationsComplementaires": "Informations diverses ici",
  "parents": {
    "pere": ObjectId("identifiantPere"),
    "mere": ObjectId("identifiantMere")
  },
  "conjoints": [
    {
      "idConjoint": ObjectId("identifiantConjoint"),
      "dateUnion": "1995-06-20",
      "dateSeparation": "2005-04-15"
    }
  ],
  "enfants": [
    {
      "idEnfant": ObjectId("identifiantEnfant"),
    }
  ]
}
```
