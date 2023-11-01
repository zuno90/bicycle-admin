import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../query";
import { formatNumber } from "../../../utils/helper.util";
import { IPayment } from "../../../__types__";
import Loader from "../../../components/Loader";
import User from "../../../assets/images/user/user.png";

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(Number(id)),
    cacheTime: 0,
  });

  console.log(data, "data id 2");

  if (isLoading) return <Loader />;
  return (
    <>
      <h1 className="mb-6 text-xl">
        Quản lý người dùng {">"} {data?.name}
      </h1>
      <div className="space-y-6">
        <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-lg md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-form-strokedark dark:hover:bg-gray-700">
          <div className="p-4 flex flex-col items-center gap-2">
            <img
              className="object-cover rounded-t-lg h-24 md:h-auto md:w-52 md:rounded-none md:rounded-l-lg"
              src={User}
              alt="user-info-img"
            />
            <p className="text-black dark:text-white">Số dư</p>
            <p className="text-meta-1 font-bold">đ{formatNumber(data.coin)}</p>
          </div>

          <div className="w-full flex flex-col justify-between bg-white dark:bg-form-strokedark p-4 gap-8 leading-normal">
            <div className="inline-flex items-center gap-4">
              <p className="w-1/4 text-sm">Tên</p>
              <input
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={data.name ?? ""}
                disabled
              />
            </div>
            <div className="inline-flex items-center gap-4">
              <p className="w-1/4 text-sm">Số điện thoại</p>
              <input
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={data.phoneNumber ?? ""}
                disabled
              />
            </div>
            <div className="inline-flex items-center gap-4">
              <p className="w-1/4 text-sm">Ngày tạo tài khoản</p>
              <input
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={
                  new Date(data.createAt).toLocaleDateString("en-GB") ?? ""
                }
                disabled
              />
            </div>
            <div className="inline-flex items-center gap-4">
              <p className="w-1/4 text-sm">Địa chỉ</p>
              <input
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={`${data.address ?? ""}${data.ward ?? ""}${
                  data.district ?? ""
                }${data.city ?? ""}`}
                disabled
              />
            </div>
          </div>
        </div>

        {data.payments.length > 0 && (
          <>
            <h3 className="font-bold">Lịch sử hoạt động</h3>
            <div className="divide-y divide-stroke">
              {data.payments.map((payment: IPayment) => (
                <div
                  key={payment.id}
                  className="w-full py-2 inline-flex items-center gap-40"
                >
                  <p className="text-sm">
                    {new Date(payment.createAt).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-sm">{payment.content}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserDetail;
