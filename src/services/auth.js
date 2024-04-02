import api from "./api";

export const apiPostLogin = (email, password) =>
  api.post("/auth/login", {
    auth: { email, password },
  });
