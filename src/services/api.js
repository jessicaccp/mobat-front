import axios from "axios";

// Create an instance of axios to use the same base URL for all requests
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export default api;
