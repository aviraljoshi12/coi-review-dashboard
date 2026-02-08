import { useEffect, useRef, useState } from "react";
import { useCOI } from "../../context/COIContext";
import { Settings } from "lucide-react";

const COLUMNS = [
  { key: "property", label: "Property" },
  { key: "tenant", label: "Tenant Name" },
  { key: "unit", label: "Unit" },
  { key: "coiName", label: "COI Name" },
  { key: "expiry", label: "Expiry Date" },
  { key: "status", label: "Status" },
  { key: "reminder", label: "Reminder Status" },
];

function TableSettings() {
  const { visibleColumns, setVisibleColumns } = useCOI();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (key) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="h-[32px] w-[32px] flex items-center justify-center border border-[#E7E9E9] rounded-[30px] bg-white"
      >
        <span className="scale-75 origin-center">
          <Settings strokeWidth={1} />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[220px] bg-white border border-[#E7E9E9] rounded-[10px] shadow-sm z-20 p-3">
          <p className="text-[13px] font-[500] mb-2">Table Columns</p>

          <div className="space-y-2">
            {COLUMNS.map((col) => (
              <label
                key={col.key}
                className="flex items-center gap-2 text-[14px] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={visibleColumns[col.key]}
                  onChange={() => toggle(col.key)}
                />
                {col.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TableSettings;
