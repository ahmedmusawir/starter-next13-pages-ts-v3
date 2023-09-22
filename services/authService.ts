import apiClient from "./apiClient";

const authService = {
  async login(email: string, password: string) {
    const response = await apiClient.post("/api/login", {
      identifier: email,
      password,
    });

    const data = response.data;

    if (data.user) {
      return data;
    } else {
      throw new Error("Login failed");
    }
  },

  async logout() {
    await apiClient.post("/api/logout");
  },

  async register(username: string, email: string, password: string) {
    const response = await apiClient.post("/auth/local/register", {
      username,
      email,
      password,
    });
    return response.data;
  },
};

export default authService;
