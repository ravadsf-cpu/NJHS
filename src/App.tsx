import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ImportantEvents from "./pages/ImportantEvents";
import MeetingMinutes from "./pages/MeetingMinutes";
import Applications from "./pages/Applications";
import CommunityService from "./pages/CommunityService";
import PhotoGallery from "./pages/PhotoGallery";
import OfficerInfo from "./pages/OfficerInfo";
import News from "./pages/News";
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
          <Route path="/important-events" element={<ImportantEvents />} />
          <Route path="/meeting-minutes" element={<MeetingMinutes />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/community-service" element={<CommunityService />} />
          <Route path="/photo-gallery" element={<PhotoGallery />} />
          <Route path="/photo-gallery/:albumSlug" element={<PhotoGallery />} />
          <Route path="/officer-info" element={<OfficerInfo />} />
          <Route path="/news" element={<News />} />

          {/* Redirects from previous URLs. */}
          <Route path="/officers" element={<Navigate to="/officer-info" replace />} />
          <Route path="/events" element={<Navigate to="/important-events" replace />} />
          <Route path="/shirts" element={<Navigate to="/#shirts" replace />} />
          <Route path="/contact" element={<Navigate to="/officer-info" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CursorSparkle />
    </div>
  );
}
