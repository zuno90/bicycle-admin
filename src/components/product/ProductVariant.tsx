import React from "react";
import { useFormContext } from "react-hook-form";
import { IAttribute } from "../../__types__";

type TProductVariantProps = {
  index: number;
  sizes: IAttribute[];
};

const ProductVariant: React.FC<TProductVariantProps> = ({ index, sizes }) => {
  const { register, getValues } = useFormContext();

  console.log(getValues());

  return (
    <table className="w-full">
      <thead className="bg-gray">
        <tr>
          <th className="py-3">Size</th>
          <th className="py-3">Màu sắc</th>
          <th className="py-3">Giá</th>
          <th className="py-3">Tồn kho</th>
        </tr>
      </thead>
      <tbody className="text-center">
        <tr>
          <td className="py-3">
            <div className="relative z-20 dark:bg-form-input">
              <select
                className="relative z-20 w-[80%] appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                defaultValue=""
                {...register(`productVariants.${index}.size`, {
                  required: "Size không được bỏ trống!",
                  min: { value: 1, message: "Size không được bỏ trống!" },
                })}
              >
                <option value="" disabled>
                  Chọn size
                </option>
                {sizes.length > 0 &&
                  sizes.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.title}
                    </option>
                  ))}
              </select>
              <span className="absolute top-1/2 right-6 z-10 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill="#637381"
                    />
                  </g>
                </svg>
              </span>
            </div>
          </td>
          <td className="py-3">
            <input
              {...register(`productVariants.${index}.color`, {
                required: "Màu sắc không được bỏ trống!",
              })}
              type="text"
              placeholder="Nhập màu"
              className="w-[80%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </td>
          <td className="py-3">
            <input
              {...register(`productVariants.${index}.price`, {
                required: "Giá gốc không được bỏ trống!",
                min: { value: 1, message: "Giá phải lớn hơn 0" },
              })}
              type="number"
              placeholder="Nhập giá"
              defaultValue=""
              min={0}
              className="w-[80%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </td>
          <td className="py-3">
            <input
              {...register(`productVariants.${index}.inventory`, {
                required: "Tồn kho không được bỏ trống!",
                min: { value: 1, message: "Tồn kho phải lớn hơn 0" },
              })}
              type="number"
              placeholder="Nhập tồn kho"
              defaultValue=""
              min={0}
              className="w-[80%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductVariant;
