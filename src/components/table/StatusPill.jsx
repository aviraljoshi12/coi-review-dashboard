import { ChevronDown } from "lucide-react";

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

function StatusPill({ status }) {
  const style = STATUS_STYLES[status];
  if (!style) return null;

  return (
    <div
      className={`
        flex items-center
        h-[28px]
        w-full
        px-[10px] pr-[28px]
        rounded-[8px]
        border
        ${style.text} ${style.bg} ${style.border}
        font-inter text-[14px] font-[500]
        cursor-pointer
      `}
    >
      <span className="truncate">{status}</span>

      <ChevronDown
        size={16}
        strokeWidth={1.5}
        className="ml-auto text-current"
      />
    </div>
  );
}

export default StatusPill;
