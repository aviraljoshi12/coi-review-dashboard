function TableContainer({ children }) {
  return (
    <div className="bg-[#F9FAFA] rounded-[16px] p-3">
      <div className="bg-white border border-[#DCDEDE] rounded-[12px] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default TableContainer;
