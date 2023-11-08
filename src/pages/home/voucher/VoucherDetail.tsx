import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import classNames from "classnames";
import { Message, SubmitHandler, useForm } from "react-hook-form";
import { notify } from "../../../utils/helper.util";
import { ENotificationType, IVoucherInput } from "../../../__types__";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateVoucher } from "../../../mutation";
import { getVoucher } from "../../../query";

const VoucherDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ["voucher"],
    queryFn: () => getVoucher(Number(id)),
    cacheTime: 0,
  });

  console.log(data, 77);

  const {
    register,
    getValues,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const compareStartToNow = "Ngày bắt đầu không được nhỏ hơn hôm nay";
  const compareEndToNow = "Ngày kết thúc không được nhỏ hơn hôm nay";
  const compareDateErr = "Ngày bắt đầu không được lớn hơn ngày kết thúc!";

  if (errors) {
    for (let e in errors)
      notify(ENotificationType.error, errors[e]?.message as Message, `error`);
  }

  const { mutate, isLoading: updateLoading } = useMutation(updateVoucher, {
    onSuccess: (res) => {
      if (!res.success)
        notify(ENotificationType.error, res.message, "error", "top-center");
      else {
        notify(
          ENotificationType.success,
          "Tạo mới voucher thành công!",
          "success",
          "top-center"
        );
        navigate("/voucher", { replace: true });
      }
    },
  });

  const onUpdateVoucher: SubmitHandler<IVoucherInput> = async (data) => {
    console.log("voucher inputs", data);
    mutate(data);
  };

  return (
    <>
      {data && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const ok = await trigger();
            ok &&
              handleSubmit(
                onUpdateVoucher as () => SubmitHandler<IVoucherInput>
              )();
          }}
        >
          <h1 className="mb-6 text-xl">
            Khuyến mãi {">"} Cập nhật mã khuyến mãi
          </h1>
          <div className="h-[70vh] space-y-4">
            <div className="w-full sm:inline-flex items-center">
              <div className="sm:w-[30%]">
                <label className="inline-flex space-x-2 text-black dark:text-white">
                  <span>Tên</span>
                  <span className="text-meta-1">*</span>
                </label>
              </div>
              <input
                {...register("name", {
                  required: "Tên mã khuyến mãi không được bỏ trống!",
                })}
                type="text"
                placeholder="Tên mã khuyến mãi"
                defaultValue={data?.title}
                className="w-full sm:w-[50%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full sm:inline-flex items-center">
              <div className="sm:w-[30%]">
                <label className="inline-flex space-x-2 text-black dark:text-white">
                  <span>Số tiền</span>
                  <span className="text-meta-1">*</span>
                </label>
              </div>
              <div className="w-full sm:w-[52%] inline-flex items-center space-x-2">
                <input
                  {...register("discount", {
                    required: "Số tiền giảm giá không được bỏ trống!",
                    min: {
                      value: 1,
                      message: "Số tiền giảm giá phải lớn hơn 0",
                    },
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="Số tiền giảm giá"
                  defaultValue={data?.value}
                  min={0}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <p>đ</p>
              </div>
            </div>

            <div className="w-full sm:inline-flex items-center">
              <div className="sm:w-[30%]">
                <label className="inline-flex space-x-2 text-black dark:text-white">
                  <span>Ngày bắt đầu</span>
                  <span className="text-meta-1">*</span>
                </label>
              </div>
              <div className="w-full sm:w-[50%] inline-flex items-center space-x-2">
                <input
                  type="datetime-local"
                  className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("startDate", {
                    required: "Ngày bắt đầu không được để trống",
                    valueAsDate: true,
                    validate: {
                      compareNow: (startD) =>
                        startD.getTime() >= new Date().setHours(0, 0, 0, 0) ||
                        compareStartToNow,
                      compareDate: (startD) =>
                        startD <= getValues("endDate") || compareDateErr,
                    },
                  })}
                  defaultValue={new Date(data.createAt)
                    .toISOString()
                    .substring(0, 16)}
                />
              </div>
            </div>

            <div className="w-full sm:inline-flex items-center">
              <div className="sm:w-[30%]">
                <label className="inline-flex space-x-2 text-black dark:text-white">
                  <span>Ngày kết thúc</span>
                  <span className="text-meta-1">*</span>
                </label>
              </div>
              <div className="w-full sm:w-[50%] inline-flex items-center space-x-2">
                <input
                  type="datetime-local"
                  className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("endDate", {
                    required: "Ngày kết thúc không được để trống",
                    valueAsDate: true,
                    validate: {
                      compareNow: (endD) =>
                        endD.getTime() >= new Date().setHours(0, 0, 0, 0) ||
                        compareEndToNow,
                      compareDate: (endD) =>
                        endD >= getValues("startDate") || compareDateErr,
                    },
                  })}
                  defaultValue={new Date(data.expiry)
                    .toISOString()
                    .substring(0, 16)}
                />
              </div>
            </div>

            <div className="w-full sm:inline-flex items-center">
              <div className="sm:w-[30%]">
                <label className="inline-flex space-x-2 text-black dark:text-white">
                  <span>Mã khuyến mãi</span>
                  <span className="text-meta-1">*</span>
                </label>
              </div>
              <input
                {...register("code", {
                  required: "Code không được bỏ trống!",
                })}
                type="text"
                placeholder="Code"
                defaultValue={data?.code}
                className="w-full sm:w-[50%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full sm:inline-flex items-center">
              <div className="sm:w-[30%]">
                <label className="inline-flex space-x-2 text-black dark:text-white">
                  <span>Số lượng</span>
                  <span className="text-meta-1">*</span>
                </label>
              </div>
              <div className="w-full sm:w-[50%] inline-flex items-center space-x-2">
                <input
                  {...register("quantity", {
                    required: "Số lượng voucher không được bỏ trống!",
                    min: {
                      value: 1,
                      message: "Số lượng voucher phải lớn hơn 0",
                    },
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="Số lượng voucher"
                  defaultValue={0}
                  min={0}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="w-full justify-end inline-flex space-x-4">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-[#B6B6B6] py-2 px-4 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Huỷ
            </button>
            <button
              type="submit"
              disabled={isLoading || updateLoading}
              className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <svg
                className={classNames("w-4 h-4 mr-3", {
                  "animate-spin": isLoading || updateLoading,
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
              Cập nhật mã
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default VoucherDetail;
