// src/Portfolio.jsx
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "SimplarLabs",
    desc: "Software development studio where I collaborate on projects",
    imageDark: "/images/simplar.png",
    url: "https://www.simplarlabs.com/"
  },
  {
    id: 2,
    title: "SIED",
    desc: "Institutional platform focused on education, information and digital presence.",
    imageDark: "/images/siedb.png",
    url: "https://siedonline.org/"
  },
  {
    id: 3,
    title: "Clinical Trials Hub",
    desc: "Portal connecting users with clinical trials and research resources worldwide.",
    imageDark: "/images/cthb.png",
    url: "https://www.clinicaltrialshub.org/"
  },
  {
    id: 4,
    title: "Naked House of Swimwear",
    desc: "E-commerce platform offering a curated swimwear catalog and seamless checkout.",
    imageDark: "/images/naked.png",
    url: "https://www.nakedhouseofswimwear.com/"
  },
  {
    id: 5,
    title: "Queriéndote",
    desc: "Shopify UX-focused store currently in development, enhancing customer experience.",
    imageDark: "/images/queriendoteb.png",
    url: "https://kvgcxc-v5.myshopify.com/"
  }
];

function Section({ children, id, className = "" }) {
  return (
    <section id={id} className={`px-4 sm:px-8 lg:px-10 py-16 sm:py-20 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

export default function Portfolio() {
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const [index, setIndex] = useState(0);

  const slidesCount = projectsData.length;

  const getCols = () => {
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  // Slider transform
  useEffect(() => {
    function update() {
      const cols = getCols();
      const translate = -(index * (100 / cols));
      if (trackRef.current) trackRef.current.style.transform = `translateX(${translate}%)`;
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [index]);

  // Drag slider
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let startX = 0;
    let startTranslate = 0;
    let dragging = false;

    function getCurrentTranslatePercent() {
      const style = window.getComputedStyle(track);
      let matrix;
      try { matrix = new DOMMatrixReadOnly(style.transform || "none"); } 
      catch { matrix = { m41: 0 }; }
      const parentWidth = track.parentElement.offsetWidth || 1;
      const px = matrix.m41 || 0;
      return (px / parentWidth) * 100;
    }

    function onPointerDown(e) {
      dragging = true;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startTranslate = getCurrentTranslatePercent();
      track.style.transition = "none";
    }

    function onPointerMove(e) {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const dx = x - startX;
      const parentWidth = track.parentElement.offsetWidth || 1;
      const dxPercent = (dx / parentWidth) * 100;
      track.style.transform = `translateX(${startTranslate + dxPercent}%)`;
    }

    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const dx = endX - startX;
      const parentWidth = track.parentElement.offsetWidth || 1;
      const dxPercent = (dx / parentWidth) * 100;
      const threshold = 12;

      const cols = getCols();
      let newIndex = index;
      if (dxPercent < -threshold) newIndex = Math.min(index + 1, slidesCount - cols);
      else if (dxPercent > threshold) newIndex = Math.max(index - 1, 0);

      setIndex(newIndex);
      track.style.transition = "transform 400ms cubic-bezier(.22,.9,.3,1)";
    }

    const parent = track.parentElement;
    parent.addEventListener("touchstart", onPointerDown, { passive: true });
    parent.addEventListener("touchmove", onPointerMove, { passive: true });
    parent.addEventListener("touchend", onPointerUp);
    parent.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      parent.removeEventListener("touchstart", onPointerDown);
      parent.removeEventListener("touchmove", onPointerMove);
      parent.removeEventListener("touchend", onPointerUp);
      parent.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [index, slidesCount]);

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    function onMove(e) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen" style={{ fontFamily: "'Neue Montreal', Inter, system-ui, -apple-system" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap');

        /* HERO */
        .hero-title { font-size: 4rem; line-height: 1.1; }
        @media (min-width: 640px) { .hero-title { font-size: 5.5rem; } }
        @media (min-width: 1024px) { .hero-title { font-size: 7rem; } }
        @media (min-width: 1280px) { .hero-title { font-size: 8rem; } }

        /* SLIDES */
        .slide { min-width: 100%; }
        @media (min-width: 768px) { .slide { min-width: 50%; } }
        @media (min-width: 1280px) { .slide { min-width: 33.3333%; } }

        .track { will-change: transform; }
        .thin { font-weight: 300; letter-spacing: -0.02em; }

        @media (hover: hover) { body { cursor: none; } }
      `}</style>

     {/* NAV */}
<nav className="w-full py-4 px-4 sm:px-8 lg:px-10">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    {/* Logo / Iniciales */}
    <div className="font-display font-heavy text-lg sm:text-xl select-none">RS</div>

    {/* Contact button arriba a la derecha */}
    <div>
      <a href="#contact" className="px-5 py-2 rounded font-medium text-gray-400 border border-gray-600 hover:text-white hover:border-white transition">
        Contact
      </a>
    </div>
  </div>
</nav>


      {/* HERO */}
      <Section id="home">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-title thin leading-tight"
            >
              <span className="block">RODRIGO</span>
              <span className="block font-bold">SANTOS</span>
            </motion.h1>

            <div className="mt-6 text-lg sm:text-xl md:text-2xl max-w-2xl thin text-gray-400 space-y-2">
              <p>AI-powered websites</p>
              <p>SEO & performance optimization</p>
              <p className="font-bold">Shopify · WordPress · Wix</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a href="#projects" className="px-6 py-3 rounded border font-semibold bg-transparent text-white border-white">View Projects</a>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <aside className="lg:col-span-4 mt-10 lg:mt-0">
            <div className="mb-6">
              <div className="uppercase tracking-widest text-xs mb-2 text-gray-400">What I help with</div>
              <div className="space-y-2">
                <div className="text-lg font-bold text-white">SEO & Search Intent</div>
                <div className="text-lg thin text-gray-400">Content structure optimized with AI</div>
                <div className="text-lg font-bold text-white">Conversion-focused UX</div>
              </div>
            </div>

            <div>
              <div className="uppercase tracking-widest text-xs mb-2 text-gray-400">Platforms & Tools</div>
              <div className="flex flex-wrap gap-2">
                {["Shopify","WordPress","Wix","React","AI SEO","Performance","HTML","CSS","JavaScript","TailwindCSS","Git","Node.js"].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: "#0b0b0b", color: "#fff" }}>{t}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about">
        <h3 className="text-3xl sm:text-4xl md:text-5xl mb-4 font-bold text-white">About</h3>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-400 max-w-3xl">
          I help businesses grow online with SEO-focused websites and AI-optimized content.
          I build high-performance websites using Shopify, WordPress, and Wix, combining design precision with practical engineering to deliver fast, accessible, and conversion-ready digital experiences.
        </p>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <h3 className="text-2xl sm:text-3xl md:text-4xl mb-6 font-bold text-white">Recent Work</h3>
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex track transition-transform duration-500 ease-in-out">
            {projectsData.map((p,i) => (
              <motion.article key={p.id} className="slide px-3 sm:px-4 mb-6 sm:mb-0" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05 + i*0.06 }} whileHover={{ scale:1.02 }}>
                <div className="rounded-xl overflow-hidden relative" style={{ background:"#070707", boxShadow:"0 10px 30px rgba(255,255,255,0.02)" }}>
                  <img src={p.imageDark} alt={p.title} className="w-full h-56 sm:h-64 md:h-72 object-contain" loading="lazy"/>
                  <div className="p-4 sm:p-6">
                    <h4 className="text-lg sm:text-xl font-bold text-white">{p.title}</h4>
                    <p className="text-sm sm:text-base text-gray-400 mt-2">{p.desc}</p>
                    <div className="mt-3 sm:mt-4">
                      <a href={p.url} target="_blank" rel="noreferrer" className="px-3 py-2 rounded font-semibold bg-white text-black">Visit</a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
        <p className="mt-4 text-sm sm:text-base opacity-60 text-gray-400">Swipe or drag to navigate.</p>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <h3 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-bold text-white">Contact</h3>
        <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-400">Want to work together? Send a message or connect on LinkedIn.</p>

        <form action="https://formsubmit.co/rodrisantos147@gmail.com" method="POST" className="space-y-4 max-w-2xl">
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="https://tusitio.com/thank-you" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-gray-400">Name</span>
              <input name="name" required placeholder="Your name" className="w-full p-3 rounded-lg mt-1 bg-black border border-gray-800 text-white"/>
            </label>
            <label className="block">
              <span className="text-sm text-gray-400">Email</span>
              <input name="email" type="email" required placeholder="Your email" className="w-full p-3 rounded-lg mt-1 bg-black border border-gray-800 text-white"/>
            </label>
          </div>

          <label className="block">
            <span className="text-sm text-gray-400">Message</span>
            <textarea name="message" rows="6" required placeholder="Your message" className="w-full p-3 rounded-lg mt-1 bg-black border border-gray-800 text-white"/>
          </label>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button type="submit" className="px-4 py-2 rounded font-semibold bg-white text-black">Send Message</button>
            <span className="text-gray-400 text-sm sm:text-base">I will reply as soon as possible.</span>
          </div>
        </form>
      </Section>

      {/* FOOTER */}
      <footer className="py-6 text-center border-t border-gray-900 text-gray-400 text-sm sm:text-base">
        © {new Date().getFullYear()} Rodrigo Santos — <a href="https://www.linkedin.com/in/rodrigo-santos-lnkd/" target="_blank" rel="noreferrer" className="text-gray-400">LinkedIn</a>
      </footer>

      {/* Custom cursor */}
      <div ref={cursorRef} aria-hidden style={{
        position:"fixed", left:0, top:0, width:18, height:18, borderRadius:"50%",
        pointerEvents:"none", zIndex:9999, transform:"translate(-50%,-50%) scale(1)",
        transition:"background .12s linear, transform .14s ease, box-shadow .12s linear",
        background:"#fff", mixBlendMode:"difference"
      }}/>
    </div>
  );
}
