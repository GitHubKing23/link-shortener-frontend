# Link Shortener Frontend

This repository contains the React frontend for the link shortener application. The project uses **Vite** for bundling and **Tailwind CSS** for styling.

## Features

- **Shortener Form** – main page that allows users to create shortened URLs (`src/ShortenerForm.jsx`).
- **Admin Dashboard** – protected page displaying link analytics and a click trends graph (`src/pages/AdminDashboard.jsx`).
- **Admin Login** – form for authenticating administrators (`src/pages/AdminLogin.jsx`).
- **404 Page** – shown when no route matches (`src/pages/NotFound.jsx`).
- Toast notifications using `react-toastify`.

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
  App.jsx               # Application with routes and toasts
  ShortenerForm.jsx     # Form for creating shortened links
  components/
    PrivateRoute.jsx    # Protects admin routes
  pages/
    AdminLogin.jsx      # Admin login form
    AdminDashboard.jsx  # Dashboard with analytics table and chart
    NotFound.jsx        # 404 fallback page
```

## API Expectations

The Admin Dashboard expects the following endpoints:

- `GET /api/links` – returns an array of links with `originalUrl`, `shortCode`, `clicks` and `createdAt`.
- `GET /api/analytics/trend` – returns click data for the trend graph.
- `POST /api/admin/login` – returns `{ token }` used for authentication.
- `POST /api/shorten` – accepts `{ url }` and returns `{ shortUrl }`.

Ensure the backend is running and accessible for the dashboard and login to work correctly.
