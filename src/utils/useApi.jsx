import axios from "axios";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

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

export const Axios = axios.create({
  baseURL: "https://najm.alexondev.net/api",
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

const useApi = () => {
  //   const { setAuth, Auth } = useContext(AuthContext);

  const navigate = useNavigate();

  //   const { setLoader } = useContext(LoadContext);

  const error = useCallback(async (err) => {
    if (err.response.status === 401) {
      //   errorNotf("Unauthorized");
      navigate("/login");
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

// ${Cookies.get('token') &&JSON.parse(Cookies.get('token')).user.token }

// Axios.interceptors.response.use(
//   (response) => response,
//   (err) => {
//     if (err.response) {
//       // The request was made and the server responded with an error status code
//       error( err.response.data.message);
//     } else if (err.request) {
//       // The request was made but no response was received
//       error( err.response.data.message);
//     } else {
//       // Something happened in setting up the request that triggered an error
//       error( err.response.data.message);
//     }
//   }
// );

// Example usage:
// const todo = await makeRequest('https://jsonplaceholder.typicode.com/todos/1', 'get');
// console.log(todo);
