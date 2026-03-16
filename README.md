# Portfolio — Amaïa Mescco

Portfolio personnel accessible à l'adresse https://portfolio-amaiamescco.vercel.app/. Ce projet m'a servi d'entraînement pour découvrir React et Next.js en conditions réelles, après une formation principalement orientée back-end.

## Stack

| Couche | Technologie | Justification |
|---|---|---|
| Framework | **Next.js 16** (App Router) | SSR natif, routing par fichiers, déploiement simplifié sur Vercel |
| UI | **React 19** | Découverte du framework, composants réutilisables, gestion d'état local |
| Langage | **TypeScript** | Typage strict, cohérence entre les couches (modèles, mappers, controllers) |
| Base de données | **Turso** (libSQL) | Voir section dédiée ci-dessous |
| Style | **CSS Modules** | Scope local, contrôle sur le rendu |
| Déploiement | **Vercel** | Intégration native Next.js, gratuit, previews automatiques, analytics inclus |
| Observabilité | **Vercel Analytics + Speed Insights** | Suivi du trafic et des performances sans configuration |

## Base de données

Tout le contenu du portfolio est stocké en base plutôt qu'en dur dans le code. Cela permet de modifier les données (expériences, projets, compétences, messages hero…) sans toucher au code.

Le schéma couvre les entités suivantes :

- **Owner** — informations personnelles (nom, email, LinkedIn)
- **HeroMessage** — phrases affichées en rotation sur la page d'accueil
- **Company / Role / RoleKeyword** — expériences professionnelles avec leurs mots-clés associés
- **Project / ProjectImage / ProjectKeyword** — projets avec images et mots-clés
- **Skill / SkillCategory** — compétences regroupées par catégorie
- **Keyword / KeywordCategory** — mots-clés transverses, catégorisés pour le filtrage sur la page projets
- **Education** — formations

**Pourquoi Turso ?** SQLite distribué, sans serveur à gérer, avec un tier gratuit suffisant pour un portfolio. La migration depuis SQLite local vers Turso a permis d'aborder la notion de base distante en conservant la simplicité du format SQLite.

## Architecture

Le projet suit une architecture en couches inspirée des patterns back-end :

```
controllers → services → repositories → base de données
                                      ↑
                                   mappers / models
```

Chaque entité (Project, Role, Skill, Keyword…) possède son propre modèle, mapper, repository, service et controller. Ce choix, inhabituel pour un projet front-end, était intentionnel : appliquer les principes appris en formation à un contexte React/Next.js.

## Lancer le projet

```bash
cd portfolio
npm install
npm run dev
```

Une base Turso est requise. Créez un fichier `.env.local` avec :

```
# Turso (base de données)
TURSO_DATABASE_URL=****
TURSO_AUTH_TOKEN=****

# SMTP (formulaire de contact)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-smtp-password
```
