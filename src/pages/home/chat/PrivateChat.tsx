import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../../query/user.query";

const PrivateChat: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["id", id],
    queryFn: () => getUser(id),
  });

  console.log(id);
  return (
    <section className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
        Chat {">"} Nguyen Van A
      </h4>
      <div className="mb-4 flex h-[80vh] bg-graydark">
        <div className="w-3/4 bg-gray-2">hehe</div>
        <div className="w-1/4 bg-bodydark">haha</div>
      </div>
    </section>
  );
};

export default PrivateChat;
