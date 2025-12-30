# TymG - Food & Grocery Ordering Platform

A modern food and grocery ordering and delivery marketplace website built with Next.js.

## Features

- 🍔 Food ordering and delivery
- 🛒 Grocery marketplace
- 📱 Responsive design
- 🔐 User authentication
- 💳 Payment integration
- 📍 Location-based services
- 🌐 Multi-language support

## Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: SCSS Modules, Material-UI
- **State Management**: Redux Toolkit
- **Maps**: Google Maps API
- **Firebase**: Authentication & Messaging

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the web directory:
```bash
cd web/web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in `web/web/` directory with your environment variables (see `.env.example`)

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:8000](http://localhost:8000) in your browser

## Project Structure

```
├── web/web/          # Next.js frontend application
├── admin-panel/     # Admin panel application
├── backend/         # Backend API
└── customer-app/    # Mobile customer app
```

## Deployment

### Vercel

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Set the **Root Directory** to `web/web`
4. Add all environment variables from your `.env` file
5. Deploy!

## License

Proprietary - All rights reserved

