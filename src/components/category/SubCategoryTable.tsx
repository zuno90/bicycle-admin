import React from "react";
import Pagination from "../Pagination";
import Loader from "../Loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { config } from "../../utils/config.util";
import { ENotificationType, ISubCategory, ITable } from "../../__types__";
import {
  getSubCategories,
  getSubCategory,
} from "../../query/subCategory.query";
import { getCategory } from "../../query";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { toggleModal } from "../../store/common/common.slice";
import { clean } from "../../store/common.action";
import { notify } from "../../utils/helper.util";
import Modal from "../Modal";
import {
  createSubCategory,
  removeSubCategory,
  updateSubCategory,
} from "../../mutation";

const noThumbErrMessage = "Ảnh danh mục phụ không được bỏ trống!";

const SubCategoryTable: React.FC<ITable> = ({ title }) => {
  const { id } = useParams();
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

  const category = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(Number(id)),
  });

  const subCategories = useQuery({
    queryKey: ["subCategories", { page, limit }],
    queryFn: () => getSubCategories(page, limit, Number(id)),
    enabled: !category.isLoading && !category.isError && category.isFetched,
  });

  const dataTotal = subCategories.data && subCategories.data.totalSubCategory;

  const closeModal = () => {
    methods.reset();
    dispatch(clean());
  };

  // delete
  const { mutate } = useMutation(removeSubCategory, {
    onSuccess: (res) => {
      if (!res.success)
        notify(
          ENotificationType.error,
          "Xảy ra lỗi! Không thể xoá danh mục con!"
        );
      else {
        queryClient.invalidateQueries({
          queryKey: ["subCategories", { page, limit }],
        });
        notify(ENotificationType.success, "Xoá danh mục con thành công!");
      }
    },
  });
  const ModalBody = () => (
    <>
      <p className="text-meta-1 italic">
        Các sản phẩm thuộc danh mục con này sẽ bị xoá!
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

  if (category.isError || subCategories.isError) navigate(-1);
  if (category.isLoading) return <Loader />;
  return (
    <>
      <div className="space-y-10 mb-4 p-5">
        <div className="w-full inline-flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title} {">"} {category.data?.name}
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
              Tạo danh mục phụ
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
      {subCategories.isRefetching ? (
        <Loader loadInside />
      ) : (
        <div className="rounded-sm dark:border-strokedark dark:bg-boxdark">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Hình ảnh
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Danh mục phụ
                  </th>
                  <th className="py-4 px-4 text-center font-medium text-black dark:text-white">
                    Số lượng sản phẩm
                  </th>
                  <th className="py-4 px-4 text-right font-medium text-black dark:text-white">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {subCategories.data?.subCategories.length > 0 &&
                  subCategories.data?.subCategories.map(
                    (subCategory: ISubCategory) => (
                      <tr key={subCategory.id}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <img
                            className="col-span-1 w-14 rounded-md"
                            src={subCategory.thumbnail}
                            alt="subCategory"
                          />
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden">
                            {subCategory.name}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-xs text-center text-black dark:text-white">
                            {subCategory.totalProduct}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex justify-end items-center space-x-3.5">
                            <button
                              type="button"
                              onClick={() => {
                                setModalType("update");
                                dispatch(
                                  toggleModal({
                                    id: subCategory.id,
                                    isOpen: true,
                                  })
                                );
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
                                dispatch(
                                  toggleModal({
                                    id: subCategory.id,
                                    isOpen: true,
                                  })
                                );
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
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {commonState.isOpenModal &&
        modalType === "update" &&
        commonState.modalId > 0 && (
          <FormProvider {...methods}>
            <Modal
              title="Cập nhật danh mục phụ"
              body={
                <ModalBodyUpdate
                  id={commonState.modalId}
                  cateId={category.data.id}
                  cateName={category.data.name}
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
    </>
  );
};

// modal
const ModalBodyCreate: React.FC<{
  cateId: number;
  cateName: string;
  close: () => void;
  page: number;
  limit: number;
}> = ({ cateId, cateName, close, page, limit }) => {
  const queryClient = useQueryClient();
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const [file, setFile] = React.useState<File | null>(null);
  const [previewImg, setPreviewImg] = React.useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => setPreviewImg(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const { mutate, isLoading: createSubCategoryLoading } = useMutation(
    createSubCategory,
    {
      onSuccess: (res) => {
        if (!res.success) notify(ENotificationType.error, res.message);
        else {
          notify(
            ENotificationType.success,
            "Tạo mới danh mục phụ thành công!",
            "success"
          );
          queryClient.invalidateQueries({
            queryKey: ["subCategories", { page, limit }],
          });
          close();
        }
      },
    }
  );

  const onCreateSubCate: SubmitHandler<any> = async (data) => {
    const { name } = data;
    const formD = new FormData();
    formD.append("categoryId", cateId);
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
        handleSubmit(onCreateSubCate)();
      }}
    >
      <div className="w-full flex flex-col justify-between bg-white dark:bg-form-strokedark p-4 gap-8 leading-normal">
        <div className="inline-flex items-center gap-4">
          <p className="w-1/4 text-sm text-left">Tên danh mục chính</p>
          <input
            type="text"
            defaultValue={cateName}
            disabled
            className="w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="inline-flex items-center gap-4">
          <p className="w-1/4 text-sm text-left">
            Tên danh mục phụ <span className="text-meta-1">*</span>
          </p>
          <input
            {...register("name", {
              required: "Tên danh mục phụ không được bỏ trống",
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
          disabled={createSubCategoryLoading}
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
  cateId: number;
  cateName: string;
  close: () => void;
  page: number;
  limit: number;
}> = ({ id, cateId, cateName, close, page, limit }) => {
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
      reader.onload = () => setPreviewImg(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["subcategory", { id }],
    queryFn: () => getSubCategory(Number(id)),
  });
  const [file, setFile] = React.useState<File>();
  const [previewImg, setPreviewImg] = React.useState<string>("");

  React.useEffect(() => {
    if (data) {
      setValue("name", data.name, { shouldDirty: true });
      setValue("thumbnail", data.thumbnail, { shouldDirty: true });
      setPreviewImg(data.thumbnail);
    }
  }, [data]);

  const { mutate, isLoading: updateSubCategoryLoading } = useMutation(
    updateSubCategory,
    {
      onSuccess: (res) => {
        if (!res.success) notify(ENotificationType.error, res.message);
        else {
          notify(
            ENotificationType.success,
            "Cập nhật danh mục phụ thành công!",
            "success"
          );
          queryClient.invalidateQueries({
            queryKey: ["subCategories", { page, limit }],
          });
          close();
        }
      },
    }
  );

  const onUpdateSubCate: SubmitHandler<any> = async (formData) => {
    const { name, thumbnail } = formData;
    const formD = new FormData();
    formD.append("categoryId", cateId.toString());
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
        handleSubmit(onUpdateSubCate)();
      }}
    >
      <div className="w-full flex flex-col justify-between bg-white dark:bg-form-strokedark p-4 gap-8 leading-normal">
        <div className="inline-flex items-center gap-4">
          <p className="w-1/4 text-sm text-left">Tên danh mục chính</p>
          <input
            type="text"
            defaultValue={cateName}
            disabled
            className="w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
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
          disabled={updateSubCategoryLoading}
          className="inline-flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cập nhật danh mục
        </button>
      </div>
    </form>
  );
};

export default SubCategoryTable;
