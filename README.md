# Projet Javascript


Projet de développement en Javascript dans le cadre de l'enseignement dispensé en M1 MIAGE par Monsieur BUFFA, Technologies Web.

Il s'agit de créer une interface de recherche de restaurant de toutes de cuisines du monde.

## Avant de commencer

Avant de lancer le jeu. Vous devez installer votre environnement de travail.

Téléchargez Nodes.js depuis le site officiel : [Nodes.js](https://nodejs.org/en/)

Ensuite vous pouvez suivre ce magnifique [tutoriel](https://codeconstructionahead.com/fullstack-with-firebase-vuejs/) pour créer une application en mode CLI. 

Ensuite vous devez installer [mongoDB](https://docs.mongodb.com/manual/installation/)
Télécharger la [BD](https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json) qui sera utile pour le projet.

Sous macos vous pouvez faire :

```
brew update
brew install mongodb
mkdir -p /data/db
chmod 777 /data/db (pour autoriser un user lambda à écrire dedans)
mongod (pour exécuter MongoDB)
```


### Installation

Depuis votre terminal, de commande déplacez vous dans le répertoire où se trouve le jeu et suivez cette procédure.

Dans un premier temps vous devez lancer le serveur sur votre machine.
```
node servercrudwithmongo.js
```

```
mongod
```

Enfin à la racine du projet.

```
npm run serve
```

Plus qu'à lancer un navigateur et entrer localhost.

## Built With

* [VueJS](https://vuejs.org/v2/guide/installation.html)
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)


## Auteurs

* **Maxime Prévôt  & Florentino Da Silva Neves** 



