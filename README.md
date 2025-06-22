# Link Shortener Frontend

This repository contains the React frontend for the link shortener application. The project uses **Vite** for bundling and **Tailwind CSS** for styling.

## Features

- **Shortener Form** – main page that allows users to create shortened URLs (component located at `src/ShortenerForm.jsx`).
- **Admin Dashboard** – displays analytics fetched from `/api/links` in a table. This page is located at `src/pages/AdminDashboard.jsx`.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173/` by default.

3. Lint the project:

   ```bash
   npm run lint
   ```

4. Build for production:

   ```bash
   npm run build
   ```

## Project Structure

```
src/
  App.jsx            # Main application component
  ShortenerForm.jsx  # Form for creating shortened links
  pages/
    AdminDashboard.jsx  # Admin analytics page
```

## Notes

The Admin Dashboard expects a backend API at `/api/links` that returns an array of link objects with the following fields:

- `originalUrl`
- `shortCode`
- `clicks`
- `createdAt`

Ensure the backend is running and accessible for the dashboard to display data correctly.

