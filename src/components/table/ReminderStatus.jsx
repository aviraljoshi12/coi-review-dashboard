const REMINDER_STYLES = {
  "Sent (30d)": "text-success",
  "Not Sent": "text-status-neutral",
  "N/A": "text-status-neutral",
};

function ReminderStatus({ status }) {
  const color = REMINDER_STYLES[status] || "text-status-neutral";

  return (
    <span className={`font-inter text-[14px] font-[400] ${color}`}>
      {status}
    </span>
  );
}

export default ReminderStatus;
