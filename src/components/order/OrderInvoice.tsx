import React from "react";
import { usePDF } from "react-to-pdf";
import { formatNumber } from "../../utils/helper.util";

type TInvoice = { data: any };

const OrderInvoice: React.FC<TInvoice> = ({ data }) => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  return (
    <>
      <button
        type="button"
        onClick={() => toPDF()}
        className="px-5 py-2.5 rounded-full bg-primary text-whiten"
      >
        DOWNLOAD
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
    </>
  );
};

export default OrderInvoice;
