import {
  LayoutDashboard,
  Sparkles,
  History,
  LogOut
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const links = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Generate",
      path: "/generate",
      icon: Sparkles
    },
    {
      title: "History",
      path: "/history",
      icon: History
    }
  ];

  const handleLogout = ()=>{
    logout();
    navigate("/login");
  };

  return (
    <div className="w-[280px] h-screen bg-white/5 border-r border-white/10 backdrop-blur-xl p-6 hidden lg:flex flex-col justify-between">

      <div>

        <h1 className="text-3xl font-black bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
          AI STUDIO
        </h1>

        <div className="mt-12 flex flex-col gap-3">

          {
            links.map((item,index)=>(
              <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                location.pathname === item.path
                ?
                "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-xl shadow-violet-500/20"
                :
                "hover:bg-white/5 text-slate-300"
              }`}
              >

                <item.icon size={22}/>

                <span className="font-medium">
                  {item.title}
                </span>

              </Link>
            ))
          }

        </div>

      </div>

      <button
      onClick={handleLogout}
      className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all duration-300"
      >

        <LogOut size={20}/>

        Logout

      </button>

    </div>
  );
};

export default Sidebar;