# Industrial B2B Website - Project Structure

This is a Next.js 15 industrial automation B2B website built with React 19, TypeScript, Tailwind CSS, Framer Motion, and modern best practices.

## 📁 Project Structure

```
industrial-parts/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with Navbar, Footer, Providers
│   │   ├── page.tsx           # Home page placeholder
│   │   └── globals.css        # Global styles with CSS variables
│   │
│   ├── components/            # Reusable React components
│   │   ├── navbar/
│   │   │   └── Navbar.tsx     # Sticky transparent navbar with mega menu
│   │   ├── footer/
│   │   │   └── Footer.tsx     # Premium enterprise footer
│   │   └── index.ts           # Component barrel exports
│   │
│   ├── providers/             # App providers and context
│   │   └── index.tsx          # Framer Motion and theme providers
│   │
│   ├── constants/             # Application constants
│   │   ├── colors.ts          # Color palette (Navy, Steel Gray, Orange)
│   │   ├── navigation.ts      # Navigation structure and mega menu
│   │   ├── products.ts        # Product data structure
│   │   └── index.ts           # Constants barrel exports
│   │
│   ├── lib/                   # Utility functions and helpers
│   │   ├── utils.ts           # Common utilities (cn, debounce, throttle, etc.)
│   │   ├── seo.ts             # SEO and metadata utilities
│   │   └── api.ts             # API client with error handling
│   │
│   └── types/                 # TypeScript type definitions
│       └── index.ts           # Global types and interfaces
│
├── public/                    # Static assets
│   ├── favicon.ico           # Website favicon
│   ├── site.webmanifest      # PWA manifest
│   └── robots.txt            # SEO robots configuration
│
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
├── postcss.config.mjs        # PostCSS configuration
├── .env.example              # Environment variables template
└── package.json              # Dependencies and scripts
```

## 🎨 Color Palette

The website uses a premium enterprise color scheme:

- **Navy** (#003366): Primary brand color
- **Steel Gray** (#4A6FA5): Secondary color for accents
- **Orange** (#FF9800): Accent and call-to-action color
- **White** (#FFFFFF): Background and text
- **Grays**: Neutral colors for UI elements

All colors are defined as CSS variables in `src/app/globals.css` and can be used throughout the application.

## 🔧 Key Technologies

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React version
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful SVG icons
- **Inter & Playfair Display**: Premium Google Fonts

## 📝 Configuration Files

### Global CSS Variables (`src/app/globals.css`)
- Color palette definitions
- Spacing and sizing scale
- Border radius scale
- Transitions and animations
- Box shadows
- Z-index scale
- Font family variables

### Tailwind Configuration (`tailwind.config.ts`)
- Custom color scheme
- Font family customization
- Animation definitions
- Extended spacing scale
- Custom box shadows
- Z-index scale
- Container queries support

### Next.js Configuration (`next.config.ts`)
- Image optimization
- Performance optimizations
- Build configuration

## 🧩 Components

### Navbar (`src/components/navbar/Navbar.tsx`)
**Features:**
- Sticky navigation bar with scroll detection
- Transparent background that becomes opaque on scroll
- Mega menu placeholders for Products and Solutions
- Mobile hamburger menu with smooth animations
- Responsive design (desktop and mobile)
- CTA button with hover effects
- Framer Motion animations

**Usage:**
```tsx
import { Navbar } from "@/components";

// Already included in root layout
```

### Footer (`src/components/footer/Footer.tsx`)
**Features:**
- Premium enterprise footer layout
- Multiple link sections (Company, Products, Resources, Legal)
- Social media links
- Newsletter subscription form
- Contact information (email, phone, address)
- Copyright notice
- Smooth scroll animations
- Responsive grid layout

**Usage:**
```tsx
import { Footer } from "@/components";

// Already included in root layout
```

## 📦 Constants & Data

### Colors (`src/constants/colors.ts`)
Complete color palette with shade variations (50-900) for:
- Navy
- Steel Gray
- Orange
- Grays
- Status colors (success, warning, error, info)

### Navigation (`src/constants/navigation.ts`)
- Main navigation items
- Mega menu structure
- Footer links
- Social media links
- Navigation types and interfaces

### Products (`src/constants/products.ts`)
- Product data structure with types
- Featured products (placeholder)
- Product categories
- Company statistics
- Specifications and features

## 🛠️ Utilities

### Utils (`src/lib/utils.ts`)
- `cn()`: Merge classnames using clsx and tailwind-merge
- `formatDate()`: Format dates to readable strings
- `formatPrice()`: Format numbers as currency
- `truncateText()`: Truncate text with ellipsis
- `debounce()`: Performance optimization
- `throttle()`: Performance optimization
- `isElementInViewport()`: Viewport detection
- `generateId()`: Generate unique IDs

### SEO (`src/lib/seo.ts`)
- `generatePageMetadata()`: Create page metadata
- `generateStructuredData()`: Generate JSON-LD schema
- `generateBreadcrumbs()`: Create breadcrumb structured data

### API (`src/lib/api.ts`)
- `apiGet()`: Typed GET requests with timeout
- `apiPost()`: Typed POST requests
- `apiPut()`: Typed PUT requests
- `apiDelete()`: Typed DELETE requests
- Error handling and query string builder

## 📋 Home Page Structure

The home page (`src/app/page.tsx`) includes:
- **Hero Section**: Main headline with CTA buttons
- **Stats Section**: Company statistics display
- **Placeholder Sections**: Ready for feature, product, and testimonial sections
- Built with Framer Motion animations
- Responsive design
- Uses custom color palette

## 🎯 Key Features

### TypeScript
- Full type safety across the application
- Custom types for API, UI components, and business logic
- Strict mode enabled

### Performance
- Optimized images with Next.js Image component
- Font optimization with `next/font`
- Code splitting and lazy loading
- CSS variable usage for theme consistency
- Debounce and throttle utilities included

### SEO
- Metadata configuration in root layout
- Open Graph and Twitter cards
- Robots.txt configuration
- Sitemap placeholder
- Structured data utilities
- Canonical URLs ready

### Accessibility
- Semantic HTML
- ARIA attributes on components
- Focus visible styling
- Keyboard navigation support
- Contrast ratios meet WCAG standards

### Mobile Responsive
- Mobile-first design approach
- Hamburger menu on mobile
- Responsive Tailwind breakpoints
- Flexible grid layouts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
cd industrial-parts
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

## 📄 Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

## 🔗 Routing

Current routes:
- `/` - Home page
- `/products` - Products page (to be built)
- `/solutions` - Solutions page (to be built)
- `/resources` - Resources page (to be built)
- `/about` - About page (to be built)
- `/contact` - Contact page (to be built)

## 📚 Next Steps (Phase 2+)

1. **Homepage Sections**
   - Hero section enhancements
   - Features showcase
   - Products grid
   - Testimonials section
   - CTA sections

2. **Product Pages**
   - Product listing
   - Product details
   - Pricing page
   - Comparison tool

3. **Forms & Interactions**
   - Contact form
   - Newsletter signup
   - Product inquiry form
   - Live chat

4. **Integration**
   - API integration
   - Database connection
   - Authentication system
   - Payment processing

## 📞 Support & Customization

The project foundation is production-ready with:
- Scalable component architecture
- Consistent styling through CSS variables
- TypeScript for type safety
- Performance optimizations built-in
- SEO best practices implemented
- Mobile-responsive design
- Smooth animations and transitions

All files are well-documented with comments explaining functionality and usage patterns.
