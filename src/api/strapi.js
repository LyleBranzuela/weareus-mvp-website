import axios from "axios";

// Strapi API for we-are-us MVP
export default axios.create({
  baseURL: "http://54.66.121.53:1337",
});
