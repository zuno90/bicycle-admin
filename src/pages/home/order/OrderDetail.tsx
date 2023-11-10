import React from "react";
import { formatNumber, notify } from "../../../utils/helper.util";
import classNames from "classnames";
import {
  ENotificationType,
  EOrderStep,
  IOrderProduct,
} from "../../../__types__";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrder } from "../../../query";
import Loader from "../../../components/Loader";
import Modal from "../../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../../store";
import { clean } from "../../../store/common.action";
import { toggleModal } from "../../../store/common/common.slice";
import { updateOrderStatus } from "../../../mutation";


const OrderDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const commonState = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();

  const [modalType, setModalType] = React.useState<string>("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", { id }],
    queryFn: () => getOrder(Number(id)),
  });

  const { mutate, isLoading: isUpdating } = useMutation(updateOrderStatus, {
    onSuccess: (res) => {
      if (!res.success) notify(ENotificationType.error, res.message);
      else {
        notify(ENotificationType.success, res.message);
        navigate("/", { replace: true });
      }
    },
  });

  const handleUpdateOrderStatus = (status: keyof typeof EOrderStep) => {
    mutate({
      id,
      status,
      // status: Object.keys(EOrderStep)[Object.values(EOrderStep).indexOf(stt)],
    });
  };

  console.log(data);

  const closeModal = () => dispatch(clean());
  const ModalBody = () => {
    return modalType === "canceled" ? (
      <p>Bạn muốn huỷ đơn hàng?</p>
    ) : (
      <p>Bạn muốn cập nhật đơn hàng?</p>
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
          modalType === "canceled"
            ? handleUpdateOrderStatus("canceled")
            : handleUpdateOrderStatus(data.status);
          closeModal();
        }}
      >
        Xác nhận
      </button>
    </>
  );

  if (isError) navigate(-1);
  if (isLoading) return <Loader />;
  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-xl">
          Đơn hàng {">"} {data?.codeOrder}
        </h1>
        <button
          type="button"
          onClick={() => navigate(`/order/invoice/${data?.id}`)}
          className="text-sm text-meta-5 underline"
        >
          Xuất thông tin đơn hàng
        </button>
      </div>
      <table className="mb-4 min-w-full border-separate divide-x divide-y">
        <thead>
          <tr>
            <th
              scope="col"
              colSpan={1}
              className="py-3.5 text-left text-sm font-bold table-cell"
            >
              Mã sản phẩm
            </th>
            <th
              scope="col"
              colSpan={4}
              className="py-3.5 text-left text-sm font-bold table-cell"
            >
              Sản phẩm
            </th>
            <th
              scope="col"
              colSpan={1}
              className="py-3.5 text-center text-sm font-bold table-cell"
            >
              Số lượng
            </th>
            <th
              scope="col"
              colSpan={1}
              className="py-3.5 text-center text-sm font-bold table-cell"
            >
              Đơn giá
            </th>
            <th
              scope="col"
              colSpan={1}
              className="py-3.5 text-right text-sm font-bold table-cell"
            >
              Thành tiền
            </th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((order: IOrderProduct, key: number) => (
            <tr key={key}>
              <td colSpan={1} className="py-3.5 text-xs text-left table-cell">
                {order.productVariantId}
              </td>
              <td colSpan={4} className="py-3.5 text-xs text-left table-cell">
                <div className="inline-flex items-center gap-2">
                  <img
                    src={order.image}
                    className="w-16 h-16 rounded-lg"
                    alt="user-image"
                  />
                  <div className="flex flex-col gap-2">
                    <p>{order.name}</p>
                    <p>
                      {order.size} - {order.color}
                    </p>
                  </div>
                </div>
              </td>
              <td colSpan={1} className="py-3.5 text-xs text-center table-cell">
                {order.quantity}
              </td>
              <td colSpan={1} className="py-3.5 text-xs text-center table-cell">
                đ{formatNumber(order.price)}
              </td>
              <td colSpan={1} className="py-3.5 text-xs text-right table-cell">
                đ{formatNumber(order.totalPrice)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th
              scope="row"
              colSpan={7}
              className="pt-3.5 text-sm font-bold text-right table-cell"
            >
              Tổng cộng
            </th>
            <td colSpan={10} className="pt-3.5 text-sm text-right font-bold">
              đ{formatNumber(data.totalPrice)}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              colSpan={7}
              className="pt-3.5 text-sm font-light text-right table-cell"
            >
              Vận chuyển
            </th>
            <td colSpan={10} className="pt-3.5 text-sm font-bold text-right">
              đ{formatNumber(data.priceDelivery)}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              colSpan={7}
              className="pt-3.5 text-sm font-light text-right table-cell"
            >
              Khuyến mãi
            </th>
            <td
              colSpan={10}
              className="pt-3.5 text-sm text-meta-1 text-right font-bold"
            >
              -đ{formatNumber(data.pricePromotion)}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              colSpan={7}
              className="pt-3.5 text-sm font-light text-right table-cell"
            >
              Doanh thu
            </th>
            <td
              colSpan={10}
              className="pt-3.5 text-sm text-meta-1 text-right font-bold"
            >
              đ{formatNumber(data.finalPrice)}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="inline-flex items-center space-x-4">
        <h3 className="font-bold">Trạng thái đơn hàng</h3>
        <p
          className={classNames("", {
            "text-primary": EOrderStep[data.status] === EOrderStep.pending,
            "text-warning": EOrderStep[data.status] === EOrderStep.transported,
            "text-success": EOrderStep[data.status] === EOrderStep.success,
            "text-danger": EOrderStep[data.status] === EOrderStep.canceled,
          })}
        >
          {EOrderStep[data.status]}
        </p>
      </div>

      <div className="w-full mt-20 justify-end inline-flex space-x-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center rounded-md bg-[#B6B6B6] py-2 px-4 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Trở về
        </button>
        {data.status === "success" || data.status === "canceled" ? (
          <></>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setModalType("canceled");
                dispatch(toggleModal({ id: data.id, isOpen: true }));
              }}
              disabled={isLoading || isUpdating}
              className="inline-flex items-center justify-center rounded-md bg-danger py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <svg
                className={classNames("w-4 h-4 mr-3", {
                  "animate-spin": isLoading || isUpdating,
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
              Huỷ đơn
            </button>
            <button
              type="button"
              onClick={() => {
                setModalType("approval");
                dispatch(toggleModal({ id: data.id, isOpen: true }));
              }}
              disabled={isLoading || isUpdating}
              className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <svg
                className={classNames("w-4 h-4 mr-3", {
                  "animate-spin": isLoading || isUpdating,
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
              Xác nhận
            </button>
          </>
        )}
      </div>

      {commonState.isOpenModal && modalType === "canceled" && (
        <Modal
          title="Huỷ đơn"
          body={<ModalBody />}
          footer={<ModalFooter />}
          close={closeModal}
        />
      )}
      {commonState.isOpenModal && modalType === "approval" && (
        <Modal
          title="Cập nhật trạng thái đơn hàng"
          body={<ModalBody />}
          footer={<ModalFooter />}
          close={closeModal}
        />
      )}
    </>
  );
};

export default OrderDetail;
