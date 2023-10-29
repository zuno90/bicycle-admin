import React from "react";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

type TPagination = { page: number; limit: number; total: number };

const shownNumber = 5;

const Pagination: React.FC<TPagination> = ({ page, limit, total }) => {
  const noOfPage = Math.ceil(total / limit);

  const { search } = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(search);
  const handleChangePage = (newPage: number) => {
    if (newPage > 1) queryParams.set("page", newPage.toString());
    else queryParams.delete("page");
    navigate({ search: queryParams.toString() });
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            disabled={page === 1}
            onClick={() => handleChangePage(page - 1)}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {page > shownNumber && <li className="px-3">...</li>}
        {page > 5
          ? [...Array(noOfPage).keys()]
              .slice(page - shownNumber, page)
              .map((p, _) => (
                <li key={p}>
                  <button
                    disabled={page === p + 1}
                    onClick={() => handleChangePage(p + 1)}
                    className={classNames(
                      `flex items-center justify-center px-3 h-8 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`,
                      {
                        "bg-primary text-white rounded-full": page === p + 1,
                        "text-gray-500": page !== p + 1,
                      }
                    )}
                  >
                    {p + 1}
                  </button>
                </li>
              ))
          : [...Array(noOfPage).keys()]
              .slice(0, shownNumber)
              .map((_, index) => (
                <li key={index + 1}>
                  <button
                    disabled={page === index + 1}
                    onClick={() => handleChangePage(index + 1)}
                    className={classNames(
                      `flex items-center justify-center px-3 h-8 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`,
                      {
                        "bg-primary text-white rounded-full":
                          page === index + 1,
                        "text-gray-500": page !== index + 1,
                      }
                    )}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
        {page > shownNumber && page < noOfPage && <li className="px-3">...</li>}
        <li>
          <button
            disabled={page === noOfPage}
            onClick={() => handleChangePage(page + 1)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
