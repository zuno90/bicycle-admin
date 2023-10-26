import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const CreateVoucher: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const compareDateErr = "Ngày bắt đầu không được lớn hơn ngày kết thúc!";

  const onCreateVoucher: SubmitHandler<any> = async (data) => {
    console.log(data);
    try {
    } catch (error) {}
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onCreateVoucher)}>
      <h1 className="mb-6 text-xl">Khuyến mãi {">"} Tạo mã khuyến mãi</h1>
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
                min: { value: 1, message: "Số tiền giảm giá phải lớn hơn 0" },
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Số tiền giảm giá"
              defaultValue={0}
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
              {...register("startDate", {
                required: "Ngày bắt đầu không được để trống",
                valueAsDate: true,
                validate: (startD) =>
                  startD <= getValues("endDate") || compareDateErr,
              })}
              type="date"
              className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
              {...register("endDate", {
                required: "Ngày kết thúc không được để trống",
                valueAsDate: true,
                validate: (endD) =>
                  endD >= getValues("startDate") || compareDateErr,
              })}
              type="date"
              className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
            className="w-full sm:w-[50%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
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
          className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Tạo mã
        </button>
      </div>
    </form>
  );
};

export default CreateVoucher;
