import FiltersRow from "../components/filters/FiltersRow";
import SummaryCards from "../components/summary/SummaryCards";
import Pagination from "../components/table/Pagination";
import Table from "../components/table/Table";
import TableContainer from "../components/table/TableContainer";

function Dashboard() {
  return (
    <div className="space-y-8">
      <SummaryCards />
      <TableContainer>
        <FiltersRow />
        <Table />
        <Pagination />
      </TableContainer>
    </div>
  );
}

export default Dashboard;
