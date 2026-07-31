import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Watchlist from "../pages/Watchlist";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/movie/:id" element={<MovieDetails />} />

      <Route path="/watchlist" element={<Watchlist />} />

      <Route path="/about" element={<About />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
