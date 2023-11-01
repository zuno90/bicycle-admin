import React from "react";
import { ITable, IUser } from "../../__types__";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { config } from "../../utils/config.util";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../query";
import UserAvatar from "../../assets/images/user/user.png";
import Loader from "../Loader";
import Pagination from "../Pagination";
import { formatNumber } from "../../utils/helper.util";

const UserTable: React.FC<ITable> = ({ title }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);

  const page = Number(queryParams.get("page")) || config.pagination.PAGE;
  const limit = Number(queryParams.get("limit")) || config.pagination.LIMIT;
  const status = queryParams.get("status");

  const { data, isLoading } = useQuery({
    queryKey: ["users", { page, limit, status }],
    queryFn: () => getUsers(page, limit, status),
  });
  console.log(data, 55);
  const dataTotal = data && data.totalUser;

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-10">
          <div className="w-full inline-flex items-center justify-between">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              {title}
            </h4>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-6 border-stroke p-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
          <div className="col-span-1 hidden sm:flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Avatar</h5>
          </div>
          <div className="col-span-1 flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Ngày</h5>
          </div>
          <div className="col-span-1 flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Tên</h5>
          </div>
          <div className="col-span-1 hidden sm:flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Số điện thoại</h5>
          </div>
          <div className="col-span-1 hidden sm:flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Địa chỉ</h5>
          </div>
          <div className="col-span-1 hidden sm:flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Xu</h5>
          </div>
        </div>

        {data.users.length > 0 &&
          data.users.map((user: IUser) => (
            <div
              key={user.id}
              className="grid grid-cols-6 border-t border-stroke p-4 dark:border-strokedark sm:grid-cols-6   md:px-6 2xl:px-7.5"
            >
              <Link
                to={`/user/${user.id}`}
                className="w-16 rounded-md hidden items-center sm:flex"
              >
                <img className="rounded-lg" src={UserAvatar} alt="user-img" />
              </Link>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-xs text-black dark:text-white">
                  {new Date(user.createAt).toLocaleDateString("en-GB")}
                </p>
              </div>

              <Link
                to={`/user/${user.id}`}
                className="col-span-1 hidden items-center sm:flex"
              >
                <p className="text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden">
                  {user.name}
                </p>
              </Link>

              <Link
                to={`/user/${user.id}`}
                className="col-span-1 hidden items-center sm:flex"
              >
                <p className="text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden">
                  {user.phoneNumber}
                </p>
              </Link>

              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden">
                  {user.address}-{user.ward}-{user.district}-{user.city}
                </p>
              </div>

              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden">
                  đ{formatNumber(user.coin)}
                </p>
              </div>
            </div>
          ))}

        {data.users.length > 0 && (
          <div className="flex justify-center items-center my-4">
            <Pagination page={page} limit={limit} total={dataTotal} />
          </div>
        )}
      </div>
    </>
  );
};

export default UserTable;
