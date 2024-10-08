# TODO-APP-UI

## Table des Matières

- [TODO-APP-UI](#todo-app-ui)
  - [Table des Matières](#table-des-matières)
  - [Installation](#installation)
    - [Prérequis](#prérequis)
    - [Étapes d'installation](#étapes-dinstallation)
    - [Commandes utiles](#commandes-utiles)
  - [Structure du Projet](#structure-du-projet)
    - [Technologies](#technologies)
  - [Fonctionnalités](#fonctionnalités)
    - [Links](#links)
  - [Licence](#licence)

## Installation

Pour installer et configurer le projet TODO-APP-UI, suivez ces étapes :

### Prérequis

- Node.js (version 14.x ou supérieure)
- npm (généralement installé avec Node.js)
- Angular CLI (`npm install -g @angular/cli`)

### Étapes d'installation

1. Installer les dépendances :

   ```
   npm install
   ```

   ou

   ```
   yarn
   ```

2. Lancer le serveur de développement :

   ```
   npm run start
   ```

   ou

   ```
   yarn start
   ```

3. Accéder à l'application :
   Ouvrez votre navigateur et allez à `http://localhost:4200`

### Commandes utiles

- Construction pour la production : `npm run build` ou `yarn build`
- Exécution des tests unitaires : `npm run test` ou `yarn test`

## Structure du Projet

- `src/app/` : Composants, services, modules principaux
  - `core/` : Éléments essentiels de l'application
    - `adapters/` : Gateways pour HttpClient, localStorage, etc.
    - `models/` : Modèles et interfaces partagés
    - `ports/` : Interfaces abstraites définissant les contrats du système
  - `shared/` : Composants, services, modules partagés
  - `views/` : Composants de l'interface utilisateur
    - `public/` : Composants accessibles sans authentification
    - `protected/` : Composants nécessitant une authentification
- `src/assets/` : Ressources statiques (images, vidéos, etc.)
- `src/index.html` : Page d'accueil de l'application
- `src/styles.css` : Styles globaux

### Technologies

- Semantic HTML5 markup
- Flexbox
- Mobile-first workflow
- TailwindCSS
- [Angular 18](https://angular.dev/)
- [Firebase](https://firebase.google.com/)
- [Jest](https://www.npmjs.com/package/jest-preset-angular/)

## Fonctionnalités

- Gestion des tâches
  - Ajouter des tâches
  - Modifier des tâches
  - Supprimer des tâches
  - Filtrer les tâches
  - Marquer une tâche comme terminée
  - Compteur de tâches

### Links

- Live Site URL: [TOO-APP-UI](https://ng-todo-app-ui-99907.web.app/public/login)

## Licence

Ce projet est distribué sous la licence MIT. Voir le fichier `LICENSE` pour plus d'informations.
