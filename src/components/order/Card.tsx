import classNames from "classnames";
import { formatNumber } from "../../utils/helper.util";

type TCard = { title: string; data?: any };

const Card: React.FC<TCard> = ({ title, data }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between">
        <p>{title}</p>
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

      <div className="mt-8 flex flex-col justify-between space-y-2">
        <h4 className="text-title-md font-bold text-black dark:text-white">
          <span className="underline">đ</span> {formatNumber(data.value)}
        </h4>
        <p className="flex items-center gap-1 text-sm font-medium">
          <svg
            className={classNames("w-4 h-4", {
              "fill-meta-3": data.status === "increase",
              "fill-meta-1": data.status === "decrease",
            })}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d={classNames({
                "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z":
                  data.status === "increase",
                "M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z":
                  data.status === "decrease",
              })}
            />
          </svg>
          <span
            className={classNames({
              "text-meta-3": data.status === "increase",
              "text-meta-1": data.status === "decrease",
            })}
          >
            {formatNumber(data.percent)}%
          </span>
        </p>
      </div>
    </div>
  );
};

export default Card;
