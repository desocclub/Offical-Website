# DESOC WEB

A React Native Web project with Tailwind CSS (NativeWind) support for building cross-platform applications.

## Tech Stack

- **React Native** - Cross-platform mobile development
- **React Native Web** - Web platform support
- **Expo** - Development toolchain
- **NativeWind** - Tailwind CSS for React Native
- **TypeScript** - Type-safe development

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

```bash
# Start development server
npm start

# Run on web browser
npm run web

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Build for Production

```bash
# Build for web
npm run build:web
```

## Project Structure

```
├── App.tsx                 # Main application entry
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   └── screens/            # Screen components
│       ├── HomeScreen.tsx
│       └── index.ts
├── assets/                 # Images and fonts
├── global.css              # Tailwind CSS entry
├── tailwind.config.js      # Tailwind configuration
├── babel.config.js         # Babel configuration
├── metro.config.js         # Metro bundler configuration
└── tsconfig.json           # TypeScript configuration
```

## Using Tailwind CSS

This project uses NativeWind, which allows you to use Tailwind CSS classes in React Native:

```tsx
import { View, Text } from "react-native";

export default function MyComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-500">
        Hello Tailwind!
      </Text>
    </View>
  );
}
```

## Custom Theme

The Tailwind theme is extended with custom colors in `tailwind.config.js`:

- `primary` - #3B82F6 (Blue)
- `secondary` - #10B981 (Green)
- `accent` - #8B5CF6 (Purple)

## License

ISC
