import React, { useContext, useEffect, useState } from "react";
import useApi from "../../utils/useApi";
import { useMutation } from "react-query";
import { json, useNavigate } from "react-router-dom";
import TokenContext from "../../store/TokenContext";

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

  const navigate = useNavigate();

  function submitLogin() {
    postData([]);
  }

  return (
    <>
      {/* <form
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
      </form> */}

      <div className="position bg-cover bg-no-repeat h-screen">
        <div className="w-[90%] mx-auto">
          <div className="relative flex h-screen">
            <div className="w-[4.5rem] h-32 bg-[#33835C] flex absolute top-0 left-0 flex-col justify-end text-center py-2 rounded-br-lg rounded-bl-lg">
              <img src="../src/assets/najm.png" draggable="false" alt="" />
            </div>
          </div>
          <div className="custom">
            <h2 className="text-black text-4xl font-bold border-b border-[#EEEEEE] pb-4 mb-6">
              تسجيل الدخول
            </h2>
            <form className="flex flex-col gap-2 md:w-[90%] lg:w-3/4 w-full">
              <label className="text-lg mb-1">البريد الالكترونى</label>
              <div className="relative flex flex-col items-center justify-center">
                <input
                  type="email"
                  placeholder="ادخل البريد الالكترونى"
                  className="border outline-green-700 bg-[#EEEEEE] p-2 py-3 indent-1 rounded-md w-full cursor-pointer"
                  onChange={(e) => setEnteredEmail(e.target.value)}
                  value={enteredEmail}
                />
                <img
                  src="../src/assets/icons/sms.svg"
                  className="absolute left-4 self-center"
                  alt=""
                />
              </div>
            </form>
            <div className="flex flex-col gap-2 md:w-[90%] lg:w-3/4 w-full">
              <label className="text-lg mb-1">الرقم السري</label>
              <div className="relative flex flex-col items-center justify-center">
                <input
                  type="email"
                  placeholder="ادخل الرقم السري"
                  className="border outline-green-700 bg-[#EEEEEE] p-2 py-3 indent-6 rounded-md w-full cursor-pointer"
                  onChange={(e) => setEnteredPassword(e.target.value)}
                  value={enteredPassword}
                />
                <img
                  src="../src/assets/icons/lock.svg"
                  className="absolute left-4 self-center"
                  alt=""
                />
                <img
                  src="../src/assets/icons/eye.svg"
                  className="absolute right-2 self-center"
                  alt=""
                />
              </div>
            </div>
            <div className="flex gap-12 md:mt-14 mt-7 items-center justify-center">
              <button
                className="bg-[#33835C] p-10 py-2 text-xl text-white rounded-md"
                onClick={() => navigate("/allAdmins")}
              >
                رجوع
              </button>
              <button
                className="border border-[#33835C] p-10 py-2 text-xl text-green-700 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  Post.mutate([
                    "/authentication/login",
                    {
                      email: enteredEmail,
                      password: enteredPassword,
                    },
                  ]);
                }}
              >
                دخول
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
