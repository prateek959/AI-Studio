import { motion } from "framer-motion";
import {
  Brain,
  Video,
  AudioLines,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Script Generation",
    desc: "Generate high quality viral scripts instantly."
  },
  {
    icon: Video,
    title: "AI Scene Creation",
    desc: "Convert script into cinematic visual scenes."
  },
  {
    icon: AudioLines,
    title: "AI Voice Over",
    desc: "Create natural voice narration automatically."
  },
  {
    icon: Sparkles,
    title: "Auto Rendering",
    desc: "Merge clips and audio into final short videos."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-28 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <h2 className="text-5xl font-black">
            Powerful AI Workflow
          </h2>

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            Everything you need to generate viral AI short videos
            automatically.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="group bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-violet-500/40 transition-all duration-500 hover:-translate-y-3"
            >

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center mb-6">
                <item.icon />
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {item.title}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {item.desc}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default FeatureSection;