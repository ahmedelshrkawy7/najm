import React, { useContext, useEffect, useState } from "react";
import useApi from "./src/utils/useApi";
import { useMutation } from "react-query";
import { json, useNavigate } from "react-router-dom";
import TokenContext from "./src/store/TokenContext";

const Login = () => {
  const { postData } = useApi("/login");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const Post = useMutation(postData, {
    onSuccess: (e) => {
      if (e.status === 200) {
        login(e.data.data.token);
      }
    },
    onError: ({ message }) => {},
  });

  const { data: { data = {} } = {} } = Post;

  const { login, token } = useContext(TokenContext);

  console.log(token);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        Post.mutate([
          "/authentication/login",
          {
            email: enteredEmail,
            password: enteredPassword,
          },
        ]);

        console.log(data.data);
      }}
      className="mt-20 flex flex-col items-center justify-center h-screen w-full"
    >
      <span>Login</span>
      <input
        onChange={(e) => setEnteredEmail(e.target.value)}
        value={enteredEmail}
        className="p-2 mt-4"
        type="text"
        placeholder="البريد الالكترونى"
      />
      <input
        onChange={(e) => setEnteredPassword(e.target.value)}
        value={enteredPassword}
        className="p-2 mt-4"
        type="text"
        placeholder="كلمة المرور"
      />
      <button
        className="cursor-pointer w-24 h-24 bg-green-500 mt-4 p-4"
        type="submit"
      >
        {" "}
        Login
      </button>
    </form>
  );
};

export default Login;
