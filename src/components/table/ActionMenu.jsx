import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCOI } from "../../context/COIContext";
import { EllipsisVertical } from "lucide-react";

function ActionMenu({ coi }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { deleteCOI } = useCOI();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-8 h-8 flex items-center justify-center rounded-[6px] hover:bg-[#F3F4F4]"
      >
        <EllipsisVertical />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-1 w-[120px] bg-white border border-[#E7E9E9] rounded-[8px] shadow-sm z-20">
          <MenuItem label="View" onClick={() => navigate(`/coi/${coi.id}`)} />
          <MenuItem
            label="Edit"
            onClick={() => navigate(`/coi/${coi.id}/edit`)}
          />
          <MenuItem label="Delete" danger onClick={() => deleteCOI(coi.id)} />
        </div>
      )}
    </div>
  );
}

function MenuItem({ label, danger, onClick }) {
  return (
    <div
      className={`
        px-3 py-2 text-[14px] font-inter cursor-pointer
        ${danger ? "text-status-rejected" : "text-status-neutral"}
        hover:bg-[#F3F4F4]
      `}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export default ActionMenu;
