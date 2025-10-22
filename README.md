# orderbill_web

React + Vite frontend for the Bill Management project.

This repository provides a minimal React + Vite setup with Tailwind CSS and an API helper for communicating with the backend.

Repository layout
- index.html
- src/
  - main.jsx — app entry
  - App.jsx — routes configuration
  - index.css, App.css — global styles
  - api/api.js — shared axios instance and API helpers
  - components/ProtectedRoute.jsx — route guard
  - pages/
    - LoginPage.jsx
    - admin/AdminDashboard.jsx
    - user/UserDashboard.jsx

Key conventions
- Files use PascalCase for React components (e.g. LoginPage.jsx, AdminDashboard.jsx).
- API calls use the shared helper functions from [`src/api/api.js`](src/api/api.js) — see [`loginUser`](src/api/api.js).
- Protected routes use [`ProtectedRoute`](src/components/ProtectedRoute.jsx) and redirect to `/login` when unauthorized.
- Routes in [`src/App.jsx`](src/App.jsx) should be wrapped by `ProtectedRoute` with the appropriate role.

Setup
1. Install dependencies
   npm install

2. Start the dev server
   npm run dev

3. Build for production
   npm run build

4. Lint the project
   npm run lint

Environment / Backend
- The API base URL is set in [`src/api/api.js`](src/api/api.js) to `http://127.0.0.1:8081/api/v1`. Update this value if your backend uses a different host/port.

Notes
- Authentication token and role are stored in localStorage with keys `token` and `role`.
- Login uses [`loginUser`](src/api/api.js); successful login navigates to `/admin/dashboard` for admins and `/user/dashboard` for regular users.
- Tailwind is configured in `tailwind.config.js` and PostCSS in `postcss.config.js`.

Files referenced
- [`src/api/api.js`](src/api/api.js) — API helpers (see `loginUser`)
- [`src/components/ProtectedRoute.jsx`](src/components/ProtectedRoute.jsx)
- [`src/App.jsx`](src/App.jsx)
- [`src/pages/LoginPage.jsx`](src/pages/LoginPage.jsx)
