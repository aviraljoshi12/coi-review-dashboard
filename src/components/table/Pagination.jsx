import { useState } from "react";
import { useCOI } from "../../context/COIContext";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

function Pagination() {
  const {
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
  } = useCOI();

  const [goTo, setGoTo] = useState("");

  const handleGoTo = () => {
    let page = Number(goTo);

    if (isNaN(page)) return;

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    setCurrentPage(page);
  };

  return (
    <div className="flex items-center justify-between p-4 text-[14px] text-status-neutral bg-[white] border border-[#E7E9E9] rounded-[10px]">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <span className="fw-[500] text-[#2C3635]">Rows per page</span>
        <div className="relative">
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="
      h-[32px]
      px-3 pr-8
      border border-[#E7E9E9]
      rounded-[8px]
      bg-white
      appearance-none
      cursor-pointer
      outline-none
    "
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <ChevronDown
            size={20}
            strokeWidth={1}
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-status-neutral"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="h-[32px] w-[32px] flex items-center justify-center border border-[#E7E9E9] bg-[#F3F4F4] rounded-full disabled:opacity-40"
        >
          <ChevronLeft strokeWidth={0.75} size={30} />
        </button>

        {/* Page info */}
        <span className="text-[#898F8F] font-[500]">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="h-[32px] w-[32px] flex items-center justify-center border border-[#E7E9E9] bg-[#F3F4F4] rounded-full disabled:opacity-40"
        >
          <ChevronRight strokeWidth={0.75} size={30} />
        </button>

        {/* Go to */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={totalPages}
            value={goTo}
            onChange={(e) => setGoTo(e.target.value)}
            placeholder="Go to"
            className="h-[32px] w-[56px] px-2 border border-[#E7E9E9] rounded-[8px] outline-none"
          />
          <button
            onClick={handleGoTo}
            className="h-[32px] px-3 border border-[#E7E9E9] rounded-[8px] bg-white hover:bg-[#F9FAFA]"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
