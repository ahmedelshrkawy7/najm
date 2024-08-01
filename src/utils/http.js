import axios from "axios";
export const fetchData = async (url) => {
  const res = await fetch(url);
  const resData = await res.json();
  return resData;
};

export const sendData = async (url, data) => {
  return axios.post(url, data);
};
