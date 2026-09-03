import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import MeetingMinutes from "./pages/MeetingMinutes";
import Applications from "./pages/Applications";
import CommunityService from "./pages/CommunityService";
import PhotoGallery from "./pages/PhotoGallery";
import Officers from "./pages/Officers";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <ScrollToTop />
      {!isHome && <Navbar variant="solid" />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/meeting-minutes" element={<MeetingMinutes />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/community-service" element={<CommunityService />} />
          <Route path="/photo-gallery" element={<PhotoGallery />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
