import { useLocation } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";

const VideoDetails = () => {

  const { state } = useLocation();

  const video = state;

  return (
    <div className="h-screen bg-[#030712] text-white flex overflow-hidden">

      {/* FIXED SIDEBAR */}

      <div className="hidden lg:block h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* CONTENT */}

      <div className="flex-1 h-screen overflow-y-auto">

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

          {/* VIDEO */}

          <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden">

            <video
              controls
              src={video.VideoURL}
              className="w-full max-h-[700px] object-cover bg-black"
            />

          </div>

          {/* DETAILS */}

          <div className="mt-10 space-y-8">

            {/* TITLE */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <h2 className="text-3xl md:text-4xl font-black leading-tight break-words">
                {video.title}
              </h2>

            </div>

            {/* DESCRIPTION */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <h3 className="text-2xl font-bold mb-6">
                Description
              </h3>

              <p className="text-slate-300 leading-relaxed whitespace-pre-line text-lg break-words">
                {video.description}
              </p>

            </div>

            {/* HASHTAGS */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <h3 className="text-2xl font-bold mb-6">
                Hashtags
              </h3>

              <div className="flex flex-wrap gap-4">

                {
                  video.hashtags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-5 py-3 rounded-full bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/20"
                    >
                      {tag}
                    </span>
                  ))
                }

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default VideoDetails;