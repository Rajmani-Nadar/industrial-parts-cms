# Strapi CMS Setup

This project is ready for Strapi integration while staying fully functional in fallback mode when the CMS is unavailable.

## 1. Local environment

Copy the environment file:

```bash
cp .env.example .env.local
```

Then update the values:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token
```

## 2. Create a Strapi project

Install Strapi locally and create a new project:

```bash
npx create-strapi-app@latest my-strapi-app --quickstart
```

Then run the app:

```bash
cd my-strapi-app
npm run develop
```

## 3. Required collection types

Create the following collections in Strapi admin:

- products
- product-categories
- downloads
- articles
- galleries
- industries
- certifications
- testimonials
- company-settings

## 4. Media library

Upload all product images, logos, company imagery, and gallery media to the Strapi Media Library.

For each collection, enable media fields for images and files.

## 5. API token

In Strapi Admin:

1. Open Settings > API Tokens
2. Create a token with read access
3. Paste it into `STRAPI_API_TOKEN`

## 6. Permissions

Make sure the public role or API token has access to the needed collections:

- find
- findOne
- create (if needed)
- update (if needed)

## 7. Local development

Start the frontend:

```bash
npm run dev
```

If `NEXT_PUBLIC_STRAPI_URL` and `STRAPI_API_TOKEN` are configured, the app will load live content from Strapi. If they are missing or Strapi is offline, the app automatically falls back to local static data.

## 8. Deployment

For production deployment, set environment variables in your hosting platform:

```env
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your_production_token
```

This project is ready for Strapi Cloud or any hosted Strapi deployment.
