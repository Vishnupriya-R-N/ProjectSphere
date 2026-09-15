import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <h1 className="text-xl font-bold text-gray-800">ProjectSphere</h1>

        <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
          <Link to="/dashboard" className="text-blue-600">
            Dashboard
          </Link>

          <Link to="/teams" className="hover:text-blue-600">
            Teams
          </Link>

          <Link to="/projects" className="hover:text-blue-600">
            Projects
          </Link>

          <button
            onClick={handleLogout}
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Log out
          </button>
        </nav>
      </header>

      <main className="p-6">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            Welcome, {user?.name}
          </h2>

          <p className="text-gray-600">
            Logged in as{" "}
            <span className="font-medium">{user?.email}</span> ·{" "}
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium uppercase text-blue-700">
              {user?.role}
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;