import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/">
          <h1 className="text-3xl font-black bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
            AI STUDIO
          </h1>
        </Link>

        <div className="flex items-center gap-4">

          <Link to="/login">
            <button className="px-5 py-2 rounded-xl border border-violet-500/50 hover:bg-violet-500/20 transition-all duration-300">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-violet-500/30">
              Get Started
            </button>
          </Link>

        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;