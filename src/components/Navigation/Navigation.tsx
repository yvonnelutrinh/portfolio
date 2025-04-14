import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import ScrollToAnchor from "../ScrollToAnchor/ScrollToAnchor";

function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuSymbol, setMenuSymbol] = useState("...");
  const location = useLocation();
  const pathname = location.pathname;
  const routes = [
    { path: "/", label: "HOME" },
    { path: "/work", label: "WORK" },
    { path: "/about", label: "ABOUT" },
    { path: `${pathname}#contact`, label: "CONTACT" }
  ];

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
        className="fixed top-0 right-0 z-50 flex items-center h-24 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          className="font-mono text-white hover:text-gray-300 transition-colors text-xl leading-none p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={toggleMenu}
          data-cursor-hover
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-7 w-7 text-white hover:text-gray-300" /> : menuSymbol}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.nav
              className="flex flex-col items-center justify-center space-y-8"
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
                    className={`font-display text-5xl md:text-8xl tracking-wider hover:text-gray-400 transition-colors duration-300 ${pathname === route.path ? "text-white" : "text-gray-600"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                  {pathname === route.path && (
                    <motion.div
                      className="absolute -left-4 top-1/2 h-2 w-2 rounded-full bg-white"
                      layoutId="navIndicator"
                    />
                  )}
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HomePageNav() {
  const routes = [
    { path: "/work", label: "WORK →" },
    { path: "/about", label: "ABOUT →" },
    { path: "/#contact", label: "CONTACT →" },
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
                aria-label={route.label.replace("→", "arrow")}
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