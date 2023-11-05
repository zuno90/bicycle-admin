import React from "react";
import { usePDF } from "react-to-pdf";
import { formatNumber } from "../../utils/helper.util";
import Dropzone, { useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../store";
import Modal from "../Modal";
import { toggleModal } from "../../store/common/common.slice";

type TInvoice = { data: any };

const OrderInvoice: React.FC<TInvoice> = ({ data }) => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const commonState = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        type="button"
        onClick={() => toPDF()}
        className="px-5 py-2.5 rounded-full bg-primary text-whiten"
      >
        DOWNLOAD
      </button>
      <button
        type="button"
        onClick={() => dispatch(toggleModal({ isOpen: true }))}
        className="hover:text-primary"
      >
        MODAL
      </button>
      <div ref={targetRef} className="mx-auto bg-white">
        <article className="px-10 py-20 overflow-hidden">
          <div className="rounded-b-md">
            <div className="space-y-2 mb-4">
              <div className="font-light">
                <p>CÔNG TY TNHH MỘT THÀNH VIÊN NGƯ CỤ QUÁN VŨ</p>
                <p>35 Đướng số 26A, Phường 10, Quận 6, TP.HCM</p>
              </div>
              <p className="text-center text-xl font-extrabold tracking-tight uppercase font-body">
                HOÁ ĐƠN BÁN HÀNG
              </p>
              <div className="font-light text-md space-y-1">
                <div className="flex justify-between items-center">
                  <p>
                    Tên khách hàng: <b>Anh Zuno</b>
                  </p>
                  <p>Ngày: 01/01/2023</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>
                    Địa chỉ: <b>ZXXZX</b>
                  </p>
                  <p>
                    NVKD: <b>ZUNO</b>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p>
                    Liên hệ: <b>0933663240</b>
                  </p>
                  <p>
                    Hotline cty: <b>09xxxxxxxxx</b>
                  </p>
                  <p>
                    SĐT: <b>09xxxxxxxx</b>
                  </p>
                </div>
              </div>
            </div>

            <table className="mb-4 min-w-full border-collapse border divide-x divide-y">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 text-center text-xs font-bold"
                  >
                    STT
                  </th>
                  <th
                    scope="col"
                    colSpan={1}
                    className="hidden py-3.5 text-left text-xs font-bold sm:table-cell"
                  >
                    Mã hàng
                  </th>
                  <th
                    scope="col"
                    colSpan={4}
                    className="hidden py-3.5 text-left text-xs font-bold sm:table-cell"
                  >
                    Tên hàng
                  </th>
                  <th
                    scope="col"
                    colSpan={1}
                    className="hidden py-3.5 text-center text-xs font-bold sm:table-cell"
                  >
                    Đơn vị
                  </th>
                  <th
                    scope="col"
                    colSpan={1}
                    className="hidden py-3.5 text-right text-xs font-bold sm:table-cell"
                  >
                    Số lượng
                  </th>
                  <th
                    scope="col"
                    colSpan={1}
                    className="hidden py-3.5 text-center text-xs font-bold sm:table-cell"
                  >
                    Đơn giá
                  </th>
                  <th
                    scope="col"
                    colSpan={1}
                    className="py-3.5 text-right text-xs font-bold sm:table-cell"
                  >
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={1} className="py-3.5 text-center text-xs">
                    1
                  </td>
                  <td
                    colSpan={1}
                    className="hidden py-3.5 text-xs text-left sm:table-cell"
                  >
                    ABCXYZ
                  </td>
                  <td
                    colSpan={4}
                    className="hidden py-3.5 text-xs text-left sm:table-cell"
                  >
                    Xe đạp nhập khẩu Đức 2 màu trắng đen Xe đạp nhập khẩu Đức 2
                    màu trắng đen
                  </td>
                  <td
                    colSpan={1}
                    className="hidden py-3.5 text-xs text-center sm:table-cell"
                  >
                    VND
                  </td>
                  <td
                    colSpan={1}
                    className="hidden py-3.5 text-xs text-right font-bold sm:table-cell"
                  >
                    7
                  </td>
                  <td
                    colSpan={1}
                    className="hidden py-3.5 text-xs text-center font-bold sm:table-cell"
                  >
                    {formatNumber(1000000)}
                  </td>
                  <td
                    colSpan={1}
                    className="hidden py-3.5 text-xs text-right font-bold sm:table-cell"
                  >
                    {formatNumber(3000000)}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th
                    scope="row"
                    colSpan={7}
                    className="hidden pt-3.5 text-sm font-bold text-right sm:table-cell"
                  >
                    Tổng số lượng
                  </th>
                  <td className="pt-3.5 text-sm text-right font-bold">
                    {formatNumber(600)}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={7}
                    className="hidden pt-3.5 text-sm font-light text-right sm:table-cell"
                  >
                    Cộng tiền hàng
                  </th>
                  <td
                    colSpan={10}
                    className="pt-3.5 text-sm font-bold text-right"
                  >
                    {formatNumber(212343234)}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={7}
                    className="hidden pt-3.5 text-sm font-light text-right sm:table-cell"
                  >
                    Cộng nợ cũ
                  </th>
                  <td
                    colSpan={10}
                    className="pt-3.5 text-sm text-right font-bold"
                  >
                    {formatNumber(222222)}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={7}
                    className="hidden py-3.5 text-sm font-light text-right sm:table-cell"
                  >
                    Tổng thanh toán
                  </th>
                  <td
                    colSpan={10}
                    className="pt-3.5 text-sm text-right font-bold"
                  >
                    {formatNumber(1000000)}
                  </td>
                </tr>
              </tfoot>
            </table>

            <p className="mb-6 text-center text-xs font-light italic">
              Payment terms are 14 days. Please be aware that according to the
              Late Payment of Unwrapped Debts Act
            </p>

            <div className="flex justify-around items-center text-xs">
              <div className="flex flex-col items-center gap-2">
                <p className="font-bold">Người mua hàng</p>
                <p className="italic">(Kí, họ tên)</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="font-bold">Kế toán</p>
                <p className="italic">(Kí, họ tên)</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="font-bold">Giám đốc</p>
                <p className="italic">(Kí, họ tên, đóng dấu)</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      {commonState.isOpenModal && <ModalX />}
    </>
  );
};

const ModalX: React.FC = () => {
  const dispatch = useAppDispatch();

  // delete modal
  const closeModal = () => dispatch(toggleModal(false));
  const ModalBody: React.FC = () => {
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

    return (
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
    );
  };
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
          closeModal();
        }}
      >
        Xác nhận
      </button>
    </>
  );

  return (
    <Modal
      title="Xoá voucher"
      body={<ModalBody />}
      footer={<ModalFooter />}
      close={closeModal}
    />
  );
};

export default OrderInvoice;
