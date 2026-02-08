function TableContainer({ children }) {
  return (
    <div className="bg-[#F9FAFA] border border-[#DCDEDE] rounded-[16px]">
      <div className="overflow-x-auto">
        <div className="min-w-[1200px] space-y-4 p-4">{children}</div>
      </div>
    </div>
  );
}

export default TableContainer;
