import { motion } from "framer-motion";
import { Sparkles, Video, Wand2 } from "lucide-react";

const AuthLeft = () => {
  return (
    <div className="p-4 h-screen hidden lg:flex flex-1 relative overflow-hidden items-center justify-center bg-[#0b1120]">

      {/* Glow */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-600 rounded-full blur-[140px] opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500 rounded-full blur-[140px] opacity-20"></div>

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-xl"
      >

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 mb-6">
          <Sparkles size={18} />
          <span className="text-sm">
            AI Video Automation Platform
          </span>
        </div>

        <h1 className="text-6xl font-black leading-tight">
          Generate
          <span className="block bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
            Viral Shorts
          </span>
          With AI
        </h1>

        <p className="mt-8 text-slate-400 text-lg leading-relaxed">
          Create scripts, scenes, voiceovers and cinematic videos
          automatically in seconds.
        </p>

        <div className="mt-12 grid grid-cols-3 gap-5">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl text-center">
            <Video className="mx-auto mb-3" />
            <p className="text-sm">
              AI Clips
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl text-center">
            <Sparkles className="mx-auto mb-3" />
            <p className="text-sm">
              AI Script
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl text-center">
            <Wand2 className="mx-auto mb-3" />
            <p className="text-sm">
              Rendering
            </p>
          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default AuthLeft;