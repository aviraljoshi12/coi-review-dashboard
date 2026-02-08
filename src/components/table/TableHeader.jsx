import { Check } from "lucide-react";
import { useCOI } from "../../context/COIContext";

function TableHeader() {
  const {
    filteredCois = [],
    selectedIds = [],
    toggleSelectAll,
    sortOrder,
    setSortOrder,
    visibleColumns,
  } = useCOI();

  const allIds = filteredCois.map((c) => c.id);
  const isAllSelected =
    allIds.length > 0 && selectedIds.length === allIds.length;

  return (
    <div
      className="
        grid grid-cols-[44px_1.4fr_1.4fr_0.8fr_1.6fr_1fr_1.2fr_1.2fr_70px]
        h-[44px]
        bg-[#F3F4F4]
        text-[16px] font-[500] text-[#666E6D]
        border-b border-[#DCDEDE]
      "
    >
      <HeaderCell center>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={() => toggleSelectAll(allIds)}
            className="sr-only"
          />

          <span
            className={`
        w-[18px] h-[18px]
        flex items-center justify-center
        rounded-[4px]
        border
        transition
        ${
          isAllSelected
            ? "bg-primary border-primary"
            : "bg-[#F9FAFA] border-[#D0D2D2]"
        }
      `}
          >
            {isAllSelected && (
              <Check size={14} strokeWidth={3} className="text-white" />
            )}
          </span>
        </label>
      </HeaderCell>

      {visibleColumns.property && <HeaderCell>Property</HeaderCell>}
      {visibleColumns.tenant && <HeaderCell>Tenant Name</HeaderCell>}
      {visibleColumns.unit && <HeaderCell>Unit</HeaderCell>}
      {visibleColumns.coiName && <HeaderCell>COI Name</HeaderCell>}

      {visibleColumns.expiry && (
        <HeaderCell
          clickable
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          <div className="flex items-center w-full gap-5">
            <span>Expiry Date</span>
            <div className="flex flex-col text-[14px] font-[800] leading-[14px]">
              <span
                className={
                  sortOrder === "asc" ? "text-black" : "text-[#666E6D]"
                }
              >
                ▲
              </span>
              <span
                className={
                  sortOrder === "desc" ? "text-black" : "text-[#666E6D]"
                }
              >
                ▼
              </span>
            </div>
          </div>
        </HeaderCell>
      )}

      {visibleColumns.status && <HeaderCell>Status</HeaderCell>}
      {visibleColumns.reminder && <HeaderCell>Reminder Status</HeaderCell>}
      <HeaderCell center>Action</HeaderCell>
    </div>
  );
}

function HeaderCell({ children, center, clickable, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        px-3 flex items-center
        ${center ? "justify-center" : ""}
        ${clickable ? "cursor-pointer select-none" : ""}
        border-r border-[#DCDEDE]
        last:border-r-0
      `}
    >
      {children}
    </div>
  );
}

export default TableHeader;
