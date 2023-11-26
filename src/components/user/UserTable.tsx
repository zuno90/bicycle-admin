import React from "react";
import { ITable, IUser } from "../../__types__";
import { Link, useLocation } from "react-router-dom";
import { config } from "../../utils/config.util";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../query";
import UserAvatar from "../../assets/images/user/user.png";
import Loader from "../Loader";
import Pagination from "../Pagination";
import { formatNumber } from "../../utils/helper.util";

const UserTable: React.FC<ITable> = ({ title }) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const page = Number(queryParams.get("page")) || config.pagination.PAGE;
  const limit = Number(queryParams.get("limit")) || config.pagination.LIMIT;
  const status = queryParams.get("status");

  const { data, isLoading } = useQuery({
    queryKey: ["users", { page, limit, status }],
    queryFn: () => getUsers(page, limit, status),
  });
  const dataTotal = data && data.totalUser;

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="space-y-10 mb-4 p-5">
        <div className="w-full inline-flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
        </div>
      </div>

      <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Avatar
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Ngày
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Tên
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Số điện thoại
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Địa chỉ
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Xu
                </th>
              </tr>
            </thead>
            <tbody>
              {data.users.length > 0 &&
                data.users.map((user: IUser) => (
                  <tr key={user.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Link to={`/user/${user.id}`}>
                        <img
                          className="w-14 rounded-lg"
                          src={UserAvatar}
                          alt="user-img"
                        />
                      </Link>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs text-black dark:text-white">
                        {new Date(user.createAt).toLocaleDateString("en-GB")}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Link to={`/user/${user.id}`}>
                        <p className="text-xs text-black dark:text-white text-ellipsis overflow-hidden">
                          {user.name}
                        </p>
                      </Link>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Link to={`/user/${user.id}`}>
                        <p className="text-xs text-black dark:text-white text-ellipsis overflow-hidden">
                          {user.phoneNumber}
                        </p>
                      </Link>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs text-black dark:text-white text-ellipsis overflow-hidden">
                        {user.address} - {user.ward} - {user.district} -{" "}
                        {user.city}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs text-black dark:text-white text-ellipsis overflow-hidden">
                        {formatNumber(user.coin)}đ
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {dataTotal > 0 && (
        <div className="flex justify-center items-center my-4">
          <Pagination page={page} limit={limit} total={dataTotal} />
        </div>
      )}
    </>
  );
};

export default UserTable;
