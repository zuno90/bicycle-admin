import { formatNumber } from "../utils/helper";

const Card: React.FC = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between dark:bg-meta-4">
        <p>Doanh thu</p>
        <p className="inline-flex items-center space-x-2">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="5" cy="5" r="5" fill="#FF9472" />
          </svg>
          <span>Hôm nay</span>
        </p>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            <span className="underline">đ</span> {formatNumber(10000000)}
          </h4>
          <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
            {" "}
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
            0.43%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
