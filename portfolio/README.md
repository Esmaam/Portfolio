# portfolio/

Dossier racine de l'application Next.js. Voir le [README global](../README.md) pour la présentation complète du projet, la stack et les choix d'architecture.

## Lancer le projet

```bash
npm install
npm run dev
```

Créer un fichier `.env.local` à partir de l'exemple ci-dessous :

```
# Turso (base de données)
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token

# SMTP (formulaire de contact)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-smtp-password
```

Ouvrir [http://localhost:3000](http://localhost:3000).
