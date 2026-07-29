import { Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Watchlist from "./pages/Watchlist";
import TopRated from "./pages/TopRated";
import About from "./pages/About";

function App() {
  return (
    <div className="min-h-screen bg-[#f8f4ec]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
