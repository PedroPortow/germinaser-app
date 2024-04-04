import api from "./api";

export const apiGetUserData = () =>
  api.get("/current_user");
