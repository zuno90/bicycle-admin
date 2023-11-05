import React from "react";
import Logo from "../../../assets/images/logo/admin.png";
import { formatNumber } from "../../../utils/helper.util";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../../query";
import Loader from "../../../components/Loader";
import { IOrderProduct } from "../../../__types__";

const OrderInvoice: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const targetRef = React.useRef(null);
  const handlePrint = useReactToPrint({ content: () => targetRef.current });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", { id }],
    queryFn: () => getOrder(Number(id)),
  });
  console.log(data);

  if (isError) navigate(-1);
  if (isLoading) return <Loader />;
  return (
    <div className="mx-auto bg-white">
      <article ref={targetRef} className="p-10 overflow-hidden">
        <div className="rounded-b-md">
          <div className="space-y-8 mb-4">
            <div className="inline-flex items-center gap-4">
              <img src={Logo} className="rounded-md" alt="logo" />
              <div className="font-light">
                <p>Công ty TNHH bike Vuong Do</p>
                <p>35 Đướng số 26A, Phường 10, Quận 6, TP.HCM</p>
              </div>
            </div>
            <p className="text-center text-xl font-extrabold tracking-tight uppercase font-body">
              THÔNG TIN ĐƠN HÀNG
            </p>
            <div className="font-light text-md space-y-1">
              <div className="flex justify-between items-center">
                <p>
                  Đơn hàng: <b>#{data?.codeOrder}</b>
                </p>
                <p>
                  NVKD: <b>Mr.Vương</b>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p>
                  Ngày đặt hàng:{" "}
                  <b>{new Date(data?.createAt).toLocaleDateString("en-GB")}</b>
                </p>
                <p>
                  SĐT: <b>0906811663</b>
                </p>
              </div>
              <p>
                Tên khách hàng: <b>Anh {data?.information.name}</b>
              </p>
              <p>
                Địa chỉ giao hàng:{" "}
                <b>
                  {data?.information.address} - {data?.information.ward} -{" "}
                  {data?.information.district} - {data?.information.city}
                </b>
              </p>
              <p>
                Số điện thoại: <b>{data?.information.phoneNumber}</b>
              </p>
            </div>
          </div>

          <table className="mb-4 min-w-full border border-collapse divide-x divide-y">
            <thead>
              <tr>
                <th
                  scope="col"
                  colSpan={2}
                  className="py-3.5 text-center text-xs font-bold table-cell"
                >
                  STT
                </th>
                <th
                  scope="col"
                  colSpan={2}
                  className="py-3.5 text-center text-xs font-bold table-cell"
                >
                  Mã sản phẩm
                </th>
                <th
                  scope="col"
                  colSpan={4}
                  className="py-3.5 text-center text-xs font-bold table-cell"
                >
                  Tên sản phẩm
                </th>
                <th
                  scope="col"
                  colSpan={2}
                  className="py-3.5 text-center text-xs font-bold table-cell"
                >
                  Số lượng
                </th>
                <th
                  scope="col"
                  colSpan={2}
                  className="py-3.5 text-center text-xs font-bold table-cell"
                >
                  Đơn giá
                </th>
                <th
                  scope="col"
                  colSpan={2}
                  className="py-3.5 text-center text-xs font-bold table-cell"
                >
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.products.length > 0 &&
                data.products.map((orderProd: IOrderProduct, index: number) => (
                  <tr key={index} className="border-b">
                    <td
                      colSpan={2}
                      className="py-3.5 text-center text-xs table-cell"
                    >
                      {index + 1}
                    </td>
                    <td
                      colSpan={2}
                      className="py-3.5 text-xs text-center table-cell"
                    >
                      {`#VP${orderProd.productId}VAR${orderProd.productVariantId}`}
                    </td>
                    <td
                      colSpan={4}
                      className="py-3.5 text-xs text-left table-cell"
                    >
                      <p className="font-semibold">{orderProd.name}</p>
                      <p className="font-thin">
                        {orderProd.size} - {orderProd.color}
                      </p>
                    </td>
                    <td
                      colSpan={2}
                      className="py-3.5 text-xs text-center table-cell"
                    >
                      {orderProd.quantity}
                    </td>
                    <td
                      colSpan={2}
                      className="py-3.5 text-xs text-center table-cell"
                    >
                      đ{formatNumber(orderProd.price)}
                    </td>
                    <td
                      colSpan={2}
                      className="py-3.5 text-xs text-center table-cell"
                    >
                      đ{formatNumber(orderProd.totalPrice)}
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr className="border-b">
                <th
                  scope="row"
                  colSpan={8}
                  className="py-3.5 text-sm font-light text-center table-cell"
                >
                  Tổng số lượng
                </th>
                <td className="border-x py-3.5 text-sm text-center font-light">
                  {formatNumber(
                    data?.products
                      .map((j: IOrderProduct) => j.quantity)
                      .reduce((a: number, b: number) => a + b)
                  )}
                </td>
              </tr>
              <tr className="border-b">
                <th
                  scope="row"
                  colSpan={8}
                  className="py-3.5 text-sm font-light text-center table-cell"
                >
                  Cộng tiền hàng
                </th>
                <td colSpan={4}></td>
                <td
                  colSpan={2}
                  className="py-3.5 text-sm font-light text-center"
                >
                  đ{formatNumber(data?.totalPrice)}
                </td>
              </tr>
              <tr className="border-b">
                <th
                  scope="row"
                  colSpan={8}
                  className="py-3.5 text-sm font-light text-center table-cell"
                >
                  Vận chuyển
                </th>
                <td colSpan={4}></td>
                <td
                  colSpan={2}
                  className="py-3.5 text-sm text-center font-light"
                >
                  đ{formatNumber(data?.priceDelivery)}
                </td>
              </tr>
              <tr className="border-b">
                <th
                  scope="row"
                  colSpan={8}
                  className="py-3.5 text-sm font-light text-center table-cell"
                >
                  Khuyến mãi
                </th>
                <td colSpan={4}></td>
                <td
                  colSpan={2}
                  className="py-3.5 text-sm text-center text-meta-1 font-light"
                >
                  đ{formatNumber(data?.pricePromotion)}
                </td>
              </tr>
              <tr className="border-b">
                <th
                  scope="row"
                  colSpan={8}
                  className="py-3.5 text-sm font-light text-center table-cell"
                >
                  Cộng nợ cũ
                </th>
                <td colSpan={4}></td>
                <td
                  colSpan={2}
                  className="py-3.5 text-sm text-center font-light"
                >
                  đ{formatNumber(0)}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colSpan={8}
                  className="py-3.5 text-sm font-light text-center table-cell"
                >
                  Tổng thanh toán
                </th>
                <td colSpan={4}></td>
                <td
                  colSpan={2}
                  className="py-3.5 text-sm text-center font-light"
                >
                  đ{formatNumber(data?.finalPrice)}
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="my-10 p-5 w-full bg-[#F6F6F6] font-light italic">
            <div className="inline-flex items-center gap-4">
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4.75"
                  y="9.5"
                  width="28.5"
                  height="20.5833"
                  rx="3.16667"
                  stroke="#33363F"
                  strokeWidth="3.16667"
                />
                <path
                  d="M11.0833 23.75H11.0991"
                  stroke="#33363F"
                  strokeWidth="3.16667"
                  strokeLinecap="round"
                />
                <path
                  d="M6.33325 17.4166H33.2499"
                  stroke="#33363F"
                  strokeWidth="3.16667"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-sm font-bold">Hình thức thanh toán</p>
            </div>
            <p>
              {data?.paymentMethod === "coin"
                ? "Dùng xu"
                : "Thanh toán chuyển khoản"}
            </p>
          </div>

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
      <div className="py-5 flex justify-center items-center gap-8">
        <button
          type="button"
          onClick={handlePrint}
          className="px-10 py-1 rounded-md bg-primary text-whiten"
        >
          In
        </button>
      </div>
    </div>
  );
};

export default OrderInvoice;
