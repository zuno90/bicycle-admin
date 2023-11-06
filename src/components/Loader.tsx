import classNames from "classnames";
import React from "react";

type TLoader = { loadInside?: boolean };

const Loader: React.FC<TLoader> = ({ loadInside }) => {
  return (
    <div
      className={classNames("flex items-center justify-center", {
        "h-screen": !loadInside,
        "h-auto": loadInside,
      })}
    >
      <div
        className={classNames(
          "w-16 h-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent",
          { "w-8 h-8": loadInside }
        )}
      ></div>
    </div>
  );
};

export default Loader;
