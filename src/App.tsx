import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Officers from "./pages/Officers";
import Events from "./pages/Events";
import News from "./pages/News";
import Shirts from "./pages/Shirts";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AlertBanner from "./components/AlertBanner";
import CursorSparkle from "./components/CursorSparkle";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col text-ink">
      <ScrollToTop />
      <AlertBanner />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/shirts" element={<Shirts />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CursorSparkle />
    </div>
  );
}
