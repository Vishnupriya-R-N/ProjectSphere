import api from "./axios";

// Create a project
export const createProject = async (projectData) => {
  const response = await api.post("/projects", projectData);
  return response.data;
};

// Get all projects
export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

// Get one project
export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

// Update project status
export const updateProjectStatus = async (id, status) => {
  const response = await api.patch(`/projects/${id}/status`, {
    status,
  });

  return response.data;
};