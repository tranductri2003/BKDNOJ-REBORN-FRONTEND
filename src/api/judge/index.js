import axiosClient from "api/axiosClient";

const getJudges = (params) => {
    return axiosClient.get('/judge/', (params && { params: {...params} }));
}
const getJudgeDetails = ({id}) => {
    return axiosClient.get(`/judge/${id}/`);
}
const adminCreateJudge = ({data}) => {
    return axiosClient.post(`/judge/`, data);
}
const adminEditJudge = ({id, data}) => {
    return axiosClient.patch(`/judge/${id}/`, data);
}
const adminDeleteJudge = ({id}) => {
    return axiosClient.delete(`/judge/${id}/`);
}

const judgeAPI = {
    getJudges,
    getJudgeDetails,
    adminCreateJudge,
    adminEditJudge,
    adminDeleteJudge,
}

export default judgeAPI;
