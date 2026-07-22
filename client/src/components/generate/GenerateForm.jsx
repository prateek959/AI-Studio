import { Loader2, Sparkles, Wand2 } from "lucide-react";

const GenerateForm = ({
  topic,
  setTopic,
  generateVideo,
  loading
}) => {

  return (
    <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-2xl">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center">
          <Sparkles />
        </div>

        <div>
          <h2 className="text-3xl font-black">
            AI Video Generator
          </h2>

          <p className="text-slate-400 mt-1">
            Enter a topic or let AI choose automatically.
          </p>
        </div>

      </div>

      {/* TEXTAREA */}

      <div>

        <label className="text-slate-400 text-sm">
          Video Topic
        </label>

        <textarea
          disabled={loading}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Example: Future of Artificial Intelligence"
          className="
          w-full
          mt-3
          min-h-[180px]
          resize-none
          rounded-3xl
          bg-black/30
          border
          border-white/10
          p-6
          outline-none
          focus:border-violet-500
          text-lg
          disabled:opacity-50
          disabled:cursor-not-allowed
          "
        />

      </div>

      {/* BUTTON */}

      <button
        disabled={loading}
        onClick={generateVideo}
        className={`
        mt-8
        w-full
        py-5
        rounded-3xl
        font-bold
        text-lg
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-3

        ${
          loading
            ?
            "bg-slate-700 cursor-not-allowed opacity-70"
            :
            "bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-[1.02] shadow-2xl shadow-violet-500/30"
        }
        `}
      >

        {
          loading
            ?
            <>
              <Loader2 className="animate-spin" />
              Generating Video...
            </>
            :
            <>
              <Wand2 />
              Generate AI Video
            </>
        }

      </button>

      {/* INFO */}

      {
        loading &&
        <p className="text-center text-slate-400 mt-5 text-sm">
          Please wait while AI creates your cinematic video...
        </p>
      }

    </div>
  );
};

export default GenerateForm;