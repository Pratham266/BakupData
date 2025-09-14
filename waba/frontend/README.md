# Frontend - Waba Full-Stack App

A modern React frontend built with Vite, TypeScript, Tailwind CSS, shadcn/ui, and Redux Toolkit.

## Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with modern features
- 🔷 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful, accessible UI components
- 🗃️ **Redux Toolkit** - State management with TypeScript support
- 📱 **Responsive Design** - Mobile-first approach

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Redux Toolkit
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 20.19.0 or higher
- npm 10.0.0 or higher

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   │   ├── button.tsx  # Button component
│   │   └── card.tsx    # Card component
│   └── Counter.tsx     # Counter component (Redux example)
├── store/               # Redux store
│   ├── slices/         # Redux slices
│   │   └── counterSlice.ts
│   ├── hooks.ts        # TypeScript Redux hooks
│   └── index.ts        # Store configuration
├── lib/                 # Utility functions
│   └── utils.ts        # Common utilities
├── App.tsx             # Main App component
├── main.tsx            # App entry point
└── index.css           # Global styles with Tailwind
```

## Redux Setup

The project includes a complete Redux Toolkit setup with:

- **Store Configuration**: Centralized state management
- **Counter Slice**: Example slice demonstrating Redux patterns
- **TypeScript Hooks**: Type-safe `useAppDispatch` and `useAppSelector`
- **Modern Patterns**: Using Redux Toolkit's `createSlice` and modern Redux practices

## Component Library

Built with shadcn/ui components that provide:

- **Accessibility**: WCAG compliant components
- **Customization**: Easy to customize with Tailwind CSS
- **TypeScript**: Full type safety
- **Variants**: Multiple component variants (e.g., button styles)

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **CSS Variables**: Custom CSS variables for theming
- **Dark Mode Support**: Built-in dark mode support
- **Responsive Design**: Mobile-first responsive utilities

## Development

### Adding New Components

1. Create your component in `src/components/`
2. Use the existing UI components from `src/components/ui/`
3. Follow the established patterns for props and styling

### Adding New Redux Slices

1. Create a new slice in `src/store/slices/`
2. Add the reducer to `src/store/index.ts`
3. Use the typed hooks from `src/store/hooks.ts`

## Build and Deployment

The project is configured for production builds with:

- **TypeScript Compilation**: Full type checking
- **Bundle Optimization**: Vite's optimized build process
- **Asset Optimization**: Optimized images and static files

## Contributing

1. Follow the established code patterns
2. Use TypeScript for all new code
3. Follow the component structure
4. Ensure proper TypeScript types

## License

This project is part of the Waba full-stack application.
