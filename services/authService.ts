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

  async checkAuthStatus() {
    try {
      const response = await apiClient.get("/api/current-user");
      if (response.status === 200) {
        return response.data;
      }
      throw new Error("Not authenticated");
    } catch (error) {
      console.error("Error checking auth status:", error);
      throw error;
    }
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
