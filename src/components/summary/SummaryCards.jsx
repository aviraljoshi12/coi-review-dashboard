import { useCOI } from "../../context/COIContext";
import SummaryCard from "./SummaryCard";
import { FileText, FileCheck, FileX, Clock } from "lucide-react";

function SummaryCards() {
  const { cois } = useCOI();

  const total = cois.length;
  const accepted = cois.filter((c) => c.status === "Active").length;
  const rejected = cois.filter((c) => c.status === "Rejected").length;

  const expiringSoon = cois.filter((c) => {
    const expiry = new Date(c.expiryDate);
    const today = new Date();
    const in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);
    return expiry >= today && expiry <= in30Days;
  }).length;

  return (
    <div
      className="
        grid gap-4
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      <SummaryCard
        label="Total COI Processed"
        value={total}
        bgClass="bg-card-info"
        icon={<FileText size={20} />}
        iconColor="text-primary"
      />

      <SummaryCard
        label="Accepted"
        value={accepted}
        bgClass="bg-card-success"
        icon={<FileCheck size={20} />}
        iconColor="text-success"
      />

      <SummaryCard
        label="Rejected"
        value={rejected}
        bgClass="bg-card-error"
        icon={<FileX size={20} />}
        iconColor="text-status-rejected"
      />

      <SummaryCard
        label="Expiring in 30 days"
        value={expiringSoon}
        bgClass="bg-card-warning"
        icon={<Clock size={20} />}
        iconColor="text-status-expired"
      />
    </div>
  );
}

export default SummaryCards;
