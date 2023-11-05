import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  createCategory,
  updateCategory,
} from "../../mutation/category.mutation";
import { notify } from "../../utils/helper.util";
import { ENotificationType } from "../../__types__";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getCategory } from "../../query";
import { TCommonState } from "../../store/common/common.slice";
import { useAppDispatch } from "../../store";
import { clean } from "../../store/common.action";

interface Props {
  handleThumbnail: (data: React.SetStateAction<File[]>) => void;
  closeModal: () => void;
  commonState: TCommonState;
  images: File[];
}

const CategoryBodyModalUpdate: React.FC<Props> = ({
  handleThumbnail,
  closeModal,
  commonState,
  images,
}) => {
  const dispatch = useAppDispatch();

  const [thumbnailCategory, setThumbnailCategory] = React.useState<string>("");

  const navigate = useNavigate();

  const methods = useForm();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["category", {}],
    queryFn: () => getCategory(Number(commonState.modalId)),
  });

  React.useEffect(() => {
    setThumbnailCategory(data?.thumbnail);
  }, []);

  console.log(data?.name);

  const { mutate, isLoading: updateCategoryLoading } = useMutation(
    updateCategory,
    {
      onSuccess: (res) => {
        if (!res.success)
          notify(ENotificationType.error, res.message, "error", "top-center");
        else {
          notify(
            ENotificationType.success,
            "Cập nhật sản phẩm thành công!",
            "success",
            "top-center"
          );
          methods.reset();
          queryClient.invalidateQueries({
            queryKey: ["categories"],
          });
          navigate("/category");
        }
      },
    }
  );

  const onCreatePost: SubmitHandler<any> = async (data: any) => {
    console.log("DATA NE: ", data);
    const { name } = data;
    const formD = new FormData();
    formD.append("name", name);
    formD.append("id", commonState.modalId.toString());
    formD.append("thumbnail", thumbnailCategory);
    formD.append("newThumbnail", "aaa");
    mutate(formD);
  };

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      handleThumbnail(() => [
        ...acceptedFiles.map((file: File) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });
  const removeImage = (index: number) =>
    handleThumbnail(images.filter((_, ind: number) => ind !== index));

  const removeImageOld = () => setThumbnailCategory("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        methods.handleSubmit(onCreatePost)();
        closeModal();
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="py-8text-2xl font-semibold rounded-lg">
          <div className="w-full sm:inline-flex items-center mb-5">
            <div className="sm:w-[30%] text-start">
              <label className="inline-flex space-x-2 text-black dark:text-white">
                <span>Tên danh mục chính</span>
                <span className="text-meta-1">*</span>
              </label>
            </div>
            <input
              {...methods.register("name", {
                required: "Tên danh mục không được bỏ trống!",
              })}
              type="text"
              placeholder="Tên danh mục chính"
              required={true}
              defaultValue={data?.name}
              className="w-full sm:w-[70%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <br />
          <div className="w-full sm:inline-flex items-center">
            <div className="sm:w-[30%] text-start">
              <label className="inline-flex space-x-2 text-black dark:text-white">
                <span>Hình ảnh</span>
                <span className="text-meta-1">*</span>
              </label>
            </div>
            <div className="inline-flex space-x-4">
              {" "}
              {thumbnailCategory !== "" && (
                <div
                  {...methods.register("thumbnail", {
                    value: thumbnailCategory
                  })}
                  className="relative"
                >
                  <svg
                    className="absolute w-6 h-6 fill-danger -top-3 -right-3 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    onClick={() => removeImageOld()}
                  >
                    <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
                  </svg>
                  <img
                    className="w-20 h-20 object-cover"
                    src={data?.thumbnail}
                    alt="preview-old-image"
                  />
                </div>
              )}
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
        </div>
      </div>
      <div className="p-4 flex justify-center items-center gap-4">
        <button
          type="button"
          disabled={updateCategoryLoading}
          className="inline-flex w-full justify-center rounded-md bg-[#DDDDDD] text-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#B6B6B6] hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => {
            methods.reset();
            closeModal();
          }}
        >
          Huỷ
        </button>
        <button
          type="submit"
          disabled={updateCategoryLoading}
          className="inline-flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Xác nhận
        </button>
      </div>
    </form>
  );
};

export default CategoryBodyModalUpdate;
