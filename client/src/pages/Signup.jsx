import { useState } from "react";

import AuthLeft from "../components/auth/AuthLeft";

import { motion } from "framer-motion";

import {
  Link,
  useNavigate
} from "react-router-dom";

import api from "../api/axios";

import toast from "react-hot-toast";

const Signup = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post("/auth/register", formData);

      toast.success(res.data.message);

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Signup Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="h-screen bg-[#030712] text-white flex overflow-hidden">

      {/* FIXED LEFT */}

      <div className="hidden lg:block h-screen sticky top-0">
        <AuthLeft />
      </div>

      {/* RIGHT */}

      <div className="flex-1 h-screen overflow-y-auto">

        <div className="min-h-screen flex items-center justify-center p-6">

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="
            w-full
            max-w-md
            bg-white/5
            border
            border-white/10
            backdrop-blur-2xl
            rounded-[40px]
            p-10
            "
          >

            <h2 className="text-4xl font-black">
              Create Account
            </h2>

            <p className="mt-3 text-slate-400">
              Start generating AI videos today.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >

              {/* USERNAME */}

              <div>

                <label className="text-sm text-slate-400">
                  Username
                </label>

                <input
                  type="text"
                  name="userName"
                  required
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="
                  w-full
                  mt-2
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/30
                  border
                  border-white/10
                  outline-none
                  focus:border-violet-500
                  "
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="text-sm text-slate-400">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="
                  w-full
                  mt-2
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/30
                  border
                  border-white/10
                  outline-none
                  focus:border-violet-500
                  "
                />

              </div>

              {/* PASSWORD */}

              <div>

                <label className="text-sm text-slate-400">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="
                  w-full
                  mt-2
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/30
                  border
                  border-white/10
                  outline-none
                  focus:border-violet-500
                  "
                />

              </div>

              {/* BUTTON */}

              <button
                disabled={loading}
                className="
                w-full
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-violet-600
                to-cyan-500
                font-semibold
                hover:scale-[1.02]
                transition-all
                duration-300
                shadow-xl
                shadow-violet-500/20
                "
              >

                {
                  loading
                    ?
                    "Creating..."
                    :
                    "Create Account"
                }

              </button>

            </form>

            <p className="mt-8 text-center text-slate-400">

              Already have an account?

              <Link
                to="/login"
                className="text-violet-400 ml-2"
              >
                Login
              </Link>

            </p>

          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default Signup;