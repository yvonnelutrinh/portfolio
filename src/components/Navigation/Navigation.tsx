import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

function HeaderNav() {
  const routes = [
    { path: "/", label: "HOME" },
    { path: "/work", label: "WORK" },
    { path: "/about", label: "ABOUT" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.button
        className="fixed top-8 right-8 z-50 p-2"
        onClick={toggleMenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        data-cursor-hover
      >
        {isOpen ? <X className="h-8 w-8 text-white" /> : <Menu className="h-8 w-8 text-white" />}
      </motion.button>

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
                    className={`font-display text-6xl md:text-8xl tracking-wider hover:text-gray-400 transition-colors duration-300 ${pathname === route.path ? "text-white" : "text-gray-600"
                      }`}
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
          {/*route names*/}
          {routes.map((route, index) => (
            <motion.div
              key={route.path}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="relative"
            >
              {/* links */}
              <Link
                to={route.path}
                className="hover:text-gray-400 transition-colors duration-300 text-white-600"
              >
                {route.label}
              </Link>
            </motion.div>
          ))
          }
        </motion.nav>
      </AnimatePresence>
    </>
  );
}

export { HeaderNav, HomePageNav }