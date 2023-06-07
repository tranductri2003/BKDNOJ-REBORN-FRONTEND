import axiosClient from "api/axiosClient";

const getProblemTags = () => {
  return axiosClient.get("/problem-tags/");
};

const problemTagAPI = {
  getProblemTags,
};

export default problemTagAPI;
