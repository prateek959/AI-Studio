import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatCard from "../components/dashboard/StatCard";

import {
  Video,
  Sparkles,
 History
} from "lucide-react";

import RecentVideoCard from "../components/dashboard/RecentVideoCard";
import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {

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

      {/* MAIN CONTENT */}

      <div className="flex-1 h-screen overflow-y-auto">

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10">

          <Topbar
            title="AI Dashboard"
            subtitle="Manage and generate cinematic AI videos."
          />

          {/* STATS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

            <StatCard
              title="Total Videos"
              value={videos.length}
              icon={Video}
              color="bg-violet-500/20"
            />

            <StatCard
              title="AI Generated"
              value="100%"
              icon={Sparkles}
              color="bg-cyan-500/20"
            />

            <StatCard
              title="History"
              value={videos.length}
              icon={History}
              color="bg-pink-500/20"
            />

          </div>

          {/* RECENT VIDEOS */}

          <div className="mt-16">

            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">

              <h2 className="text-3xl md:text-4xl font-black">
                Recent Videos
              </h2>

              <p className="text-slate-400">
                {videos.length} Videos
              </p>

            </div>

            {
              videos.length === 0
                ?
                <div className="bg-white/5 border border-white/10 rounded-[30px] p-10 text-center">

                  <h3 className="text-2xl font-bold">
                    No Videos Generated
                  </h3>

                  <p className="text-slate-400 mt-4">
                    Your AI generated videos will appear here.
                  </p>

                </div>
                :
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-7">

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

    </div>
  );
};

export default Dashboard;