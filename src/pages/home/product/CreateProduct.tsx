import React from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import TinyMce from "../../../components/TinyMce";
import { useQueries } from "@tanstack/react-query";
import Loader from "../../../components/Loader";
import { IAttribute, ICategory } from "../../../__types__";
import { getCategories, getColors, getSizes } from "../../../query";

const CreateProduct: React.FC = () => {
  // handle images
  const [images, setImages] = React.useState<File[]>([]);
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setImages((prevFiles: File[]) => [
        ...prevFiles,
        ...acceptedFiles.map((file: File) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const removeImage = (index: number) => {
    setImages(images.filter((_, ind: number) => ind !== index));
  };

  // handle upload & react hook form
  // handle content
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();
  const handleContent = (content: string) => setValue("content", content);

  const [categories, sizes, colors] = useQueries({
    queries: [
      { queryKey: ["categories"], queryFn: () => getCategories() },
      { queryKey: ["sizes"], queryFn: () => getSizes() },
      { queryKey: ["values"], queryFn: () => getColors() },
    ],
  });
  if (categories.isLoading || sizes.isLoading || colors.isLoading)
    return <Loader />;

  const handleCreatePost: SubmitHandler<any> = async (data) => {
    console.log(data, 34);
  };

  console.log(getValues());

  return (
    <form onSubmit={handleSubmit(handleCreatePost)}>
      <h1 className="mb-6 text-xl">Sản phẩm {">"} Thêm sản phẩm</h1>
      <div className="space-y-4">
        <div className="w-full sm:inline-flex items-center">
          <div className="sm:w-[30%]">
            <label className="inline-flex space-x-2 text-black dark:text-white">
              <span>Tên</span>
              <span className="text-meta-1">*</span>
            </label>
          </div>
          <input
            {...register("name", {
              required: "Tên danh mục không được bỏ trống!",
            })}
            type="text"
            placeholder="Tên sản phẩm"
            className="w-full sm:w-[70%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="w-full sm:inline-flex items-center">
          <div className="w-full sm:w-[30%]">
            <label className="inline-flex space-x-2 text-black dark:text-white">
              <span>Danh mục</span>
              <span className="text-meta-1">*</span>
            </label>
          </div>
          <div className="w-full sm:w-[50%] relative z-20 dark:bg-form-input">
            <select
              className="relative w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              defaultValue={0}
              {...register("category", {
                required: "Danh mục không được bỏ trống!",
                min: { value: 1, message: "Danh mục không được bỏ trống!" },
                valueAsNumber: true,
              })}
            >
              <option value={0} disabled>
                Chọn danh mục
              </option>
              {categories.data.length > 0 &&
                categories.data.map((category: ICategory) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill="#637381"
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div className="w-full sm:inline-flex items-center">
          <div className="sm:w-[30%]">
            <label className="inline-flex space-x-2 text-black dark:text-white">
              <span>Size</span>
              <span className="text-meta-1">*</span>
            </label>
          </div>
          <div className="w-full sm:w-[50%] relative z-20 dark:bg-form-input">
            <select
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              defaultValue={0}
              {...register("size", {
                required: "Size không được bỏ trống!",
                min: { value: 1, message: "Size không được bỏ trống!" },
                valueAsNumber: true,
              })}
            >
              <option value={0} disabled>
                Chọn size
              </option>
              {sizes.data.length > 0 &&
                sizes.data.map((size: IAttribute) => (
                  <option key={size.id} value={size.id}>
                    {size.title}
                  </option>
                ))}
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill="#637381"
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div className="w-full sm:inline-flex items-center">
          <div className="sm:w-[30%]">
            <label className="inline-flex space-x-2 text-black dark:text-white">
              <span>Màu</span>
              <span className="text-meta-1">*</span>
            </label>
          </div>
          <div className="w-full sm:w-[50%] relative z-20 dark:bg-form-input">
            <select
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              defaultValue={0}
              {...register("color", {
                required: "Màu không được bỏ trống!",
                min: { value: 1, message: "Màu không được bỏ trống!" },
                valueAsNumber: true,
              })}
            >
              <option value={0} disabled>
                Chọn màu
              </option>
              {colors.data.length > 0 &&
                colors.data.map((color: IAttribute) => (
                  <option key={color.id} value={color.id}>
                    {color.title}
                  </option>
                ))}
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill="#637381"
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div className="w-full sm:inline-flex items-center">
          <div className="sm:w-[30%]">
            <label className="inline-flex space-x-2 text-black dark:text-white">
              <span>Giá gốc</span>
              <span className="text-meta-1">*</span>
            </label>
          </div>
          <div className="w-full sm:w-[25%] inline-flex items-center space-x-2">
            <input
              {...register("originalPrice", {
                required: "Giá gốc không được bỏ trống!",
                min: { value: 1, message: "Giá phải lớn hơn 0" },
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Nhập giá"
              defaultValue={0}
              className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <p>đ</p>
          </div>
        </div>

        <div className="w-full sm:inline-flex items-center">
          <div className="sm:w-[30%]">
            <label className="inline-flex space-x-2 text-black dark:text-white">
              <span>Giá khuyến mãi</span>
            </label>
          </div>
          <div className="w-full sm:w-[25%] inline-flex items-center space-x-2">
            <input
              {...register("promotionPrice", {
                min: { value: 0, message: "Giá phải lớn hơn 0" },
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Nhập giá"
              defaultValue={0}
              className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <p>đ</p>
          </div>
        </div>

        <div className="w-full sm:inline-flex items-center">
          <div className="sm:w-[30%]">
            <label className="inline-flex space-x-2 text-black dark:text-white">
              <span>Tồn kho</span>
            </label>
          </div>
          <div className="w-full sm:w-[35%] inline-flex items-center space-x-2">
            <input
              {...register("inventory", {
                min: { value: 1, message: "Tồn kho phải lớn hơn 0" },
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Nhập tồn kho"
              defaultValue={0}
              className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <p>chiếc</p>
          </div>
        </div>

        <div className="w-full sm:inline-flex">
          <div className="sm:w-[30%]">
            <label className="inline-flex space-x-2 text-black dark:text-white">
              <span>Hình ảnh</span>
              <span className="text-meta-1">*</span>
            </label>
          </div>

          <div className="inline-flex space-x-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <svg
                  className="absolute w-6 h-6 fill-danger -top-3 -right-3 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() => removeImage(index)}
                >
                  <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
                </svg>
                <img
                  className="w-20 h-20 object-cover"
                  src={image?.preview}
                  alt="preview-image"
                />
              </div>
            ))}

            <label
              {...getRootProps({ className: "dropzone" })}
              className="bg-[#D9D9D9] rounded-lg"
            >
              <div className="flex justify-center items-center box-border h-20 w-20 cursor-pointer">
                <svg
                  className="w-10 h-10"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
              </div>
            </label>
            <input {...getInputProps()} />
          </div>
        </div>

        <div className="w-full sm:inline-flex">
          <div className="sm:w-[30%]">
            <label className="inline-flex space-x-2 text-black dark:text-white">
              <span>Mô tả</span>
              <span className="text-meta-1">*</span>
            </label>
          </div>
          <div {...register("content")} className="w-full sm:w-[70%]">
            <TinyMce getContent={handleContent} />
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
            Đăng sản phẩm
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateProduct;
