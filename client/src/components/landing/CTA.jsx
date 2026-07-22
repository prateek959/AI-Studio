import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-28 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 p-16 text-center backdrop-blur-xl">

          <div className="absolute top-0 left-0 w-72 h-72 bg-violet-500 rounded-full blur-[120px] opacity-20"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

          <div className="relative z-10">

            <h2 className="text-5xl font-black leading-tight">
              Start Creating AI Videos Today
            </h2>

            <p className="mt-6 text-slate-300 max-w-2xl mx-auto">
              Generate scripts, scenes, voiceovers and final videos
              automatically with AI.
            </p>

            <Link to="/signup">
              <button className="mt-10 px-10 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 font-semibold hover:scale-105 transition-all duration-300 shadow-2xl shadow-violet-500/30">
                Get Started Now
              </button>
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTA;