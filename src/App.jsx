import ScrollToTop from "./components/common/ScrollToTop";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E9]">
      <ScrollToTop />

      <Navbar />

      <div className="flex-1">
        <AppRoutes />
      </div>

      <Footer />
    </div>
  );
}

export default App;
