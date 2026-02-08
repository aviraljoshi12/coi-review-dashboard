import { useEffect, useRef, useState } from "react";
import { useCOI } from "../../context/COIContext";
import AddCOIModal from "../modals/AddCOIModal";
import TableSettings from "../table/TableSettings";
import { ChevronDown, Plus, Search } from "lucide-react";

const STATUS_OPTIONS = [
  "All",
  "Active",
  "Expired",
  "Rejected",
  "Expiring Soon",
  "Not Processed",
];

function FiltersRow() {
  const {
    search,
    setSearch,
    setStatusFilter,
    setExpiryFilter,
    cois,
    propertyFilter,
    setPropertyFilter,
  } = useCOI();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [localSearch, setLocalSearch] = useState(search);
  const [showAddModal, setShowAddModal] = useState(false);

  const wrapperRef = useRef(null);

  const uniqueProperties = [...new Set(cois.map((c) => c.property))];

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Debounced search */
  useEffect(() => {
    const t = setTimeout(() => setSearch(localSearch), 300);
    return () => clearTimeout(t);
  }, [localSearch, setSearch]);

  const propertyLabel =
    propertyFilter.length === 0
      ? "All Properties"
      : `${propertyFilter.length} selected`;

  return (
    <div
      ref={wrapperRef}
      className="
      flex flex-col gap-3
      lg:flex-row lg:items-center lg:justify-between mb-[25px]
    "
    >
      {/* LEFT FILTERS */}
      <div className="flex flex-wrap items-center gap-2">
        {/* PROPERTY FILTER */}
        <DropdownButton
          label={propertyLabel}
          open={openDropdown === "property"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "property" ? null : "property")
          }
        >
          <div
            onClick={() => {
              setPropertyFilter([]);
              setOpenDropdown(null);
            }}
            className="px-3 py-2 font-[500] hover:bg-[#F9FAFA] cursor-pointer"
          >
            All
          </div>

          {uniqueProperties.map((property) => {
            const checked = propertyFilter.includes(property);
            return (
              <label
                key={property}
                className="flex items-center gap-2 px-3 py-2 text-[14px] hover:bg-[#F9FAFA] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    setPropertyFilter((prev) =>
                      checked
                        ? prev.filter((p) => p !== property)
                        : [...prev, property],
                    )
                  }
                />
                <span className="truncate">{property}</span>
              </label>
            );
          })}
        </DropdownButton>

        {/* STATUS FILTER */}
        <DropdownButton
          label="Status"
          open={openDropdown === "status"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "status" ? null : "status")
          }
        >
          {STATUS_OPTIONS.map((status) => (
            <div
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setOpenDropdown(null);
              }}
              className="px-3 py-2 hover:bg-[#F9FAFA] cursor-pointer"
            >
              {status}
            </div>
          ))}
        </DropdownButton>

        {/* EXPIRY FILTER */}
        <DropdownButton
          label="Filter by Expiry"
          open={openDropdown === "expiry"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "expiry" ? null : "expiry")
          }
        >
          <div
            onClick={() => {
              setExpiryFilter("All");
              setOpenDropdown(null);
            }}
            className="px-3 py-2 hover:bg-[#F9FAFA] cursor-pointer"
          >
            All
          </div>
          <div
            onClick={() => {
              setExpiryFilter("30");
              setOpenDropdown(null);
            }}
            className="px-3 py-2 hover:bg-[#F9FAFA] cursor-pointer"
          >
            Expiring in 30 days
          </div>
        </DropdownButton>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:justify-end lg:gap-3">
        {/* Search */}
        <div
          className="
          h-[32px] px-[12px]
          border border-[#E7E9E9] rounded-[10px]
          flex items-center gap-2
          w-full sm:w-[260px] lg:w-[300px] bg-white
        "
        >
          <Search size={16} strokeWidth={1} />
          <input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full outline-none text-[14px]"
            placeholder="Search by tenant, properties, or unit..."
          />
        </div>

        <div className="flex items-center gap-2 justify-end">
          <TableSettings />

          <button
            onClick={() => setShowAddModal(true)}
            className="
            h-[32px] px-[20px]
            rounded-[10px] bg-primary text-white
            text-[14px] font-[400]
            whitespace-nowrap
          "
          >
            <div className="flex items-center gap-2">
              <Plus /> ADD COI
            </div>
          </button>
        </div>

        {showAddModal && <AddCOIModal onClose={() => setShowAddModal(false)} />}
      </div>
    </div>
  );
}

/* Reusable dropdown shell */
function DropdownButton({ label, open, onToggle, children }) {
  return (
    <div className="relative">
      <div
        onClick={onToggle}
        className="h-[32px] px-[10px] border border-[#E7E9E9] rounded-[10px] flex items-center gap-2 cursor-pointer bg-white"
      >
        <span className="text-[14px] font-[400] text-status-neutral">
          {label}
        </span>
        <ChevronDown strokeWidth={1} />
      </div>

      {open && (
        <div className="absolute z-20 mt-1 w-[220px] bg-white border border-[#E7E9E9] rounded-[10px] shadow-sm max-h-[220px] overflow-auto">
          {children}
        </div>
      )}
    </div>
  );
}

export default FiltersRow;
