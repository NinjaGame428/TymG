# Firebase Setup Guide

## Firebase CLI Login

To connect to Firebase using CLI, run:

```bash
firebase login
```

This will open a browser window for authentication. After logging in, you can verify the connection:

```bash
firebase projects:list
```

## Project Configuration

The Firebase project is already configured:
- **Project ID**: `foodyman-single`
- Configuration files:
  - `.firebaserc` - Project configuration
  - `firebase.json` - Firebase services configuration
  - `firestore.rules` - Firestore security rules
  - `firestore.indexes.json` - Firestore indexes

## Deploy Firestore Rules and Indexes

After logging in, deploy the Firestore rules and indexes:

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

Or deploy everything:

```bash
firebase deploy
```

## Environment Variables

Make sure your `.env` or `.env.local` file contains all required Firebase configuration:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `NEXT_PUBLIC_FIREBASE_VAPID_KEY`

## Fixed Issues

1. **Duplicate Firebase Initialization**: Fixed duplicate `initializeApp` calls by centralizing initialization in `utils/firebase.ts`
2. **Error Handling**: Added proper error handling for Firestore operations and listeners
3. **Type Safety**: Fixed TypeScript types for Firestore and Storage instances
4. **Firebase CLI Configuration**: Created `.firebaserc` and `firebase.json` for CLI operations
