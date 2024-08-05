import axios from "axios";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

import TokenContext from "../store/TokenContext";
// export const Axios = axios.create({
//   baseURL: "https://pm.alexondev.net/api",
//   headers: {
//     "Content-Type": "multipart/form-data",
//     Accept: "application/json",
//     Authorization: `Bearer ${
//       localStorage.getItem("token") &&
//       JSON.parse(localStorage.getItem("token")).user.token
//     }`,
//   },
// });

const useApi = () => {
  const { token } = useContext(TokenContext);
  console.log(token);
  const Axios = axios.create({
    baseURL: "https://najm.alexondev.net/api",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  //   const { setAuth, Auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const error = useCallback(async (err) => {
    if (err.response.status === 401) {
      //   errorNotf("Unauthorized");
      // navigate("/login");
      return;
    }
    // errorNotf(err.response.data.message);
    // Optionally re-throw the error if it should be caught elsewhere
    // throw err;
  }, []);

  const postData = async ([endpoint, data]) => {
    // setLoader(true);

    try {
      const response = await Axios.post(endpoint, data);
      return response;
    } catch (err) {
      error(err);
    } finally {
      //   setLoader(false);
    }
  };
  const getData = async (url) => {
    // setLoader(true);

    try {
      const response = await Axios.get(url);
      const data = response.data.data;
      return data;
    } catch (err) {
      error(err);
    } finally {
      //   setLoader(false);
    }
  };

  const deleteData = async (url) => {
    // setLoader(true);

    try {
      const response = await Axios.delete(url);
      const data = response.data.data;
      //   notify("Deleted Successfully");
      return data;
    } catch (err) {
      error(err);
    } finally {
      //   setLoader(false);
    }
  };

  return { postData, getData, deleteData };
};

export default useApi;
