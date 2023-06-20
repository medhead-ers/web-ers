<div align="center">
<img  width="75" src="project-icon.png" />
<br>
<br>
<h1>WEB ERS - ERS SPA WebApp</h1>
</div>

<br>
<br>

Ce dépot contient l'application web développée dans le cadre du POC MedHead ERS.

# Table of contents
- [Requirement :](#requirement-)
- [Configuration de l'application :](#configuration-de-lapplication)
- [Démarrage de l'application](#dmarrage-de-lapplication)
- [Tests automatisés](#tests-automatiss)
  - [Configuration et environnement des tests](#configuration-et-environnement-des-tests)
  - [Execution des tests](#execution-des-tests)

### Requirement :

- Docker
- NPM
- Node JS 18+

### Configuration de l'application

La configuration de l'application peut être effectuée en modifiant les paramètre du fichier `webers.config.js` (documentation fournie dans le fichier de config).

### Démarrage de l'application

Le lancement de l'application en local nécessite simplement la génération des vendors et le lancement du serveur de dev (via npm) :

```shell
npm install
npm run dev
```

> /!\ L'application en elle-même n'a que peu d'intérêt si elle n'est pas démarrée avec les API associées.
> Il est recommandé de l'utiliser avec le bundle [docker-compose](https://github.com/medhead-ers/medheaders-app). 

L'application peut être rendue réactive à l'aide du composant "Web ERS - Web Socket".

### Tests automatisés

#### Configuration et environnement des tests 

Pour rappel, les tests E2E visent à tester l'application dans les conditions les plus "proches" possible de la réalité. Aussi, afin de permettre aux tests de fonctionner et de réussir, il est nécessaire :
  - De disposer d'une application fonctionnelle ayant accès aux différentes API. 
  - De configurer un fichier `cypress.env.json` sur la base du fichier d'exemple. (User / Mot de passe à définir pour l'accès aux API - Cette configuration doit être identique à la configuration docker si l'application tourne en local). 


#### Execution des tests

Des tests E2E et des tests de composants développés avec l'outil Cypress sont disponibles pour l'application. Ils peuvent être lancé avec la commande :   

```shell
npx cypress run --e2e
npx cypress run --component
```

Il est aussi possible d'utiliser l'outil de visualisation Cypress pour suivre visuellement le déroulé des tests :
```shell
npx cypress open
```
#### Rapport de couverture de code

Une fois les tests joués, les rapports de couverture de code peuvent être consultés au format HTML en accédant au fichier `/coverage/icov-report/index.html`