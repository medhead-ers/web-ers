<div align="center">
<img  width="75" src="project-icon.png" />
<br>
<br>
<h1>WEB ERS - ERS SPA WebApp</h1>

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=medhead-ers_web-ers&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=medhead-ers_web-ers)
</div>
<br>

Ce dépot contient l'application web développée dans le cadre du POC MedHead ERS.

# Table of contents

- [Requirement :](#requirement--)
- [Configuration de l'application](#configuration-de-l-application)
- [Démarrage de l'application](#d-marrage-de-l-application)
- [Tests automatisés](#tests-automatis-s)
  + [Configuration et environnement des tests](#configuration-et-environnement-des-tests)
  + [Execution des tests](#execution-des-tests)
  + [Rapport de couverture de code](#rapport-de-couverture-de-code)
- [GitHub Actions CI/CD Pipelines](#github-actions-ci-cd-pipelines)
- [Workflow GIT](#workflow-git)

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

## GitHub Actions CI/CD Pipelines

La configuration des pipelines CI/CD peut être retrouvée dans le dossier `.github/workflows`.

| Pipeline       | Déclencheur                                             | Description                                                                                                                                                              |
|----------------|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Build and Test | push (develop ou main) pull request (created + updated) | Créé un environnement de test et déclenche les tests automatisés avec Cypress (E2E / Components). Les résultats seront transmis à la plateforme SonarCloud pour analyse. |

## Workflow GIT

Le workflow git "[Git-flow](https://git-flow.readthedocs.io/fr/latest/presentation.html)" a été retenu pour le développement. Le code ayant été produit par un unique développeur, son utilisation a été simplifiée pour les développements liés à la PoC.

Il est possible de résumer le workflow de la manière suivante :

- Une branche `develop`
- Une branche `main`
- Pas de commit direct sur `develop` ni sur `main`
- Création d'une branche `features/{nom_feature}` à partir de `develop` pour chaque fonctionnalité.
- Une fois la fonctionnalité prête (et testée), ouverture d'une `pull request` vers `develop`.
- Après analyse des métriques qualité, code review etc... : merge de la `pull request` (squash recommandé pour garder 1 commit / feature).
- Une fois la version basée sur `develop` acceptée, ouverture d'une `pull request` vers `main`.
- Création d'une release à partir de `main` une fois la version acceptée.