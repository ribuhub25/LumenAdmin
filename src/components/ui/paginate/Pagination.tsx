import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type PropsPaginate from "./paginate";
import { useEffect, useState } from "react";

export default function Pagination({ paginate }: { paginate: PropsPaginate }) {
  const NUMBER_OF_PAGES = Math.ceil(
    paginate.totalResults / paginate.numberPages
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handlePage = (i: number) => {
    if (paginate.currentPage != i) {
      paginate.onUpdatePage(i);
      setCurrentPage(i);
    }
  };
  useEffect(() => {
    setCurrentPage(paginate.currentPage);
  }, [paginate.currentPage]);

  const getVisiblePages = (current: number, total: number) => {
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push(-1); // "..."

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (current < total - 2) pages.push(-2); // "..."
      pages.push(total);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] px-4 py-3 sm:px-3">
      {/* Mobile */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePage(currentPage - 1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage === NUMBER_OF_PAGES}
          onClick={() => handlePage(currentPage + 1)}
          className="px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-800 dark:text-white/70">
            Mostrando{" "}
            <span className="font-medium">{paginate.numberResults}</span>{" "}
            productos ( del{" "}
            <span className="font-medium">
              {paginate.numberPages * (currentPage - 1) + 1}
            </span>{" "}
            al{" "}
            <span className="font-medium">
              {paginate.numberPages * currentPage}
            </span>{" "}
            ) de un total de{" "}
            <span className="font-medium">{paginate.totalResults}</span>{" "}
            resultados
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            {/* Previous */}
            <button
              onClick={() => currentPage > 1 && handlePage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 border border-gray-300 hover:bg-gray-50 dark:hover:text-gray-800 focus:z-20 ${
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="size-5" />
            </button>

            {/* Page Numbers */}
            {getVisiblePages(currentPage, NUMBER_OF_PAGES).map((page, idx) =>
              page < 0 ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-800 dark:text-white/70 border border-gray-300"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePage(page)}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                    currentPage === page
                      ? "z-10 border dark:border-gray-300 bg-indigo-600 text-white border-indigo-600"
                      : "text-gray-800 dark:text-white/70 bg-white dark:bg-white/[0.01] border border-gray-300"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() =>
                currentPage < NUMBER_OF_PAGES && handlePage(currentPage + 1)
              }
              disabled={currentPage === NUMBER_OF_PAGES}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 border border-gray-300 hover:bg-gray-50 dark:hover:text-gray-800 focus:z-20 ${
                currentPage === NUMBER_OF_PAGES
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
