import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../../assets/images/user/user-10.png";

const Chat: React.FC = () => {
  const id = 10;
  const navigate = useNavigate();
  return (
    <section className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-4 space-y-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Chat
        </h4>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
          >
            Tất cả (100)
          </button>
          <button
            type="button"
            className="text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
          >
            Chưa đọc (2)
          </button>
          <button
            type="button"
            className="text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
          >
            Đã đọc (160)
          </button>
        </div>
      </div>

      <div
        className="w-full mb-4 inline-flex justify-between items-center space-x-4"
        onClick={() => navigate(`/chat/${id}`)}
      >
        <img
          className="w-20 h-20 rounded-full"
          src={Avatar}
          alt="Rounded avatar"
        />
        <div className="w-full flex flex-col space-y-4">
          <div className="inline-flex justify-between items-center">
            <p className="font-bold">Nguyen Van A</p>
            <p>10 min</p>
          </div>
          <div className="inline-flex justify-between items-center">
            <p>Xin chào, sản phẩm này hiện còn hàng không ạ?</p>
            <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-danger rounded-full dark:bg-meta-1">
              <span className="font-medium text-white dark:text-white">2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
