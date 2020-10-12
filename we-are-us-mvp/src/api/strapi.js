import axios from "axios";

// Mock API for we-are-us MVP
export default axios.create({
  baseURL: "http://localhost:1337",
});
