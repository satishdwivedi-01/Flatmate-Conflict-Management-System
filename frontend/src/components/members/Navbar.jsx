import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  console.log(user)

  return (
    <nav className="bg-gray-800 px-4 py-3">
      <div className="flex items-center space-x-6 pl-10">
        {user && (
          <NavLink
            to={`/member/${user._id}`}
            className={({ isActive }) =>
              `text-white hover:text-yellow-400 ${isActive ? "underline text-yellow-400" : ""}`
            }
          >
            Dashboard
          </NavLink>
        )}
        {user && (
          <NavLink
            to={`/member/${user._id}/file-complaint`}
            className={({ isActive }) =>
              `text-white hover:text-yellow-400 ${isActive ? "underline text-yellow-400" : ""}`
            }
          >
            File Complaint
          </NavLink>
        )}

        {user && (
          <NavLink
            to={`/member/${user._id}/leaderboard`}
            className={({ isActive }) =>
              `text-white hover:text-yellow-400 ${isActive ? "underline text-yellow-400" : ""}`
            }
          >
            Leaderboard
          </NavLink>

        )}
      </div>
    </nav>
  );
}

