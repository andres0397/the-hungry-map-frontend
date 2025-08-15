## The Hungry Map App 🦐

This app is developed by Software engineers enthusiast that one day decided to create an app to find great places to eat around the city, enjoy.

---

### Table of Contents

1. [Requeriments](#requeriments)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Architecture](#architecture)

---

### Requeriments

- Node 18+
- npm 9+

### Installation

install all dependencies by running:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

```

---

### Usage

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm run dev
```

### Architecture

This app uses the **Next.js** framework with TypeScript, following principles of **Clean Architecture** to support future growth and maintain separation of concerns.

We organize the project into four layers:

1. **Domain** – business rules and entities
2. **Application** – use cases and application logic
3. **Infrastructure** – data sources, APIs, external services
4. **Presentation** – UI and framework-specific code (React/Next.js)

Although not every pure concept of Clean Architecture applies directly in a React/Next.js environment, our approach is inspired by its principles and adapted for flexibility.
