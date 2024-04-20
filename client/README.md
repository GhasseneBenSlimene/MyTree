# Documentation des Fonctionnalités Front-End pour MyTree

## Aperçu

Cette documentation détaille les fonctionnalités front-end requises pour l'application MyTree. Elle décrit les interactions de l'utilisateur avec l'interface et les appels aux points d'accès (endpoints) de l'API back-end nécessaires pour chaque action.

## Authentification

### Page d'Inscription

- Intégrer un formulaire d'inscription qui soumet les données au point d'accès `POST /api/auth/register`.
- Prévoir une validation de formulaire côté client pour l'email et le mot de passe.
- Gérer les réponses de succès et d'erreur de l'API et afficher les messages appropriés à l'utilisateur.

### Page de Connexion

- Créer un formulaire de connexion pour soumettre les données à `POST /api/auth/login`.
- Enregistrer le token retourné dans le stockage local pour maintenir la session utilisateur.
- Rediriger vers la page principale de l'application après une connexion réussie.

## Gestion des Utilisateurs (Administrateur)

### Interface Administrateur

- Concevoir une interface administrateur pour changer les rôles des utilisateurs en utilisant le point d'accès `PATCH /api/users/{userId}/role`.
- Permettre à l'administrateur de voir la liste des utilisateurs et de modifier leurs droits d'accès.

## Gestion des Informations Généalogiques

### Ajout/Édition de Personne

- Fournir des formulaires pour ajouter et éditer les informations des personnes via les points d'accès `POST /api/people` et `PUT /api/people/{personId}`.
- Assurer que les champs du formulaire correspondent aux données attendues par l'API.

### Gestion des Relations Familiales

- Implémenter une interface pour ajouter des relations entre les membres de la famille via `POST /api/relations`.
- Permettre aux utilisateurs de visualiser et de modifier les relations existantes.

## Visualisation de l'Arbre Généalogique

### Affichage de l'Arbre

- Intégrer une librairie graphique, comme D3.js, pour visualiser l'arbre généalogique.
- S'assurer que l'arbre peut être navigué et que les détails des individus peuvent être affichés.

## Fonctionnalités Supplémentaires

### Importation/Exportation

- Ajouter des fonctionnalités pour que les utilisateurs puissent exporter et importer leur arbre au format JSON en utilisant les endpoints `GET /api/export` et `POST /api/import`.

### Statistiques

- Afficher les statistiques de l'arbre généalogique obtenues à partir de `GET /api/statistics`.

## Interface et Expérience Utilisateur

- Toutes les interfaces doivent être réactives et adaptées aux dispositifs mobiles.
- La conception doit être cohérente avec une navigation intuitive.
- Implémenter des gestionnaires d'erreurs pour tous les appels API afin d'informer les utilisateurs en cas de problème.

## Erreurs et Validation

- Intégrer une gestion des erreurs côté client pour les formulaires et les requêtes API.
- Valider les entrées utilisateur avant de les envoyer au back-end pour éviter les appels API inutiles.
