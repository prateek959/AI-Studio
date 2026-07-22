import { motion } from "framer-motion";

const steps = [
  "Generating Idea...",
  "Writing Script...",
  "Creating Voice...",
  "Generating Scenes...",
  "Rendering Clips...",
  "Finalizing Video..."
];

const GenerationLoader = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-2xl">

      <h2 className="text-3xl font-black mb-10">
        AI Processing
      </h2>

      <div className="space-y-7">

        {
          steps.map((step,index)=>(
            <motion.div
            key={index}
            initial={{opacity:0,x:-50}}
            animate={{opacity:1,x:0}}
            transition={{
              delay:index * 0.5
            }}
            className="flex items-center gap-5"
            >

              <div className="relative">

                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"></div>

                <div className="absolute inset-0 rounded-full bg-violet-500 animate-ping"></div>

              </div>

              <p className="text-lg text-slate-300">
                {step}
              </p>

            </motion.div>
          ))
        }

      </div>

    </div>
  );
};

export default GenerationLoader;