import { useEffect, useState } from "react";
import api from "../api/axios";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import RecentVideoCard from "../components/dashboard/RecentVideoCard";

const History = () => {

  const [videos, setVideos] = useState([]);

  const getVideos = async () => {

    try {

      const res = await api.get("/video/myVideo");

      setVideos(res.data.videos || []);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="h-screen bg-[#030712] text-white flex overflow-hidden">

      {/* FIXED SIDEBAR */}

      <div className="hidden lg:block h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* CONTENT */}

      <div className="flex-1 h-screen overflow-y-auto">

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10">

          <Topbar
            title="Video History"
            subtitle="All your AI generated videos."
          />

          {
            videos.length === 0
              ?
              <div className="bg-white/5 border border-white/10 rounded-[30px] p-10 text-center mt-10">

                <h3 className="text-2xl font-bold">
                  No Videos Found
                </h3>

                <p className="text-slate-400 mt-4">
                  Generate your first AI video.
                </p>

              </div>
              :
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-7 mt-10">

                {
                  videos.map((video, index) => (
                    <RecentVideoCard
                      key={index}
                      video={video}
                    />
                  ))
                }

              </div>
          }

        </div>

      </div>

    </div>
  );
};

export default History;