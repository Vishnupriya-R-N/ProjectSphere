import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProjectStatus,
} from "../api/projectApi";
import { getTeamsRequest } from "../api/teamApi";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState("");

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response);
    } catch (error) {
      setError("Failed to fetch projects");
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await getTeamsRequest();
      setTeams(response.data.teams);
    } catch (error) {
      setError("Failed to fetch teams");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchProjects();
      await fetchTeams();
      setLoading(false);
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProject({
        title,
        description,
        team,
      });

      setTitle("");
      setDescription("");
      setTeam("");

      await fetchProjects();
    } catch (error) {
      setError("Failed to create project");
    }
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      const updatedProject = await updateProjectStatus(
        projectId,
        newStatus
      );

      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project._id === projectId
            ? {
                ...project,
                status: updatedProject.status,
              }
            : project
        )
      );
    } catch (error) {
      setError("Failed to update project status");
    }
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Projects
      </h1>

      {/* Create Project */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow">

        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Create Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Project Title */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Project Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              rows="3"
              className="w-full rounded border px-3 py-2"
            />
          </div>

          {/* Team */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Team
            </label>

            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="w-full rounded border px-3 py-2"
              required
            >
              <option value="">Select a team</option>

              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Create Project
          </button>

        </form>
      </div>

      {error && (
        <p className="mb-4 text-red-600">
          {error}
        </p>
      )}

      {/* Project List */}
      <div className="space-y-4">

        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="rounded-lg bg-white p-5 shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {project.title}
              </h2>

              <p className="mt-2 text-gray-600">
                {project.description}
              </p>

              {/* Status */}
              <div className="mt-3">
                <label className="mr-2 font-medium">
                  Status:
                </label>

                <select
                  value={project.status}
                  onChange={(e) =>
                    handleStatusChange(
                      project._id,
                      e.target.value
                    )
                  }
                  className="rounded border px-3 py-1"
                >
                  <option value="proposed">
                    Proposed
                  </option>

                  <option value="in-progress">
                    In Progress
                  </option>

                  <option value="review">
                    Review
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>
              </div>

              {/* Team */}
              <p className="mt-3">
                <span className="font-medium">Team:</span>{" "}
                {project.team
                  ? project.team.name
                  : "No team"}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Projects;