# TymG - Food & Grocery Ordering Platform

A modern food and grocery ordering and delivery marketplace website built with Next.js.

## Features

* 🍔 Food ordering and delivery
* 🛒 Grocery marketplace
* 📱 Responsive design
* 🔐 User authentication
* 💳 Payment integration
* 📍 Location-based services
* 🌐 Multi-language support

## Tech Stack

* **Frontend**: Next.js 14, React 18, TypeScript
* **Styling**: Tailwind CSS
* **State Management**: Zustand
* **Maps**: Google Maps API
* **Firebase**: Authentication & Messaging
* **Internationalization**: i18next

## Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Create a `.env.local` file in the root directory with your environment variables:

```env
NEXT_PUBLIC_BASE_URL=your_api_url
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
NEXT_PUBLIC_WEBSITE_URL=your_website_url
# ... other environment variables
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # Reusable components
├── lib/              # Utility libraries
├── services/         # API services
├── types/            # TypeScript type definitions
├── utils/            # Helper functions
└── global-store/     # Zustand stores
```

## Deployment

### Vercel

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add all environment variables from your `.env.local` file
4. Deploy!

## License

Proprietary - All rights reserved
