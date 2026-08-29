# Quick Start Guide - Industrial B2B Website

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Code editor (VS Code recommended)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your actual values (optional for development)

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

### Available Commands

```bash
# Development
npm run dev              # Start dev server with hot reload

# Building
npm run build            # Build for production
npm start                # Start production server

# Linting
npm run lint             # Run ESLint

# Type Checking
npm run type-check       # Run TypeScript check
```

## 📁 Project Structure Quick Reference

```
src/
├── app/                 → Next.js pages and layout
├── components/          → React components (Navbar, Footer)
├── constants/           → App constants (colors, navigation, products)
├── lib/                 → Utility functions (utils, seo, api)
├── types/               → TypeScript type definitions
└── providers/           → App providers (Framer Motion)

public/                 → Static assets (favicon, robots.txt, manifest)
```

## 🎨 Using the Color Palette

All colors are available as CSS variables and Tailwind classes:

```tsx
// Using CSS variables
<div style={{ color: COLORS.navy[500] }}>Navy Text</div>

// Or import from constants
import { COLORS } from "@/constants";

// Navy variations: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
const primaryColor = COLORS.navy[500];     // #003366
const accentColor = COLORS.orange[500];    // #FF9800
const secondaryColor = COLORS.steel[500];  // #4A6FA5
```

## 🧩 Creating New Components

### Example: Creating a Button Component

```tsx
// src/components/button/Button.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BaseComponentProps, ButtonVariant, ButtonSize } from "@/types";

interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "font-semibold transition-all rounded-lg";
  
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    secondary: "bg-navy-500 text-white hover:bg-navy-600",
    outline: "border-2 border-navy-500 text-navy-500 hover:bg-navy-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

## 🔌 Using the API Client

```tsx
import { apiGet, apiPost } from "@/lib/api";

// GET request
const products = await apiGet("/products", {
  query: { category: "automation", limit: 10 }
});

// POST request
const result = await apiPost("/contact", {
  name: "John Doe",
  email: "john@example.com",
  message: "Hello!"
});

// With error handling
try {
  const data = await apiGet("/products");
} catch (error) {
  console.error("API Error:", error);
}
```

## 🎬 Working with Framer Motion

```tsx
import { motion } from "framer-motion";

// Simple animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Scroll trigger
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Appears on scroll
</motion.div>

// Hover effects
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

## 🎯 Adding New Pages

1. Create a new folder in `src/app/`
   ```
   src/app/products/page.tsx
   src/app/about/page.tsx
   ```

2. Add layout if needed
   ```tsx
   // src/app/products/layout.tsx
   export default function ProductsLayout({ children }) {
     return <>{children}</>;
   }
   ```

## 🔐 Environment Variables

Required for production:
- `NEXT_PUBLIC_API_URL` - Your API base URL
- `NEXT_PUBLIC_APP_URL` - Your app URL

Optional:
- `NEXT_PUBLIC_GA_ID` - Google Analytics
- `STRIPE_PUBLIC_KEY` - Stripe integration
- `SENDGRID_FROM_EMAIL` - Email service

See `.env.example` for full list.

## 📱 Responsive Design

The project uses Tailwind's responsive prefixes:
- `sm:` - 640px
- `md:` - 768px (recommended for mobile/desktop split)
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text sizing
</div>
```

## 🧪 Development Tips

### Debugging
- Use React DevTools browser extension
- Framer Motion visual debugging available
- TypeScript will catch type errors at compile time

### Performance
- Use `motion.LazyMotion` for animations
- Keep heavy computations out of render
- Use memoization for expensive components
- Optimize images with Next.js `Image` component

### Accessibility
- Always include `alt` text for images
- Use semantic HTML elements
- Test with keyboard navigation
- Check color contrast ratios

## 🚢 Deployment

### Build for production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to other platforms
The project is built with standard Next.js, compatible with:
- Vercel
- Netlify
- AWS
- Docker containers
- Traditional Node.js servers

## 📞 Common Issues

### Port already in use
```bash
npm run dev -- -p 3001  # Use different port
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### TypeScript errors
```bash
npm run build  # Full build with type checking
```

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org)

## 📝 Project Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind styling
- `tsconfig.json` - TypeScript settings
- `postcss.config.mjs` - CSS processing
- `eslint.config.mjs` - Linting rules
- `.env.example` - Environment template

## 💡 Best Practices

1. **Use TypeScript** - Always add types to functions and components
2. **Organize imports** - Use absolute imports with `@/` prefix
3. **Keep components small** - Single responsibility principle
4. **Add comments** - Document non-obvious logic
5. **Test responsive** - Check desktop and mobile views
6. **Optimize images** - Use Next.js Image component
7. **Check accessibility** - Use semantic HTML and ARIA

---

For detailed information, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
