import React from "react";
import Pagination from "../Pagination";
import Loader from "../Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories, getCategory } from "../../query";
import { config } from "../../utils/config.util";
import {
  ENotificationType,
  ICategory,
  ISubCategory,
  ITable,
} from "../../__types__";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleModal } from "../../store/common/common.slice";
import { createCategory, removeCategory, updateCategory } from "../../mutation";
import { notify } from "../../utils/helper.util";
import Modal from "../Modal";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { clean } from "../../store/common.action";

const noThumbErrMessage = "Ảnh danh mục không được bỏ trống!";

const CategoryTable: React.FC<ITable> = ({ title }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const commonState = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const methods = useForm();

  const [modalType, setModalType] = React.useState<string>("");

  const queryParams = new URLSearchParams(search);
  const page = Number(queryParams.get("page")) || config.pagination.PAGE;
  const limit = Number(queryParams.get("limit")) || config.pagination.LIMIT;

  const { data, isLoading } = useQuery({
    queryKey: ["categories", { page, limit }],
    queryFn: () => getCategories(page, limit),
  });
  const dataTotal = data && data.totalCategory;

  // delete
  const { mutate } = useMutation(removeCategory, {
    onSuccess: (res) => {
      if (!res.success)
        notify(ENotificationType.error, "Xảy ra lỗi! Không thể xoá danh mục!");
      else {
        queryClient.invalidateQueries({
          queryKey: ["categories", { page, limit }],
        });
        notify(ENotificationType.success, "Xoá danh mục thành công!");
      }
    },
  });

  const closeModal = () => {
    methods.reset();
    dispatch(clean());
  };

  const ModalBody = () => (
    <>
      <p className="text-meta-1 italic">
        Các danh mục con và sản phẩm thuộc danh mục này sẽ bị xoá!
      </p>
      <p>Bạn vẫn muốn xoá danh mục này?</p>
    </>
  );
  const ModalFooter = () => (
    <>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-[#DDDDDD] text-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#B6B6B6] hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={closeModal}
      >
        Huỷ
      </button>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={() => {
          mutate(commonState.modalId);
          closeModal();
        }}
      >
        Xác nhận
      </button>
    </>
  );

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="space-y-10 mb-6">
        <div className="w-full inline-flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
          <div className="inline-flex items-center gap-4">
            <button
              type="button"
              className="text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55"
              onClick={() => {
                setModalType("create");
                dispatch(toggleModal({ id: 0, isOpen: true }));
              }}
            >
              Tạo danh mục chính
              <svg
                className="w-4 h-4 ml-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-7 border-stroke py-4 dark:border-strokedark sm:grid-cols-7">
          <div className="col-span-1">
            <h5 className="text-sm font-bold xsm:text-base">Hình ảnh</h5>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm font-bold xsm:text-base">Danh mục chính</h5>
          </div>
          <div className="col-span-4">
            <h5 className="text-sm font-bold xsm:text-base">Danh mục phụ</h5>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm font-bold text-center xsm:text-base">
              Hành động
            </h5>
          </div>
        </div>

        {data.categories.length > 0 &&
          data.categories.map((category: ICategory) => (
            <div
              key={category.id}
              className="grid grid-cols-7 border-t border-stroke py-4 dark:border-strokedark sm:grid-cols-7"
            >
              <div className="col-span-1 flex items-center gap-2">
                <img
                  className="w-14 rounded-lg cursor-pointer"
                  src={category.thumbnail}
                  alt="category"
                  onClick={() => navigate(`/category/${category.id}`)}
                />
              </div>
              <div className="col-span-1 flex flex-col gap-2 justify-center">
                <p
                  onClick={() => navigate(`/category/${category.id}`)}
                  className="text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden cursor-pointer"
                >
                  {category.name}
                </p>
              </div>
              <div className="col-span-4 flex items-center">
                <div className="text-xs text-left text-black dark:text-white inline-flex items-center space-x-2">
                  {category.subCategories.map((subCategory: ISubCategory) => (
                    <button
                      key={subCategory.id}
                      type="button"
                      className="bg-[#D7D7D7] px-2.5 py-1.5 rounded-full"
                    >
                      {subCategory.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-span-1 inline-flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalType("update");
                    dispatch(toggleModal({ id: category.id, isOpen: true }));
                  }}
                  className="hover:text-primary"
                >
                  <svg
                    className="fill-current"
                    width={24}
                    height={24}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalType("remove");
                    dispatch(toggleModal({ id: category.id, isOpen: true }));
                  }}
                  className="hover:text-primary"
                >
                  <svg
                    className="fill-current"
                    width={24}
                    height={24}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

        {dataTotal > 0 && (
          <div className="flex justify-center items-center my-4">
            <Pagination page={page} limit={limit} total={dataTotal} />
          </div>
        )}

        {commonState.isOpenModal &&
          modalType === "create" &&
          commonState.modalId === 0 && (
            <FormProvider {...methods}>
              <Modal
                title="Tạo danh mục chính"
                body={
                  <ModalBodyCreate
                    close={closeModal}
                    page={page}
                    limit={limit}
                  />
                }
                isForm
              />
            </FormProvider>
          )}
        {commonState.isOpenModal &&
          modalType === "update" &&
          commonState.modalId > 0 && (
            <FormProvider {...methods}>
              <Modal
                title="Cập nhật danh mục"
                body={
                  <ModalBodyUpdate
                    id={commonState.modalId}
                    close={closeModal}
                    page={page}
                    limit={limit}
                  />
                }
                isForm
              />
            </FormProvider>
          )}
        {commonState.isOpenModal &&
          modalType === "remove" &&
          commonState.modalId > 0 && (
            <Modal
              title="Xoá danh mục"
              body={<ModalBody />}
              footer={<ModalFooter />}
              close={closeModal}
            />
          )}
      </div>
    </>
  );
};

// modal
const ModalBodyCreate: React.FC<{
  close: () => void;
  page: number;
  limit: number;
}> = ({ close, page, limit }) => {
  const queryClient = useQueryClient();
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const [file, setFile] = React.useState<File>();
  const [previewImg, setPreviewImg] = React.useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => setPreviewImg(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const { mutate, isLoading: createCategoryLoading } = useMutation(
    createCategory,
    {
      onSuccess: (res) => {
        if (!res.success) notify(ENotificationType.error, res.message);
        else {
          notify(
            ENotificationType.success,
            "Tạo mới danh mục thành công!",
            "success"
          );
          queryClient.invalidateQueries({
            queryKey: ["categories", { page, limit }],
          });
          close();
        }
      },
    }
  );

  const onCreateCate: SubmitHandler<any> = async (data) => {
    const { name } = data;
    const formD = new FormData();
    formD.append("name", name);
    formD.append("thumbnail", file);
    mutate(formD);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const ok = await trigger();
        if (!ok)
          for (let e in errors)
            return notify(ENotificationType.error, errors[e]?.message);
        if (!file) return notify(ENotificationType.error, noThumbErrMessage);
        handleSubmit(onCreateCate)();
      }}
    >
      <div className="w-full flex flex-col justify-between bg-white dark:bg-form-strokedark p-4 gap-8 leading-normal">
        <div className="inline-flex items-center gap-4">
          <p className="w-1/4 text-sm text-left">
            Tên danh mục <span className="text-meta-1">*</span>
          </p>
          <input
            {...register("name", {
              required: "Tên danh mục không được bỏ trống",
            })}
            type="text"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="inline-flex items-center gap-4">
          <p className="w-1/4 text-sm text-left">
            Hình ảnh <span className="text-meta-1">*</span>
          </p>
          <div className="w-full inline-flex items-center gap-4">
            {previewImg && (
              <img src={previewImg} className="w-16 h-16" alt="preview-thumb" />
            )}
            <label
              htmlFor="create-cate"
              className="px-3 py-1 rounded-lg bg-primary text-white"
            >
              Tải ảnh
              <input
                type="file"
                onChange={handleFileChange}
                id="create-cate"
                className="sr-only"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="mt-10 inline-flex items-center gap-4">
        <button
          type="button"
          onClick={close}
          className="inline-flex w-full justify-center rounded-md bg-[#DDDDDD] text-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#B6B6B6] hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Huỷ
        </button>
        <button
          type="submit"
          disabled={createCategoryLoading}
          className="inline-flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Tạo danh mục
        </button>
      </div>
    </form>
  );
};

const ModalBodyUpdate: React.FC<{
  id: number | string;
  close: () => void;
  page: number;
  limit: number;
}> = ({ id, close, page, limit }) => {
  const queryClient = useQueryClient();
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => setPreviewImg(reader.result);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["category", { id }],
    queryFn: () => getCategory(Number(id)),
  });
  const [file, setFile] = React.useState<File | null>(null);
  const [previewImg, setPreviewImg] = React.useState<string>("");

  React.useEffect(() => {
    if (data) {
      setValue("name", data.name, { shouldDirty: true });
      setValue("thumbnail", data.thumbnail, { shouldDirty: true });
      setPreviewImg(data.thumbnail);
    }
  }, [data]);

  const { mutate, isLoading: updateCategoryLoading } = useMutation(
    updateCategory,
    {
      onSuccess: (res) => {
        if (!res.success) notify(ENotificationType.error, res.message);
        else {
          notify(
            ENotificationType.success,
            "Cập nhật danh mục thành công!",
            "success"
          );
          queryClient.invalidateQueries({
            queryKey: ["categories", { page, limit }],
          });
          close();
        }
      },
    }
  );

  const onUpdateCate: SubmitHandler<any> = async (formData) => {
    const { name, thumbnail } = formData;
    const formD = new FormData();
    formD.append("name", name);
    formD.append("thumbnail", !file ? thumbnail : null);
    formD.append("newThumbnail", file);

    mutate({ id, payload: formD });
  };

  if (isLoading) return <Loader loadInside />;
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const ok = await trigger();
        if (!ok)
          for (let e in errors)
            return notify(ENotificationType.error, errors[e]?.message);
        if (!previewImg && !file)
          return notify(ENotificationType.error, noThumbErrMessage);
        handleSubmit(onUpdateCate)();
      }}
    >
      <div className="w-full flex flex-col justify-between bg-white dark:bg-form-strokedark p-4 gap-8 leading-normal">
        <div className="inline-flex items-center gap-4">
          <p className="w-1/4 text-sm text-left">
            Tên danh mục <span className="text-meta-1">*</span>
          </p>
          <input
            {...register("name", {
              required: "Tên danh mục không được bỏ trống",
              value: data && data.name,
            })}
            type="text"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="inline-flex items-center gap-4">
          <p className="w-1/4 text-sm text-left">
            Hình ảnh <span className="text-meta-1">*</span>
          </p>
          <div className="w-full inline-flex items-center gap-4">
            {previewImg && (
              <img src={previewImg} className="w-16 h-16" alt="preview-thumb" />
            )}
            <label
              htmlFor="create-cate"
              className="px-3 py-1 rounded-lg bg-primary text-white"
            >
              Tải ảnh
              <input
                type="file"
                onChange={handleFileChange}
                id="create-cate"
                className="sr-only"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="mt-10 inline-flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            setPreviewImg("");
            setFile(null);
            close();
          }}
          className="inline-flex w-full justify-center rounded-md bg-[#DDDDDD] text-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#B6B6B6] hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Huỷ
        </button>
        <button
          type="submit"
          disabled={updateCategoryLoading}
          className="inline-flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cập nhật danh mục
        </button>
      </div>
    </form>
  );
};

export default CategoryTable;
