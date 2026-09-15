import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { createTeamRequest, getTeamsRequest } from "../api/teamApi";

const Teams = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  const loadTeams = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getTeamsRequest();
      setTeams(data.teams);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCreating(true);
    setError("");
    try {
      await createTeamRequest({ name });
      setName("");
      await loadTeams();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create team");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <h1 className="text-xl font-bold text-gray-800">ProjectSphere</h1>
        <nav className="flex gap-4 text-sm font-medium text-gray-600">
          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/teams" className="text-blue-600">
            Teams
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-2xl p-6">
        {error && (
          <div className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleCreate} className="mb-6 rounded-lg bg-white p-5 shadow">
          <h2 className="mb-3 text-lg font-semibold text-gray-800">Create a team</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Team name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="flex-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={creating}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create"}
            </button>
          </div>
          {user?.role === "student" && (
            <p className="mt-2 text-xs text-gray-500">
              You'll be added as the team leader automatically.
            </p>
          )}
        </form>

        <div className="rounded-lg bg-white shadow">
          <div className="border-b px-5 py-3">
            <h2 className="text-lg font-semibold text-gray-800">Your teams</h2>
          </div>

          {loading ? (
            <p className="p-5 text-gray-500">Loading...</p>
          ) : teams.length === 0 ? (
            <p className="p-5 text-gray-500">No teams yet.</p>
          ) : (
            <ul className="divide-y">
              {teams.map((team) => (
                <li key={team._id} className="px-5 py-4">
                  <p className="font-medium text-gray-800">{team.name}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Leader: {team.leader?.name || "—"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Members: {team.members.map((m) => m.name).join(", ") || "—"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Guides: {team.guides.map((g) => g.name).join(", ") || "None yet"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Teams;