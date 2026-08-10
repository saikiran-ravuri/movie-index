# 🎬 Movie Index

Every Frame Has A Story. A focused, modern React application that allows users to discover movies, view details, search, sort, filter by genre, and maintain a personal, persistent watchlist.

Developed by **[Ravuri Sai Kiran](https://github.com/saikiran-ravuri)**.

---

## ✨ Features

* **🎥 Home Dashboard**: Features a dynamic hero section and a randomized featured movie banner alongside lists for *Popular*, *Trending this week*, and *Top Rated* movies.
* **🔍 Discover & Search**: Easily search for movies with a debounced search bar or browse through genres with dynamic filters.
* **⚡ Sorting & Pagination**: Sort movies by popularity, rating, and release date, with paginated browsing.
* **📖 Rich Movie Details**: View detailed information about any movie, including runtime, budget, release info, and the cast list.
* **🔖 Persistent Watchlist**: Bookmark movies to a personal watchlist. Data is persistent and stored locally using the browser's `Local Storage`.
* **🎨 Premium UI/UX**: Aesthetic typography (`Cormorant Garamond` and clean modern weights), movie banners, and a responsive layout designed with a cinematic feel.

---

## 🛠️ Technology Stack

* **Core Framework**: [React 19](https://react.dev/)
* **Build Tool**: [Vite](https://vite.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Routing**: [React Router DOM v7](https://reactrouter.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Data Provider**: [The Movie Database (TMDB) API](https://www.themoviedb.org/)
* **Storage**: Browser Local Storage

---

## 📂 Project Structure

```text
src/
├── assets/         # Images, logos, and custom graphics
├── components/     # Reusable UI component blocks (Navbar, Footer, MovieCard, etc.)
├── context/        # Shared state contexts (Watchlist context)
├── hooks/          # Custom React hooks (useWatchlist)
├── pages/          # Page views (Home, Movies, MovieDetails, Watchlist, About, NotFound)
├── routes/         # Routing configurations (React Router)
├── services/       # Service layer (TMDB API fetching logic)
├── styles/         # Global styles
└── utils/          # Helper utilities
```

---

## 🚀 Getting Started

### 📋 Prerequisites

To run this application locally, you will need:
* **Node.js** (v18 or higher recommended)
* **npm** (v9 or higher)
* A **TMDB Access Token** (Read-Access Token). You can get one by creating a free account on [The Movie Database](https://www.themoviedb.org/).

### 💻 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/saikiran-ravuri/movie-index.git
   cd movie-index
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your TMDB Access Token:
   ```env
   VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token_here
   ```
   *(You can copy from `.env.example` as a template)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your console).

---

## 🏗️ Production Build

To build the application for production:

```bash
npm run build
```

This compiles your application and assets into a highly optimized production bundle inside the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

This project is configured to deploy seamlessly to platforms like **Vercel** or **Netlify**.

### Deploying to Vercel

1. Connect your GitHub repository to Vercel.
2. Configure the following settings during import:
   * **Framework Preset**: Vite
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
3. Add your Environment Variable in Vercel project settings:
   * Name: `VITE_TMDB_ACCESS_TOKEN`
   * Value: *[Your TMDB Read-Access Token]*
4. Click **Deploy**.

---

## 📣 Attribution

All movie data and images are fetched and displayed using the [TMDB API](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.
