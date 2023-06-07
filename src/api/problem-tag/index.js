import axiosClient from "api/axiosClient";

const getProblemTags = () => {
  return axiosClient.get("/problem-tags/");
};

const deleteProblemTag = ({id}) => {
  return axiosClient.delete(`/problem-tags/${id}/`);
};

const problemTagAPI = {
  getProblemTags,
  deleteProblemTag,
};

export default problemTagAPI;
