import React from "react";
import Loader from "../../components/Loader";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { ENotificationType, ILoginInput } from "../../__types__";
import { useMutation, useQuery } from "@tanstack/react-query";
import { login } from "../../mutation/auth.mutation";
import { getCache, notify, setCache } from "../../utils/helper.util";
import { loginAction, setAdmin } from "../../store/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../../utils/config.util";
import { getUserInfo } from "../../query";
import { clean } from "../../store/common.action";

const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>();

  const { isFetching: isFetchingUser, data: userData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(),
    enabled: authState.isAuth,
  });

  const { mutate, isLoading: isLoadingLogin } = useMutation(login, {
    onSuccess: (res) => {
      if (!res.success) {
        dispatch(clean());
        notify(ENotificationType.error, res.message, "error");
      } else {
        setCache("accessToken", res.data.accessToken);
        setCache("refreshToken", res.data.refreshToken);
        dispatch(loginAction(true));
        notify(
          ENotificationType.success,
          "Đăng nhập thành công với quyền admin!",
          "success"
        );
      }
    },
  });

  const onSubmitLogin: SubmitHandler<ILoginInput> = async (data) => {
    const payload = {
      ...data,
      deviceToken: getCache(config.cache.deviceToken),
    };
    mutate(payload);
  };

  authState.isAuth && userData
    ? dispatch(setAdmin(userData))
    : dispatch(setAdmin(null));

  const redirectUrl = location.state?.from?.pathname ?? "/";
  authState.isAuth &&
    authState.user &&
    navigate(redirectUrl, { replace: true });

  if (isLoadingLogin || isFetchingUser) return <Loader />;
  return (
    <section className="w-full h-screen flex justify-center items-center bg-gray-200">
      <div className="w-[80%] sm:w-[50%] lg:max-w-[40%] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-center text-black dark:text-white">
            BICYCLE - Dashboard
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Số điện thoại
              </label>
              <input
                {...register("phoneNumber", {
                  required: "SĐT không được bỏ trống!",
                  validate: (v) => Number(v) >= 0,
                })}
                type="text"
                placeholder="Nhập số điện thoại"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.phoneNumber && (
                <p className="mt-2 text-xs text-meta-1 italic">
                  * {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Mật khẩu
              </label>
              <input
                {...register("password", {
                  required: "Mật khẩu không được bỏ trống!",
                })}
                type="password"
                placeholder="Nhập mật khẩu"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.password && (
                <p className="mt-2 text-xs text-meta-1 italic">
                  * {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoadingLogin ?? isFetchingUser}
              className="flex w-full justify-center items-center rounded bg-primary p-3 font-medium text-gray"
            >
              <svg
                className={classNames("w-4 h-4 mr-3", {
                  "animate-spin": isLoadingLogin ?? isFetchingUser,
                })}
                viewBox="0 0 24 24"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
