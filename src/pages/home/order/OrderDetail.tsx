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
import { updateOrderStatus } from "../../../mutation/order.mutation";

const OrderDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stt, setStt] = React.useState<EOrderStep | undefined>();

  const { data, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => getOrder(Number(id)),
    cacheTime: 0,
  });

  const {
    mutate,

    isLoading: isUpdating,
  } = useMutation(updateOrderStatus, {
    onSuccess: (res) => {
      if (!res.success) notify(ENotificationType.error, res.message);
      else {
        notify(ENotificationType.success, res.message);
        navigate("/", { replace: true });
      }
    },
  });

  const handleUpdateOrderStatus = () => {
    if (!stt)
      return notify(ENotificationType.error, "Chọn trạng thái đơn hàng!");
    mutate({
      id,
      status: Object.keys(EOrderStep)[Object.values(EOrderStep).indexOf(stt)],
    });
  };

  console.log(data);

  if (isLoading) return <Loader />;
  return (
    <>
      <table className="mb-4 min-w-full border-separate divide-x divide-y">
        <thead>
          <tr>
            <th
              scope="col"
              colSpan={1}
              className="hidden py-3.5 text-left text-sm font-bold sm:table-cell"
            >
              Mã hàng
            </th>
            <th
              scope="col"
              colSpan={4}
              className="hidden py-3.5 text-left text-sm font-bold sm:table-cell"
            >
              Tên hàng
            </th>
            <th
              scope="col"
              colSpan={1}
              className="hidden py-3.5 text-center text-sm font-bold sm:table-cell"
            >
              Đơn vị
            </th>
            <th
              scope="col"
              colSpan={1}
              className="hidden py-3.5 text-center text-sm font-bold sm:table-cell"
            >
              Số lượng
            </th>
            <th
              scope="col"
              colSpan={1}
              className="hidden py-3.5 text-center text-sm font-bold sm:table-cell"
            >
              Đơn giá
            </th>
            <th
              scope="col"
              colSpan={1}
              className="py-3.5 text-right text-sm font-bold sm:table-cell"
            >
              Thành tiền
            </th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((order: IOrderProduct, key: number) => (
            <tr key={key}>
              <td
                colSpan={1}
                className="hidden py-3.5 text-xs text-left sm:table-cell"
              >
                {order.productVariantId}
              </td>
              <td
                colSpan={4}
                className="hidden py-3.5 text-xs text-left sm:table-cell"
              >
                <div className="sm:inline-flex sm:items-center sm:gap-2">
                  <img
                    src={order.image}
                    className="w-20 h-20 rounded-lg"
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
              <td
                colSpan={1}
                className="hidden py-3.5 text-xs text-center sm:table-cell"
              >
                Chiếc
              </td>
              <td
                colSpan={1}
                className="hidden py-3.5 text-xs text-center font-bold sm:table-cell"
              >
                {order.quantity}
              </td>
              <td
                colSpan={1}
                className="hidden py-3.5 text-xs text-center font-bold sm:table-cell"
              >
                đ {formatNumber(order.price)}
              </td>
              <td
                colSpan={1}
                className="hidden py-3.5 text-xs text-right font-bold sm:table-cell"
              >
                đ {formatNumber(order.totalPrice)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th
              scope="row"
              colSpan={7}
              className="hidden pt-3.5 text-sm font-bold text-right sm:table-cell"
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
              className="hidden pt-3.5 text-sm font-light text-right sm:table-cell"
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
              className="hidden pt-3.5 text-sm font-light text-right sm:table-cell"
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
              className="hidden pt-3.5 text-sm font-light text-right sm:table-cell"
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
        <h3 className="font-bold">Cập nhật vận chuyển</h3>
        <div className="relative">
          <select
            className="appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
            defaultValue=""
            onChange={(e) => setStt(e.target.value as EOrderStep)}
          >
            <option value="" disabled>
              Chọn trạng thái
            </option>
            {Object.entries(EOrderStep).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
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

      <div className="w-full mt-20 justify-end inline-flex space-x-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center rounded-md bg-[#B6B6B6] py-2 px-4 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Trở về
        </button>
        <button
          type="button"
          onClick={handleUpdateOrderStatus}
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
      </div>
    </>
  );
};

export default OrderDetail;