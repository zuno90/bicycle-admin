import React from "react";
import { useDropzone } from "react-dropzone";
import { FormProvider, Message, SubmitHandler, useForm } from "react-hook-form";
import TinyMce from "../../../components/TinyMce";
import { useMutation, useQueries } from "@tanstack/react-query";
import { ENotificationType, ICategory, ISubCategory } from "../../../__types__";
import { getCategories, getSizes } from "../../../query";
import queryString from "query-string";
import Loader from "../../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../../store";
import { notify } from "../../../utils/helper.util";
import { createProduct } from "../../../mutation/product.mutation";
import classNames from "classnames";
import {
  addByIndex,
  removeByIndex,
} from "../../../store/product/product.slice";
import { useNavigate } from "react-router-dom";
import { clean } from "../../../store/common.action";

const ProductVariant = React.lazy(
  () => import("../../../components/product/ProductVariant")
);

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const productState = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const removeImage = (index: number) =>
    setImages(images.filter((_, ind: number) => ind !== index));

  // handle upload & react hook form
  const methods = useForm();
  // handle content
  const handleContent = (content: string) =>
    methods.setValue("detail", content);

  const addVariant = () =>
    dispatch(
      addByIndex({
        type: "variant",
        payload: Math.max(...productState.variantList) + 1,
      })
    );
  const removeVariant = (varIndex: number) => {
    if (productState.variantList.length === 1)
      return notify(ENotificationType.warning, "Không thể xoá!", "warning");
    dispatch(removeByIndex({ type: "variant", payload: varIndex }));
  };

  const onCreatePost: SubmitHandler<any> = async (data) => {
    console.log(data);
    const { productVariants, ...others } = data;
    const formD = new FormData();
    formD.append("name", others.name);
    formD.append("categoryId", others.categoryId);
    formD.append("subCategoryId", others.subCategoryId);
    formD.append("productVariants", JSON.stringify(productVariants));
    formD.append("discount", others.discount);
    formD.append("video", others.video);
    for (let i of images) formD.append("images", i);
    formD.append("detail", others.detail);
    mutate(formD);
  };

  const [categories, sizes] = useQueries({
    queries: [
      { queryKey: ["categories"], queryFn: () => getCategories() },
      { queryKey: ["sizes"], queryFn: () => getSizes() },
    ],
  });
  const subCategories =
    categories.data &&
    categories.data.filter(
      (cate: ICategory) => cate.id === Number(methods.watch("categoryId"))
    )[0]?.subCategories;

  // upload data
  const { mutate, isLoading } = useMutation(createProduct, {
    onSuccess: (res) => {
      if (!res.success)
        notify(ENotificationType.error, res.message, "error", "top-center");
      else {
        notify(
          ENotificationType.success,
          "Tạo mới sản phẩm thành công!",
          "success",
          "top-center"
        );
        navigate("/product");
      }
    },
  });

  if (categories.isLoading || sizes.isLoading) return <Loader />;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const ok = await methods.trigger();

        if (!ok) {
          for (let e in methods.formState.errors) {
            if (e === "productVariants") {
              for (let ee of methods.formState.errors[e] as any)
                for (let eee in ee)
                  return notify(ENotificationType.error, ee[eee].message);
            }
            return notify(
              ENotificationType.error,
              methods.formState.errors[e]?.message as Message
            );
          }
        }
        methods.handleSubmit(onCreatePost)();
      }}
    >
      <h1 className="mb-6 text-xl">Sản phẩm {">"} Thêm sản phẩm</h1>
      <div className="space-y-10">
        <div className="w-full sm:inline-flex items-center">
          <div className="sm:w-[30%]">
            <label className="inline-flex space-x-2 text-black dark:text-white">
              <span>Tên</span>
              <span className="text-meta-1">*</span>
            </label>
          </div>
          <input
            {...methods.register("name", {
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

          <div className="w-full sm:w-[70%] inline-flex justify-between items-center">
            <div className="w-full sm:w-[45%] relative z-20 dark:bg-form-input">
              <select
                className="relative w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                defaultValue=""
                {...methods.register("categoryId", {
                  required: "Danh mục không được bỏ trống!",
                  min: { value: 1, message: "Danh mục không được bỏ trống!" },
                })}
              >
                <option value="" disabled>
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

            <svg
              width="34"
              height="8"
              viewBox="0 0 34 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.3536 4.35355C33.5488 4.15829 33.5488 3.84171 33.3536 3.64645L30.1716 0.464466C29.9763 0.269204 29.6597 0.269204 29.4645 0.464466C29.2692 0.659728 29.2692 0.976311 29.4645 1.17157L32.2929 4L29.4645 6.82843C29.2692 7.02369 29.2692 7.34027 29.4645 7.53553C29.6597 7.7308 29.9763 7.7308 30.1716 7.53553L33.3536 4.35355ZM0 4.5H33V3.5H0V4.5Z"
                fill="#656565"
              />
            </svg>

            <div className="w-full sm:w-[45%] relative z-20 dark:bg-form-input">
              <select
                className="relative w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                defaultValue=""
                {...methods.register("subCategoryId", {
                  required: "Danh mục con không được bỏ trống!",
                  min: {
                    value: 1,
                    message: "Danh mục con không được bỏ trống!",
                  },
                })}
              >
                <option value="" disabled>
                  Chọn danh mục con
                </option>
                {subCategories &&
                  subCategories.length > 0 &&
                  subCategories.map((subCate: ISubCategory) => (
                    <option key={subCate.id} value={subCate.id}>
                      {subCate.name}
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
        </div>

        <div>
          <div className="w-full sm:inline-flex">
            <div className="sm:w-[30%]">
              <label className="inline-flex space-x-2 text-black dark:text-white">
                <span>Thuộc tính</span>
                <span className="text-meta-1">*</span>
              </label>
            </div>
            <div className="w-full sm:w-[70%] text-sm z-20 dark:bg-form-input">
              <FormProvider {...methods}>
                {productState.variantList.map((attribuleIndex, _) => (
                  <React.Suspense key={attribuleIndex} fallback={<Loader />}>
                    <div className="relative w-full">
                      <ProductVariant
                        index={attribuleIndex}
                        sizes={sizes.data}
                      />
                      <button
                        type="button"
                        className="absolute -right-2 -top-2"
                        onClick={() => removeVariant(attribuleIndex)}
                      >
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#FF6055"
                        >
                          <path d="M8.27,3L3,8.27V15.73L8.27,21H15.73L21,15.73V8.27L15.73,3M8.41,7L12,10.59L15.59,7L17,8.41L13.41,12L17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41" />
                        </svg>
                      </button>
                    </div>
                  </React.Suspense>
                ))}
              </FormProvider>
            </div>
          </div>
          <div className="w-full sm:inline-flex items-center">
            <div className="sm:w-[30%]"></div>
            <div className="w-full sm:w-[70%] text-sm z-20 dark:bg-form-input">
              <button
                type="button"
                className="font-bold cursor-pointer"
                onClick={addVariant}
              >
                Thêm thuộc tính +
              </button>
            </div>
          </div>
        </div>

        <div className="w-full sm:inline-flex items-center">
          <div className="sm:w-[30%]">
            <label className="inline-flex space-x-2 text-black dark:text-white">
              <span>% khuyến mãi</span>
            </label>
          </div>
          <div className="w-full sm:w-[25%] inline-flex items-center space-x-2">
            <input
              {...methods.register("discount", {
                min: { value: 0, message: "Giá phải lớn hơn 0" },
              })}
              type="number"
              placeholder="Nhập giá"
              defaultValue="0"
              min={0}
              className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <p>%</p>
          </div>
        </div>

        <div className="w-full sm:inline-flex items-center">
          <div className="sm:w-[30%]">
            <label className="inline-flex space-x-2 text-black dark:text-white">
              <span>Video</span>
              <span className="text-meta-1"></span>
            </label>
          </div>
          <input
            {...methods.register("video")}
            type="text"
            placeholder="Link youtube"
            className="w-full sm:w-[70%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        {methods.watch("video") && (
          <div className="w-full sm:inline-flex items-center">
            <div className="sm:w-[30%]">
              <label className="inline-flex space-x-2 text-black dark:text-white">
                <span>Video preview</span>
                <span className="text-meta-1"></span>
              </label>
            </div>
            <div className="w-full sm:w-[70%]">
              <iframe
                width="100%"
                height="315"
                src={`https://youtube.com/embed/${
                  Object.values(
                    queryString.parse(methods.getValues("video"))
                  )[0]
                }`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        )}

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
          <div className="w-full sm:w-[70%]">
            <TinyMce getContent={handleContent} />
          </div>
        </div>
      </div>

      <div className="w-full mt-6 justify-end inline-flex space-x-8">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-[#B6B6B6] py-2 px-4 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Huỷ
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <svg
            className={classNames("w-4 h-4 mr-3", {
              "animate-spin": isLoading,
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
          Đăng sản phẩm
        </button>
      </div>
    </form>
  );
};

export default CreateProduct;
