# Backend MyTree

Cette documentation présente les points d'accès (endpoints) disponibles pour l'application MyTree. Elle inclut des détails sur les entrées de requêtes (inputs) et les sorties attendues (outputs) pour chaque endpoint de l'API, que l'équipe frontend peut utiliser pour intégrer les services backend.

## Architecture du Backend

L'architecture du backend suit une structure modulaire et est organisée comme suit :

- **`/config`** : Contient les fichiers de configuration pour différentes parties de l'application comme la base de données, l'authentification et les variables d'environnement.
- **`/controllers`** : Logique de traitement des requêtes. Chaque contrôleur gère la logique pour un aspect spécifique de l'application (par exemple, les utilisateurs, les arbres généalogiques, etc.).
- **`/models`** : Définit les schémas de la base de données MongoDB pour différentes entités comme les utilisateurs et les relations.
- **`/routes`** : Définit les routes de l'API RESTful qui exposent les fonctionnalités du serveur.
- **`/middleware`** : Contient les fonctions middleware pour la gestion des erreurs, l'authentification, la journalisation, et d'autres tâches transversales.
- **`/utils`** : Fonctions utilitaires qui peuvent être utilisées dans différents endroits du backend pour exécuter des tâches communes.
- **`server.js`** : Le point d'entrée principal du serveur backend qui configure et lance le serveur Express.

## Authentification

### Inscription

- **Endpoint** : `POST /api/auth/register`
- **Description** : Enregistrer un nouvel utilisateur.
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
    "message": "Utilisateur enregistré avec succès",
    "userId": "identifiantUniqueUtilisateur"
  }
  ```

### Connexion

- **Endpoint** : `POST /api/auth/login`
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
    "userId": "identifiantUniqueUtilisateur"
  }
  ```

### Déconnexion

- **Endpoint** : `POST /api/auth/logout`
- **Description** : Déconnecter un utilisateur et invalider le token.
- **Entrée** :
  ```json
  {
    "token": "jwt.token.ici"
  }
  ```
- **Sortie** :
  ```json
  {
    "message": "Utilisateur déconnecté avec succès"
  }
  ```

## Gestion des Utilisateurs (Administrateur)

### Changer de Rôle

- **Endpoint** : `PATCH /api/users/{userId}/role`
- **Description** : Changer le rôle d'un utilisateur.
- **Entrée** :
  ```json
  {
    "newRole": "admin"
  }
  ```
- **Sortie** :
  ```json
  {
    "message": "Rôle utilisateur mis à jour avec succès"
  }
  ```

## Gestion des Informations Généalogiques

### Ajouter une Personne

- **Endpoint** : `POST /api/people`
- **Description** : Ajouter une nouvelle personne à l'arbre généalogique.
- **Entrée** :
  ```json
  {
    "name": "Jean",
    "surname": "Dupont",
    "gender": "male",
    "birthdate": "1980-01-01"
    // Autres attributs...
  }
  ```
- **Sortie** :
  ```json
  {
    "message": "Personne ajoutée avec succès",
    "personId": "identifiantUniquePersonne"
  }
  ```

## Gestion des Relations Familiales

### Ajouter une Relation

- **Endpoint** : `POST /api/relations`
- **Description** : Ajouter une nouvelle relation familiale.
- **Entrée** :
  ```json
  {
    "personId1": "identifiantUniquePersonne1",
    "personId2": "identifiantUniquePersonne2",
    "relationType": "parent"
    // Autres attributs...
  }
  ```
- **Sortie** :
  ```json
  {
    "message": "Relation ajoutée avec succès",
    "relationId": "identifiantUniqueRelation"
  }
  ```

## Importation/Exportation de Données

### Exporter l'Arbre

- **Endpoint** : `GET /api/export`
- **Description** : Exporter l'arbre généalogique au format JSON.
- **Entrée** : Aucune, authentification requise.
- **Sortie** : Fichier JSON de l'arbre généalogique.

### Importer l'Arbre

- **Endpoint** : `POST /api/import`
- **Description** : Importer un arbre généalogique à partir d'un fichier JSON.
- **Entrée** : Fichier JSON de l'arbre généalogique.
- **Sortie** :
  ```json
  {
    "message": "Arbre importé avec succès"
  }
  ```

## Statistiques

### Obtenir les Statistiques

- **Endpoint** : `GET /api/statistics`
- **Description** : Récupérer des statistiques sur l'arbre généalogique.
- \*\*Entrée

\*\* : Aucune, authentification requise.

- **Sortie** :
  ```json
  {
    "totalMembers": 50,
    "averageLifespan": 72
    // Autres statistiques...
  }
  ```

## Erreurs

Tous les endpoints renverront des codes d'état HTTP appropriés accompagnés de messages d'erreur descriptifs en cas d'échec.
