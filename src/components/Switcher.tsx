import React from "react";
import classNames from "classnames";

type TSwitcher = { id: number; isEnabled: boolean };

const Switcher: React.FC<TSwitcher> = ({ id, isEnabled }) => {
  console.log(isEnabled);
  const [enabled, setEnabled] = React.useState(isEnabled);

  return (
    <div x-data="{ switcherToggle: false }">
      <label
        htmlFor={`toggle${id}`}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            id={`toggle${id}`}
            type="checkbox"
            className="sr-only"
            onChange={() => setEnabled(!enabled)}
          />
          <div className="h-5 w-14 rounded-full bg-success shadow-inner dark:bg-[#5A616B]"></div>
          <div
            className={classNames(
              "dot absolute left-0 -top-1 h-7 w-7 rounded-full bg-white shadow-switch-1 transition",
              { "!right-0 !translate-x-full !bg-white dark:!bg-white": enabled }
            )}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default Switcher;
