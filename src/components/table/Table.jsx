import { useCOI } from "../../context/COIContext";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table() {
  const { paginatedCois } = useCOI();

  return (
    <div className="border border-[#DCDEDE] rounded-t-[8px] overflow-hidden">
      <TableHeader />
      {paginatedCois?.map((coi) => (
        <TableRow key={coi.id} coi={coi} />
      ))}
    </div>
  );
}

export default Table;
