import api from "./axios";

export const createTeamRequest = (data) => api.post("/teams", data);
export const getTeamsRequest = () => api.get("/teams");