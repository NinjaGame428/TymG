# TymG Admin Panel

Admin dashboard for TymG food and grocery ordering platform.

## Prerequisites

- Node.js 16+ 
- npm or yarn

## Installation

1. Navigate to the admin panel directory:
```bash
cd admin-panel/admin
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
# or
yarn install
```

3. Create a `.env` file in the root directory (optional - uses defaults from `src/configs/app-global.js`):
```env
REACT_APP_IS_DEMO=false
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Default Login Credentials

- **Admin/Owner**: `owner@githubit.com` / `githubit`
- **Branch Manager**: `branch1@githubit.com` / `branch1`
- **Delivery**: `delivery@githubit.com` / `delivery`
- **Waiter**: `waiter@githubit.com` / `waiter`

## Configuration

Update the following in `src/configs/app-global.js`:

- `BASE_URL` - Your API endpoint URL
- Firebase configs - If you create a new Firebase project
- `MAP_API_KEY` - Your Google Maps API key

## Build for Production

```bash
npm run build
# or
yarn build
```

This creates a `build` folder with optimized production files.

## Deployment

The admin panel is configured for Vercel deployment. It's already deployed at:
- Production: https://admin-theta-smoky-81.vercel.app

## Tech Stack

- React 17
- Redux Toolkit
- Ant Design
- React Router v6
- Firebase
- Axios

## Troubleshooting

If you encounter peer dependency issues during installation, use:
```bash
npm install --legacy-peer-deps
```
