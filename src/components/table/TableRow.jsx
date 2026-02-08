import { useNavigate } from "react-router-dom";
import { useCOI } from "../../context/COIContext";
import ActionMenu from "./ActionMenu";
import ReminderStatus from "./ReminderStatus";
import StatusPill from "./StatusPill";
import { useEffect, useState } from "react";
import { Check, ChevronDown, Pencil } from "lucide-react";

const STATUS_STYLES = {
  Active: {
    text: "text-status-active",
    bg: "bg-status-active-bg",
    border: "border-border-active",
  },
  Expired: {
    text: "text-status-expired",
    bg: "bg-status-expired-bg",
    border: "border-border-expired",
  },
  Rejected: {
    text: "text-status-rejected",
    bg: "bg-status-rejected-bg",
    border: "border-border-rejected",
  },
  "Expiring Soon": {
    text: "text-status-warning",
    bg: "bg-status-warning-bg",
    border: "border-border-warning",
  },
  "Not Processed": {
    text: "text-status-neutral",
    bg: "bg-status-neutral-bg",
    border: "border-border-neutral",
  },
};

function TableRow({ coi }) {
  const {
    selectedIds,
    toggleSelectOne,
    updateExpiryDate,
    updateStatus,
    visibleColumns,
  } = useCOI();

  const navigate = useNavigate();

  const [editingExpiry, setEditingExpiry] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [localExpiry, setLocalExpiry] = useState(coi.expiryDate);
  const [localStatus, setLocalStatus] = useState(coi.status);

  return (
    <div
      onClick={() => navigate(`/coi/${coi.id}`)}
      className="
        grid grid-cols-[44px_1.4fr_1.4fr_0.8fr_1.6fr_1fr_1.2fr_1.2fr_70px]
        h-[48px]
        text-[14px]
        bg-white
        border-b border-[#DCDEDE]
        hover:bg-[#F9FAFA]
        cursor-pointer
      "
    >
      <Cell center onClickStop>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selectedIds.includes(coi.id)}
            onChange={() => toggleSelectOne(coi.id)}
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
          selectedIds.includes(coi.id)
            ? "bg-primary border-primary"
            : "bg-[#F9FAFA] border-[#D0D2D2]"
        }
      `}
          >
            {selectedIds.includes(coi.id) && (
              <Check size={14} strokeWidth={3} className="text-white" />
            )}
          </span>
        </label>
      </Cell>

      {visibleColumns.property && <Cell>{coi.property}</Cell>}
      {visibleColumns.tenant && <Cell>{coi.tenantName}</Cell>}
      {visibleColumns.unit && <Cell>{coi.unit}</Cell>}
      {visibleColumns.coiName && <Cell truncate>{coi.coiName}</Cell>}

      {visibleColumns.expiry && (
        <Cell onClickStop>
          {editingExpiry ? (
            <input
              type="date"
              value={localExpiry}
              autoFocus
              onChange={(e) => setLocalExpiry(e.target.value)}
              onBlur={() => {
                updateExpiryDate(coi.id, localExpiry);
                setEditingExpiry(false);
              }}
              className="h-[28px] border rounded px-2 text-[13px]"
            />
          ) : (
            <div className="flex items-center justify-between w-full">
              <span>{formatDate(coi.expiryDate)}</span>

              <Pencil
                strokeWidth={0.75}
                size={16}
                onClick={() => setEditingExpiry(true)}
              />
            </div>
          )}
        </Cell>
      )}

      {visibleColumns.status && (
        <Cell onClickStop>
          <div className="relative w-full h-[28px]">
            {(() => {
              const style = STATUS_STYLES[localStatus];

              return (
                <>
                  <select
                    value={localStatus}
                    autoFocus
                    onChange={(e) => {
                      setLocalStatus(e.target.value);
                      updateStatus(coi.id, e.target.value);
                      setEditingStatus(false);
                    }}
                    className={`
                h-[28px]
                w-full
                px-[10px] pr-[28px]
                rounded-[8px]
                border
                text-[14px]
                font-[400]
                outline-none
                appearance-none
                cursor-pointer
                ${style?.text}
                ${style?.bg}
                ${style?.border}
              `}
                  >
                    <option className="bg-white text-black">Active</option>
                    <option className="bg-white text-black">Expired</option>
                    <option className="bg-white text-black">Rejected</option>
                    <option className="bg-white text-black">
                      Expiring Soon
                    </option>
                    <option className="bg-white text-black">
                      Not Processed
                    </option>
                  </select>

                  <ChevronDown
                    size={18}
                    strokeWidth={1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-current"
                  />
                </>
              );
            })()}
          </div>
        </Cell>
      )}

      {visibleColumns.reminder && (
        <Cell>
          <ReminderStatus status={coi.reminderStatus} />
        </Cell>
      )}

      <Cell center onClickStop>
        <ActionMenu coi={coi} />
      </Cell>
    </div>
  );
}

function Cell({ children, center, truncate, onClickStop }) {
  return (
    <div
      onClick={(e) => onClickStop && e.stopPropagation()}
      className={`
        px-3 flex items-center min-w-0
        ${center ? "justify-center" : ""}
        ${truncate ? "truncate" : ""}
        border-r border-[#DCDEDE]
        last:border-r-0 font-[400] text-[14px] 
      `}
    >
      {children}
    </div>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default TableRow;
