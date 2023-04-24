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

- [Quick Start](#quick-start)
    - [Requirement :](#requirement-)
    - [Démarrage de l'application](#demarrage-de-lapplication)


### Requirement :

- Docker
- NPM

### Démarrage de l'application

Le lancement de l'application en local nécessite simplement la génération des vendors et le lancement du docker compose :

```shell
npm install
npm run dev
docker compose up -d --build
```

L'application peut être rendue réactive à l'aide du composant "Web ERS - Web Socket".