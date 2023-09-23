import axios from "axios";

// const apiUrl = "http://localhost:4000";

// const apiClient = axios.create({
//   baseURL: apiUrl,
// });

// export default apiClient;

const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
});

export default apiClient;
