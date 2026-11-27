# Pro Shop Dashboard

A modern, responsive e-commerce administration dashboard built with
**React** and **Vite**. It provides store overview, product and category
views, analytics, inventory notifications, profile settings, and a basic
login/signup flow.

## Features

-   Dashboard overview with store summary and inventory health.
-   Product browsing and search using sample data from DummyJSON.
-   Category browsing.
-   Analytics charts and inventory summaries using Recharts.
-   Global search for products, brands, and categories.
-   Low-stock and out-of-stock notifications.
-   Light and dark theme.
-   Profile and settings pages.
-   Login/signup pages and protected dashboard routes.

## Tech Stack

-   React and Vite
-   JavaScript
-   React Router
-   Recharts
-   Lucide React
-   CSS
-   DummyJSON Products API
-   Browser `localStorage` for demonstration preferences, notifications,
    and authentication data

## Getting Started

### Prerequisites

-   Node.js (current LTS recommended)
-   npm

### Installation

1.  Clone the repository:

    ``` bash
    git clone https://github.com/raveendranrajthanan-sketch/Pro-shop-dashboard.git
    ```

2.  Open the project folder:

    ``` bash
    cd Pro-shop-dashboard
    ```

3.  Install dependencies:

    ``` bash
    npm install
    ```

4.  Start the development server:

    ``` bash
    npm run dev
    ```

5.  Open the local URL shown in the terminal. Vite commonly uses
    `http://localhost:5173`.

## Available Scripts

``` bash
npm run dev
npm run build
npm run preview
```

-   `npm run dev` starts the development server.
-   `npm run build` creates a production build.
-   `npm run preview` previews the production build locally.

## Authentication Notice

The current login/signup flow is a **front-end demonstration** that
stores user information and the active session in browser
`localStorage`. It is intended for local learning and demonstration
only.

It is **not production-secure** because passwords are stored in the
browser and local storage can be modified by users. Before using this
application with real accounts, implement backend authentication, secure
password hashing, server-side session or token handling, and
authorization checks.

## API

Product and category sample data are retrieved from the [DummyJSON
API](https://dummyjson.com/). Network access is required for API-powered
data.

## Project Structure

The main application code is organized under `src/`:

``` text
src/
├── components/
│   ├── DashboardLayout
│   ├── Navbar
│   ├── NotificationPanel
│   └── ProtectedRoute
├── context/
│   └── AuthContext
├── pages/
│   ├── Dashboard
│   ├── Products
│   ├── Categories
│   ├── Analytics
│   ├── Profile
│   ├── Settings
│   ├── Login
│   └── Signup
└── services/
    └── api
```

File extensions may be `.jsx` or `.js`, depending on the file.

## Future Improvements

-   Add a backend and production-ready authentication.
-   Connect product and category management to a persistent database.
-   Store user preferences and notifications on the server.
-   Add role-based access control and automated tests.

## Author

**Raveendran Rajthanan**

## License

No license has been specified for this project yet.
