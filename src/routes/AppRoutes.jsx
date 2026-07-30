import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Watchlist from "../pages/Watchlist";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/movie/:id" element={<MovieDetails />} />

      <Route path="/watchlist" element={<Watchlist />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
