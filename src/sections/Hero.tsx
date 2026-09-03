import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import Navbar from "../components/Navbar";
import { siteConfig } from "../data/siteConfig";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

function animateOpacity(el: HTMLElement, from: number, to: number, duration = 500) {
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    el.style.opacity = String(from + (to - from) * t);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fadingOut = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.style.opacity = "0";

    const onCanPlay = () => {
      v.play().catch(() => {});
      animateOpacity(v, 0, 1, 500);
    };
    const onTimeUpdate = () => {
      if (fadingOut.current) return;
      const remaining = v.duration - v.currentTime;
      if (Number.isFinite(remaining) && remaining <= 0.55) {
        fadingOut.current = true;
        const from = parseFloat(v.style.opacity || "1");
        animateOpacity(v, from, 0, 500);
      }
    };
    const onEnded = () => {
      v.style.opacity = "0";
      setTimeout(() => {
        try {
          v.currentTime = 0;
          v.play().catch(() => {});
          animateOpacity(v, 0, 1, 500);
          fadingOut.current = false;
        } catch {
          /* noop */
        }
      }, 100);
    };

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        preload="auto"
        src={VIDEO_URL}
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        style={{ opacity: 0 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 pointer-events-none" />

      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center -translate-y-[6%] sm:-translate-y-[10%]">
        <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-6">
          {siteConfig.school} · Chapter of NJHS
        </p>

        <h1 className="serif text-white tracking-tight text-[3.25rem] leading-[0.95] xs:text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] max-w-5xl">
          Know it, then{" "}
          <em className="serif-italic text-white/85">serve.</em>
        </h1>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-8 max-w-xl px-4">
          Welcome to Lanier NJHS — your hub for chapter meetings, service hours,
          8th-grade applications, and everything in between.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl">
          <Link
            to="/applications"
            className="liquid-glass rounded-full pl-6 pr-2 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-3 group w-full sm:w-auto justify-between sm:justify-start"
          >
            <span className="inline-flex items-center gap-2">
              <GraduationCap size={18} className="text-white/80" />
              Apply — 8th Grade
            </span>
            <span className="bg-white rounded-full p-2.5 text-black transition-transform group-hover:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          </Link>
          <Link
            to="/community-service"
            className="liquid-glass rounded-full px-6 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors w-full sm:w-auto"
          >
            Log Service Hours
          </Link>
        </div>

        <Link
          to="/officers"
          className="mt-6 text-white/60 hover:text-white text-xs sm:text-sm underline underline-offset-4 decoration-white/20 transition-colors"
        >
          Meet the {siteConfig.schoolYear} officers →
        </Link>
      </main>

      <div className="relative z-10 pb-10 sm:pb-12 flex justify-center gap-3">
        <a
          href={siteConfig.links.duesPay}
          target="_blank"
          rel="noreferrer"
          className="liquid-glass rounded-full px-5 py-2.5 text-white/85 hover:text-white hover:bg-white/5 transition-all text-xs sm:text-sm"
        >
          Pay {siteConfig.schoolYear} Dues
        </a>
        <Link
          to="/events"
          className="liquid-glass rounded-full px-5 py-2.5 text-white/85 hover:text-white hover:bg-white/5 transition-all text-xs sm:text-sm"
        >
          Chapter Calendar
        </Link>
      </div>
    </div>
  );
}
