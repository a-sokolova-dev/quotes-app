# [quotes-app][web-url]

An daily quote SPA built with TypeScript, React & MUI.

[web-url]: https://a-sokolova-dev.github.io/beauty-glow-landing/

## Project Structure

The project uses **React** as the UI framework and **Vite** as the build tool.

- [`.github/`](.github/): scripts to test & deploy to GitHub Pages.
- `dist/`: `pnpm build` will build the result here for deployment.
- [`public/`](./public/): static files like favicon.
- [`src/`](./src/): app entry point and global things like theme and routes.
  - [`api/`](./src/api/): types of API data.
  - [`pages/`](./src/pages/): React components for pages.
  - [`services/`](./src/services/): applications logic & API calls.
    - [`test/`](./src/services/test/): service unit tests.
  - [`test/`](./src/test/): tests for application pages.
  - [`ui/`](./src/ui): shared components between different pages.
  - [`main.tsx`](./src/main.tsx): JS entry point.
  - [`routes.ts`](./src/routes.ts): SPA routes.
  - [`theme.ts`](./src/theme.ts): custom MUI theme.
- [`index.html`](./index.html): build tool entry point.
- [`env.example`](.env.example): list of `.env` secrets.

## Tools

Development tools:

- [Prettier](./.prettierrc) to keep the code style consistent.
- [TypeScript](./tsconfig.json) for strict type checking.
- [ESLint](./eslint.config.js) to find and fix problems in JS.

## Getting Started

### Clone the project using one of these ways:

1. [Fork](https://github.com/a-sokolova-dev/quotes-app/fork) the repository

2. Clone the repository locally

```bash
git clone https://github.com/a-sokolova-dev/quotes-app
cd quotes-app
```

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm start
```

## Scripts

- `pnpm test`: run all tests.
- `pnpm start`: run development server.
- `pnpm build`: build production files in dist/.
- `pnpm build`: preview production build.
- `pnpm format`: fix code style in all files.
- `pnpm update-env`: check for Node.js and pnpm updates.

## Client Storage

The application uses `localStorage` to store daily quotes in order to avoid frequent API calls.
