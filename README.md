# zb-accordion

A simple, accessible FAQ accordion built with React, TypeScript, and Vite.

## Features

- **Accordion UI** for frequently asked questions
- **Theme toggle**: Light, dark, and system theme support
- **Persistent theme** using localStorage
- **Responsive design**
- **Accessible**: Keyboard navigation and ARIA attributes

## Getting Started

### Prerequisites

- Node.js (v16 or newer recommended)
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Faithful001/zb-accordion.git
cd zb-accordion
npm install
# or
yarn install
```

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open your browser to [http://localhost:5173](http://localhost:5173) to view the app.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## Project Structure

- `src/` — Main source code
  - `App.tsx` — Main app component
  - `contexts/useThemeContext.tsx` — Theme context and provider
  - `data/faq-data.ts` — FAQ items
  - `utils/local-storage.util.ts` — LocalStorage helper
  - `assets/` — Static assets (icons, images)
- `public/` — Static files

## Customization

- Add or edit FAQ items in `src/data/faq-data.ts`.
- Update styles in `src/App.css` or `src/index.css`.
- Replace icons in `public/assets/icons/` as needed.

## License

MIT
