import { ChevronDown, Info, Sparkles } from "lucide-react";
import { useCOI } from "../../context/COIContext";

function Header() {
  const { selectedIds, bulkSendReminder, hasPendingReminders } = useCOI();

  return (
    <header className="bg-white">
      <div className="px-4 sm:px-6 py-4">
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-start lg:items-center">
          {/* LEFT */}
          <div className="min-w-0">
            <h1 className="font-inter text-[20px] sm:text-[24px] font-[700] text-gray-800">
              COI Review Dashboard
            </h1>
            <p className="font-inter text-[13px] sm:text-[14px] font-[500] text-gray-500">
              Overview of all Certificate of insurance
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  if (!confirm(`Send reminder to ${selectedIds.length} COIs?`))
                    return;
                  bulkSendReminder();
                }}
                className={`
    h-[36px]
    px-4
    rounded-[10px]
    flex items-center gap-2
    text-[14px] font-[500]
    whitespace-nowrap
    transition
    border
    ${"border-primary text-primary bg-white hover:bg-primary/5"}
  `}
              >
                Send Bulk Reminder
                <ChevronDown size={20} strokeWidth={1.5} />
              </button>

              <button className="h-[36px] px-4 rounded-[10px] text-[#2C3635] border border-[#E7E9E9] bg-[#F3F4F4] text-[14px] font-[500] whitespace-nowrap flex items-center gap-2">
                <Sparkles
                  size={16}
                  className="text-primary drop-shadow-[0_0_3px_rgba(59,130,246,0.6)]"
                  fill="currentColor"
                  stroke="none"
                />
                Ask LegalGraph AI
              </button>

              <button
                className="
    h-[36px]
    px-4
    rounded-[10px]
    flex items-center gap-2
    text-[14px] font-[500]
    whitespace-nowrap
    border border-primary
    text-primary
    bg-white
    transition
    hover:bg-primary/5
  "
              >
                {/* blue circle */}
                <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Info size={16} strokeWidth={2} className="text-white" />
                </span>
                Help
              </button>
            </div>

            {/* USER */}
            <div className="flex items-center gap-2 pl-0 sm:pl-3 sm:border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-avatar flex items-center justify-center text-avatar-text text-[14px]">
                S
              </div>
              <div className="hidden md:block leading-tight">
                <p className="text-[14px]">Shubham</p>
                <p className="text-[13px] text-gray-500">shubham@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
