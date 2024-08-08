import React, { useContext, useEffect, useState } from "react";
import useApi from "../../utils/useApi";
import { useMutation } from "react-query";
import { json, Navigate, useNavigate } from "react-router-dom";
import TokenContext from "../../store/TokenContext";
import { EyeFilled, EyeInvisibleFilled, LockFilled } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { message } from "antd";
const Login = () => {
  const { postData } = useApi("/login");
  const [showPassword, setShowPassword] = useState(false);

  const Post = useMutation(postData, {
    onError: (error) => {
      if (error.response.status === 401) {
        // Handle 401 error here
        console.log("hello world");
      }
    },
    onSuccess: (e) => {
      if (e.status === 200) {
        login(e.data.data.token);
      }
    },
  });

  const { data: { data = {} } = {}, isLoading: isFetching, error } = Post;
  // console.log(error);
  const { login, token } = useContext(TokenContext);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      enteredEmail: "",
      enteredPassword: "",
    },
  });
  const navigate = useNavigate();

  console.log(errors);

  if (token) {
    return <Navigate to="/dash" />;
  }

  return (
    <>
      <div className="position bg-cover bg-no-repeat min-h-screen !max-h-screen overflow-hidden">
        <div className="w-[90%] mx-auto">
          <div className="relative flex">
            <div className="w-[4rem] h-[6.5rem] z-[999] bg-[#33835C] flex absolute top-0 left-0 flex-col md:py-2 rounded-br-lg rounded-bl-lg">
              <img
                src="../src/assets/najm.png"
                className="w-full h-full"
                draggable="false"
                alt=""
              />
            </div>
          </div>
          <div className="custom overflow-hidden">
            <div className="">
              <img
                src="../src/assets/najm.png"
                className="md:h-[5rem] md:w-[5rem] w-[4rem] h-[3.8rem]"
                draggable="false"
                alt=""
              />
            </div>
            <h2 className="text-black lg:text-4xl md:text-3xl text-xl font-bold border-b border-[#EEEEEE] md:pb-4 pb-0 md:mb-0 mb-0">
              تسجيل الدخول
            </h2>
            <form className="flex flex-col justify-center items-center gap-4 w-full">
              <div className=" flex flex-col gap-2 md:w-[100%] lg:w-5/6 w-full">
                <label className="md:text-lg text-sm mb-1">
                  البريد الالكترونى
                </label>
                <div className="relative flex flex-col items-center justify-center">
                  <input
                    type="email"
                    placeholder="ادخل البريد الالكترونى"
                    name="enteredEmail"
                    {...register("enteredEmail", {
                      required: "هذا الحقل مطلوب",
                    })}
                    className="border outline-[#33835C] placeholder:text-sm lg:placeholder:text-lg bg-[#EEEEEE] p-2 md:py-3 py-2 indent-1 rounded-md w-full cursor-pointer"
                  />
                  <img
                    src="../src/assets/icons/sms.svg"
                    className="absolute left-4 self-center"
                    alt=""
                  />
                </div>

                {errors.enteredEmail && (
                  <p className="text-red-500">{errors.enteredEmail.message}</p>
                )}
              </div>

              {/* </form> */}
              <div className=" flex flex-col gap-2 md:w-[100%] lg:w-5/6 w-full">
                <label className="md:text-lg text-sm mb-1">الرقم السري</label>
                <div className="relative flex flex-col items-center justify-center">
                  <input
                    type={!showPassword ? "password" : "text"}
                    placeholder="ادخل الرقم السري"
                    name="enteredPassword"
                    {...register("enteredPassword", {
                      required: "هذا الحقل مطلوب",
                    })}
                    className="border outline-[#33835C] placeholder:text-sm lg:placeholder:text-lg bg-[#EEEEEE] p-2 md:py-3 py-2 indent-6 rounded-md w-full cursor-pointer"
                  />
                  {/* <img
                  src="../src/assets/icons/lock.svg"
                  className="absolute left-4 self-center"
                  alt=""
                /> */}
                  <LockFilled className="absolute left-4 self-center text-[#33835C]" />
                  {/* <img
                  src="../src/assets/icons/eye.svg"
                 
                  alt=""
                /> */}
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute w-6 right-2 cursor-pointer self-center text-[#33835C]"
                  >
                    {showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                  </div>
                </div>
                {errors.enteredPassword && (
                  <p className="text-red-500 ">
                    {errors.enteredPassword.message}
                  </p>
                )}
              </div>

              <div className="flex lg:gap-12 gap-6 mt-4 items-center justify-center">
                {isFetching ? (
                  <div className="loader"></div>
                ) : (
                  <>
                    {/* <button
                    className="bg-[#33835C] md:p-10 p-5 md:py-2 py-1 md:text-xl text-md text-white rounded-md"
                    onClick={() => navigate("/allAdmins")}
                  >
                    رجوع
                  </button> */}
                    <button
                      className="bg-[#33835C] disabled:cursor-not-allowed md:p-10 p-5 md:py-2 py-1 md:text-xl text-md text-white rounded-md mb-4 md:mb-0"
                      onClick={() => navigate("/allAdmins")}
                      // className="border disabled:cursor-not-allowed border-[#33835C] md:p-10 p-5 md:py-2 py-1 md:text-xl text-md text-green-700 rounded-md"
                      disabled={
                        !watch("enteredEmail") && !watch("enteredPassword")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        Post.mutate([
                          "/authentication/login",
                          {
                            email: watch("enteredEmail"),
                            password: watch("enteredPassword"),
                          },
                        ]);
                      }}
                    >
                      دخول
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
