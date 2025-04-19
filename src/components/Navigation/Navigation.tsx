import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollToAnchor from "../ScrollToAnchor/ScrollToAnchor";
import Terminal, { TerminalLine } from "../Terminal/Terminal";

function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuSymbol, setMenuSymbol] = useState("...");
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const routes = [
    { path: "/", label: "HOME" },
    { path: "/work", label: "WORK" },
    { path: "/about", label: "ABOUT" },
    { path: `${pathname}#contact`, label: "CONTACT" }
  ];

  // Filter out HOME if on home page
  const navOptions = routes.filter(r => !(r.label === "HOME" && pathname === "/"));
  const terminalLines: TerminalLine[] = navOptions.map(opt => ({
    content: 
      <span className="inline-block py-2 text-white text-lg md:text-xl lg:text-2xl font-display tracking-wider hover:text-gray-400 transition-colors duration-300 whitespace-nowrap">
        {opt.label} {opt.label === "CONTACT" ? "↓" : "→"}
      </span>,
    onClick: () => {
      setIsOpen(false);
      navigate(opt.path);
    }
  }));

  // blinking animation icons for menu
  useEffect(() => {
    if (isOpen) return; // don't animate when menu is open
    
    const symbols = [
      "...", "?!", ":|", "[•]", "[]", "+-", "|||",
      "***", "//", "<>", "==", "][", "()", "{}", "##", "~~",
      ":::", "...", "|||", "---", "+++", ">>>", "<<<", "///", "^^^", 
      "--o", "•••", ":::", "---", "::", "|:|", "===", ":.:", "o-o" 
    ];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % symbols.length;
      setMenuSymbol(symbols[index]);
    }, 800);
    
    return () => clearInterval(interval);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <ScrollToAnchor />
      <motion.div
        className="fixed top-0 right-0 z-50 flex items-center h-24 px-8 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Animated menu icon button (left) */}
        <motion.button
          className="text-white hover:text-gray-300 transition-colors text-xl leading-none p-3 min-w-[44px] min-h-[44px] flex items-center justify-center mr-8"
          onClick={toggleMenu}
          data-cursor-hover
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {/* Always show animating icon unless menu is open */}
          {isOpen ? null : (
            <span className="font-mono text-2xl" aria-live="polite">{menuSymbol}</span>
          )}
        </motion.button>
        {/* Header content: name and icon (centered) */}
        <div className="flex-1 flex items-center justify-center">
          <div className="font-mono text-white text-lg tracking-widest flex gap-6">
            <span>YVONNE</span>
            <span>LU</span>
            <span>TRINH</span>
          </div>
        </div>
        <span className="text-white text-xl ml-8">[]</span>
        {/* Nav menu (top right, only when open) */}
        <AnimatePresence>
          {isOpen && (
            <motion.section
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 right-0 w-64 sm:w-80 md:w-96 bg-black/90 rounded-lg shadow-lg z-50"
              aria-modal="true"
              role="dialog"
            >
              <div>
                <button
                  onClick={toggleMenu}
                  className="absolute top-0 right-0 text-gray-400 hover:text-red-400 font-mono text-xl px-3 py-3 focus:outline-none z-10"
                  aria-label="Close navigation terminal"
                  data-cursor-hover
                >
                  :x
                </button>
                <Terminal
                  lines={terminalLines}
                  title="nav.terminal"
                  typewriter={true}
                  animateDelayMs={150}
                  className="border border-white/20"
                />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Gradient fade below header */}
      <div className="pointer-events-none w-full h-12 md:h-16 bg-gradient-to-b from-black to-transparent absolute left-0 top-24 z-40" />
    </>
  );
}

function HomePageNav() {
  const routes = [
    { path: "/work", label: "WORK →" },
    { path: "/about", label: "ABOUT →" },
    { path: "/#contact", label: "CONTACT ↓" },
  ];

  return (
    <>
      <AnimatePresence>
        <motion.nav
          className="grid grid-cols-3 gap-4 mt-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {routes.map((route, index) => (
            <motion.div
              key={route.path}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="relative"
            >
              <Link
                to={route.path}
                className="hover:text-gray-400 transition-colors duration-300 text-white-600 py-2 px-3 inline-block min-w-[44px] min-h-[44px] whitespace-nowrap"
                aria-label={route.label.replace("→", "arrow").replace("↓", "down arrow")}
              >
                {route.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </AnimatePresence>
    </>
  );
}

export { HeaderNav, HomePageNav }