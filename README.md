# Portfolio — Adama Mariko

Portfolio personnel en **SvelteKit 3 / Svelte 5** (runes), prérendu en pages statiques.

```sh
npm install
npm run dev      # http://localhost:5173
npm run check    # types + Svelte
npm run format   # Prettier
npm run build
```

## Modifier le contenu

Aucun texte n'est écrit en dur dans les composants : tout se trouve dans `src/lib/data/`.

| Fichier            | Contenu                                             |
| ------------------ | --------------------------------------------------- |
| `profile.ts`       | Identité, coordonnées, textes du profil, navigation |
| `skills.ts`        | Catégories de technologies et statistiques          |
| `experience.ts`    | Parcours professionnel                              |
| `education.ts`     | Diplômes, certifications et projet d'études         |
| `projects.ts`      | Projets personnels (filtres, fiches détaillées)     |
| `organizations.ts` | Projets d'équipe (TransfertCM, Jeko)                |

Les logos des technologies sont déclarés une seule fois dans `src/lib/utils/tech-icons.ts`
(Simple Icons) ; les données y font référence par leur clé (`'svelte'`, `'laravel'`…).

## Structure

```
src/
├─ app.html
├─ routes/
│  ├─ +layout.svelte          Styles globaux
│  ├─ +layout.ts              Prérendu
│  └─ +page.svelte            Assemble les sections
└─ lib/
   ├─ data/                   Contenu du site
   ├─ types/portfolio.ts      Types partagés
   ├─ utils/tech-icons.ts     Logos et couleurs des technologies
   ├─ stores/ui.svelte.ts     État global (terminal, menu)
   ├─ actions/reveal.ts       Apparition au défilement
   ├─ styles/                 tokens.css · base.css · utilities.css
   └─ components/             Importer depuis '#lib/components/index.ts'
      ├─ layout/              Navbar, MobileMenu, Footer, BootScreen, Seo, Logo
      ├─ sections/            Une section de page par fichier
      ├─ ui/                  Briques génériques (SectionHeading, TechTile, StatCard…)
      ├─ projects/            ProjectTile, ProjectCover, ProjectModal
      ├─ experience/          ExperienceRow
      ├─ terminal/            TerminalWindow, TerminalLauncher, commands.ts
      └─ effects/             Constellation, MatrixRain
```

Icônes d'interface : [Lucide](https://lucide.dev) · logos : [Simple Icons](https://simpleicons.org).
