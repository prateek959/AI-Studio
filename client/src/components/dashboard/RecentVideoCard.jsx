import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentVideoCard = ({ video }) => {

  const navigate = useNavigate();

  const openVideo = () => {
    navigate(`/video/${video._id}`, {
      state: video
    });
  };

  return (
    <div
      onClick={openVideo}
      className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
    >

      <div className="relative">

        <video
          src={video.VideoURL}
          className="w-full h-[240px] object-cover"
        />

        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">

          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
            <Play />
          </div>

        </div>

      </div>

      <div className="p-6">

        <h2 className="text-xl font-bold line-clamp-2 break-words">
          {video.title}
        </h2>

        <p className="text-slate-400 mt-3 line-clamp-3">
          {video.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">

          {
            video.hashtags?.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm"
              >
                {tag}
              </span>
            ))
          }

        </div>

      </div>

    </div>
  );
};

export default RecentVideoCard;