import axios from "axios";

// Mock API for we-are-us MVP
export default axios.create({
  baseURL: "https://we-are-us-mock-api.s3-ap-southeast-2.amazonaws.com/practitioner.json",
});
