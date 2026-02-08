import { useParams, useNavigate } from "react-router-dom";
import { useCOI } from "../context/COIContext";

function COIEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cois, updateCOI, deleteCOI } = useCOI();

  const coi = cois.find((c) => c.id === id);

  if (!coi) {
    return <div className="p-6">COI not found</div>;
  }

  return (
    <div className="max-w-[720px]">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[14px] text-status-neutral">
          Edit certificate of insurance
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-[#E7E9E9] rounded-[12px] p-6 space-y-5">
        {/* Editable Metadata */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-[14px]">
          {/* Property */}
          <div>
            <label className="text-status-muted mb-1 block">Property</label>
            <input
              value={coi.property}
              onChange={(e) => updateCOI(coi.id, { property: e.target.value })}
              className="h-[36px] w-full border border-[#E7E9E9] rounded-[8px] px-3"
            />
          </div>

          {/* Tenant */}
          <div>
            <label className="text-status-muted mb-1 block">Tenant</label>
            <input
              value={coi.tenantName}
              onChange={(e) =>
                updateCOI(coi.id, { tenantName: e.target.value })
              }
              className="h-[36px] w-full border border-[#E7E9E9] rounded-[8px] px-3"
            />
          </div>

          {/* Unit */}
          <div>
            <label className="text-status-muted mb-1 block">Unit</label>
            <input
              value={coi.unit}
              onChange={(e) => updateCOI(coi.id, { unit: e.target.value })}
              className="h-[36px] w-full border border-[#E7E9E9] rounded-[8px] px-3"
            />
          </div>

          {/* COI Name */}
          <div>
            <label className="text-status-muted mb-1 block">COI Name</label>
            <input
              value={coi.coiName}
              onChange={(e) => updateCOI(coi.id, { coiName: e.target.value })}
              className="h-[36px] w-full border border-[#E7E9E9] rounded-[8px] px-3"
            />
          </div>
        </div>

        <div className="h-[1px] bg-[#E7E9E9]" />

        {/* Editable Fields */}
        <div className="grid grid-cols-2 gap-6">
          {/* Expiry Date */}
          <div>
            <label className="block text-[14px] text-status-muted mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              value={coi.expiryDate}
              onChange={(e) =>
                updateCOI(coi.id, { expiryDate: e.target.value })
              }
              className="h-[36px] w-full border border-[#E7E9E9] rounded-[8px] px-3"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-[14px] text-status-muted mb-1">
              Status
            </label>
            <select
              value={coi.status}
              onChange={(e) => updateCOI(coi.id, { status: e.target.value })}
              className="h-[36px] w-full border border-[#E7E9E9] rounded-[8px] px-3"
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
        </div>
      </div>
    </div>
  );
}

export default COIEdit;
