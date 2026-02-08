function SummaryCard({ label, value, bgClass, icon, iconColor }) {
  return (
    <div className={`${bgClass} rounded-card p-4`}>
      <p className="font-inter-display text-[16px] font-[500] mb-[12px]">
        {label}
      </p>

      {/* White box */}
      <div className="bg-white rounded-card h-[52px] flex items-center px-[12px]">
        {/* Icon wrapper */}
        <div className="w-[24px] h-[24px] flex items-center justify-center mr-[12px]">
          <span className={iconColor}>{icon}</span>
        </div>

        {/* Value */}
        <span className="font-[typography/family/default] text-[24px] font-[500]">
          {value}
        </span>
      </div>
    </div>
  );
}

export default SummaryCard;
