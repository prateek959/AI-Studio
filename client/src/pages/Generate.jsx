import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import GenerateForm from "../components/generate/GenerateForm";
import GenerationLoader from "../components/generate/GenerationLoader";
import ResultCard from "../components/generate/ResultCard";

import api from "../api/axios";
import toast from "react-hot-toast";

const Generate = () => {

  const [topic, setTopic] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  // NEW

  const [processPending, setProcessPending] = useState(false);

  const [checkingProcess, setCheckingProcess] = useState(true);

  // CHECK PROCESS

  const checkProcess = async () => {

    try {

      setCheckingProcess(true);

      const res = await api.get("/video/process");

      // success:true => no pending
      // success:false => pending

      if (res.data.success === false) {

        setProcessPending(true);

      } else {

        setProcessPending(false);
      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to check process status");

    } finally {

      setCheckingProcess(false);
    }
  };

  useEffect(() => {
    checkProcess();
  }, []);

  // PREVENT REFRESH

  useEffect(() => {

    const handleBeforeUnload = (e) => {

      if (loading) {

        e.preventDefault();

        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };

  }, [loading]);

  // GENERATE VIDEO

  const generateVideo = async () => {

    // BLOCK IF PENDING

    if (processPending) {

      return toast.error(
        "Previous video is still processing"
      );
    }

    try {

      setLoading(true);

      setResult(null);

      const res = await api.post("/video/generate", {
        topic
      });

      setResult(res.data);

      toast.success("AI Video Generated");

      // RECHECK PROCESS

      checkProcess();

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Generation Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // LOADING SCREEN

  if (checkingProcess) {

    return (
      <div className="h-screen bg-[#030712] flex items-center justify-center text-white text-2xl">

        Checking AI Process...

      </div>
    );
  }

  return (
    <div className="h-screen bg-[#030712] text-white flex overflow-hidden">

      {/* SIDEBAR */}

      <div
        className={`
        hidden
        lg:block
        h-screen
        sticky
        top-0

        ${
          loading
            ?
            "pointer-events-none opacity-50"
            :
            ""
        }
        `}
      >
        <Sidebar />
      </div>

      {/* CONTENT */}

      <div className="flex-1 h-screen overflow-y-auto">

        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10">

          <Topbar
            title="Generate AI Video"
            subtitle="Turn ideas into cinematic AI generated videos."
          />

          {/* PROCESS WARNING */}

          {
            processPending &&
            <div className="mb-8 bg-red-500/10 border border-red-500/20 text-red-300 rounded-2xl p-5">

              ⚠️ Your previous AI video is still processing.
              Please wait until it completes before generating another video.

            </div>
          }

          {/* LOADING WARNING */}

          {
            loading &&
            <div className="mb-8 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 rounded-2xl p-5">

              ⚠️ AI video generation is in progress.
              Please do not refresh or leave this page.

            </div>
          }

          {/* MAIN GRID */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">

            {/* LEFT */}

            <div className="space-y-8 xl:sticky xl:top-5 self-start">

              <GenerateForm
                topic={topic}
                setTopic={setTopic}
                generateVideo={generateVideo}
                loading={loading || processPending}
              />

              {
                loading &&
                <GenerationLoader />
              }

            </div>

            {/* RIGHT */}

            <div>

              {
                result
                  ?
                  <div className="space-y-8">

                    {/* VIDEO */}

                    <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden">

                      <video
                        controls
                        src={result.VideoURL}
                        className="w-full max-h-[550px] bg-black object-cover"
                      />

                    </div>

                    {/* TITLE */}

                    <ResultCard
                      title="Generated Title"
                      content={result.title}
                    />

                    {/* DESCRIPTION */}

                    <ResultCard
                      title="Generated Description"
                      content={result.description}
                    />

                    {/* HASHTAGS */}

                    <ResultCard
                      title="Generated Hashtags"
                      content={
                        Array.isArray(result.hashtags)
                          ?
                          result.hashtags.join(" ")
                          :
                          result.hashtags
                      }
                    />

                    {/* SCRIPT */}

                    <ResultCard
                      title="Generated Script"
                      content={result.script}
                    />

                  </div>
                  :
                  <div className="bg-white/5 border border-white/10 rounded-[40px] min-h-[600px] flex items-center justify-center p-10">

                    <div className="text-center">

                      <h2 className="text-4xl font-black">
                        AI Generated Results
                      </h2>

                      <p className="text-slate-400 mt-5 max-w-md leading-relaxed">
                        Your generated video and AI content
                        will appear here.
                      </p>

                    </div>

                  </div>
              }

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Generate;