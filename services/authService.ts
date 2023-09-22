import apiClient, { setAuthToken } from "./strapiApiClient";
import Cookies from "js-cookie"; // Assuming you're using js-cookie

const authService = {
  async login(email: string, password: string) {
    console.log("email:", email);
    console.log("password:", password);
    console.log("Auth.login is invoked");
    const response = await apiClient.post("/auth/local", {
      identifier: email,
      password,
    });

    console.log(response);
    const data = response.data;

    if (data.jwt) {
      // Store the JWT in a cookie and set it for the axios instance
      Cookies.set("authToken", data.jwt, { secure: true, sameSite: "strict" });
      setAuthToken(data.jwt);
    }

    return data;
  },

  logout() {
    // Remove the JWT from the cookie and axios instance
    Cookies.remove("authToken");
    setAuthToken(null);
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
