import axiosClient from "api/axiosClient";

const getProblemTags = () => {
  return axiosClient.get("/problem-tags/");
};

const deleteProblemTag = ({id}) => {
  return axiosClient.delete(`/problem-tags/${id}/`);
};

const getProblemTagDetails = ({id}) => {
  return axiosClient.get(`/problem-tags/${id}/`);
};

const createProblemTag = ({name, descriptions}) => {
  return axiosClient.post(`/problem-tags/`, {
    name, descriptions
  });
}

const editProblemTag = ({id, name, descriptions}) => {
  return axiosClient.put(`/problem-tags/${id}/`, {
    name, descriptions
  });
}

const problemTagAPI = {
  getProblemTags,
  deleteProblemTag,
  getProblemTagDetails,
  createProblemTag,
  editProblemTag
};

export default problemTagAPI;
