import { useParams, useNavigate } from "react-router-dom";
import { useCOI } from "../context/COIContext";

function COIDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cois, updateStatus, deleteCOI, updateExpiryDate } = useCOI();

  const coi = cois.find((c) => c.id === id);
  if (!coi) return <div className="p-6">COI not found</div>;

  return (
    <div className=" max-w-[720px]">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[14px] text-status-neutral">
          View and manage certificate of insurance
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-[#E7E9E9] rounded-[12px] p-6 space-y-5">
        {/* Metadata */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-[14px]">
          <div>
            <p className="text-status-muted mb-1">Property</p>
            <p className="font-[500]">{coi.property}</p>
          </div>

          <div>
            <p className="text-status-muted mb-1">Tenant</p>
            <p className="font-[500]">{coi.tenantName}</p>
          </div>

          <div>
            <p className="text-status-muted mb-1">Unit</p>
            <p className="font-[500]">{coi.unit}</p>
          </div>

          <div>
            <p className="text-status-muted mb-1">COI Name</p>
            <p className="font-[500] truncate">{coi.coiName}</p>
          </div>
        </div>

        <div className="h-[1px] bg-[#E7E9E9]" />

        {/* Editable fields */}
        <div className="grid grid-cols-2 gap-6">
          {/* Expiry */}
          <div>
            <label className="block text-[14px] text-status-muted mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              value={coi.expiryDate}
              onChange={(e) => updateExpiryDate(coi.id, e.target.value)}
              className="h-[36px] w-full border border-[#E7E9E9] rounded-[8px] px-3 text-[14px]"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-[14px] text-status-muted mb-1">
              Status
            </label>
            <select
              value={coi.status}
              onChange={(e) => updateStatus(coi.id, e.target.value)}
              className="h-[36px] w-full border border-[#E7E9E9] rounded-[8px] px-3 text-[14px]"
            >
              <option>Active</option>
              <option>Expired</option>
              <option>Rejected</option>
              <option>Expiring Soon</option>
              <option>Not Processed</option>
            </select>
          </div>
        </div>

        <div className="h-[1px] bg-[#E7E9E9]" />

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="h-[36px] px-4 border border-[#E7E9E9] rounded-[8px] text-[14px]"
          >
            Back
          </button>

          <button
            onClick={() => {
              deleteCOI(coi.id);
              navigate("/dashboard");
            }}
            className="h-[36px] px-4 rounded-[8px] text-[14px] text-white bg-status-rejected"
          >
            Delete COI
          </button>
        </div>
      </div>
    </div>
  );
}

export default COIDetail;
