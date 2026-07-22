import { motion } from "framer-motion";
import { Sparkles, Video, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600 rounded-full blur-[150px] opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[150px] opacity-20"></div>

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
            <Sparkles size={18} />
            <span className="text-sm">
              AI Powered Short Video Generator
            </span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-black leading-tight">
            Create Viral
            <span className="block bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              AI Shorts
            </span>
            In Seconds
          </h1>

          <p className="mt-8 text-slate-400 text-lg leading-relaxed max-w-xl">
            Turn any topic into cinematic AI generated short videos with
            scripts, scenes, voiceovers, clips, titles, hashtags and final
            rendered videos automatically.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link to="/signup">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 font-semibold hover:scale-105 transition-all duration-300 shadow-2xl shadow-violet-500/30">
                Start Creating
              </button>
            </Link>

            <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >

          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 shadow-2xl shadow-violet-500/20">

            <div className="absolute -top-5 -right-5 bg-violet-600 p-4 rounded-2xl shadow-xl shadow-violet-500/40">
              <Wand2 />
            </div>

            <div className="space-y-6">

              <div className="bg-black/30 rounded-2xl p-5 border border-white/5">
                <p className="text-sm text-slate-400 mb-2">
                  Topic
                </p>
                <h3 className="text-xl font-semibold">
                  Future of Artificial Intelligence
                </h3>
              </div>

              <div className="bg-black/30 rounded-2xl p-5 border border-white/5">
                <p className="text-sm text-slate-400 mb-2">
                  AI Script
                </p>

                <div className="space-y-3">
                  <div className="h-3 rounded-full bg-white/10 w-full"></div>
                  <div className="h-3 rounded-full bg-white/10 w-[90%]"></div>
                  <div className="h-3 rounded-full bg-white/10 w-[70%]"></div>
                </div>

              </div>

              <div className="grid grid-cols-3 gap-4">

                <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4 text-center">
                  <Video className="mx-auto mb-2" />
                  <p className="text-sm">
                    AI Clips
                  </p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 text-center">
                  <Sparkles className="mx-auto mb-2" />
                  <p className="text-sm">
                    Voice AI
                  </p>
                </div>

                <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-4 text-center">
                  <Wand2 className="mx-auto mb-2" />
                  <p className="text-sm">
                    Rendering
                  </p>
                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Hero;