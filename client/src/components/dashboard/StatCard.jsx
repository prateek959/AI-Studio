import { motion } from "framer-motion";

const StatCard = ({icon:Icon,title,value,color}) => {
  return (
    <motion.div
    initial={{opacity:0,y:40}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.7}}
    className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl"
    >

      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color}`}>
        <Icon/>
      </div>

      <h3 className="mt-6 text-slate-400">
        {title}
      </h3>

      <p className="text-4xl font-black mt-2">
        {value}
      </p>

    </motion.div>
  );
};

export default StatCard;