import { useState } from "react";
import { useCOI } from "../../context/COIContext";

function AddCOIModal({ onClose }) {
  const { addCOI } = useCOI();

  const [form, setForm] = useState({
    property: "",
    tenantName: "",
    tenantEmail: "",
    unit: "",
    coiName: "",
    expiryDate: "",
    status: "Active",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (
      !form.property ||
      !form.tenantName ||
      !form.tenantEmail ||
      !form.unit ||
      !form.coiName ||
      !form.expiryDate
    ) {
      alert("Please fill all required fields");
      return;
    }

    addCOI(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[720px] rounded-[12px] p-6 space-y-5">
        {/* Header */}
        <div>
          <h2 className="text-[18px] font-[600]">Add New COI</h2>
          <p className="text-[14px] text-status-neutral">
            Create a new certificate of insurance
          </p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-[14px]">
          <Input
            label="Property"
            value={form.property}
            onChange={(v) => handleChange("property", v)}
          />
          <Input
            label="Tenant Name"
            value={form.tenantName}
            onChange={(v) => handleChange("tenantName", v)}
          />
          <Input
            label="Tenant Email"
            value={form.tenantEmail}
            onChange={(v) => handleChange("tenantEmail", v)}
          />
          <Input
            label="Unit"
            value={form.unit}
            onChange={(v) => handleChange("unit", v)}
          />
          <Input
            label="COI Name"
            value={form.coiName}
            onChange={(v) => handleChange("coiName", v)}
          />

          <div>
            <label className="block text-status-muted mb-1">Expiry Date</label>
            <input
              type="date"
              value={form.expiryDate}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
              className="h-[36px] w-full border border-[#E7E9E9] rounded-[8px] px-3"
            />
          </div>

          <div>
            <label className="block text-status-muted mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
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
            onClick={onClose}
            className="h-[36px] px-4 border border-[#E7E9E9] rounded-[8px]"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="h-[36px] px-4 rounded-[8px] text-white bg-primary"
          >
            Create COI
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-status-muted mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[36px] w-full border border-[#E7E9E9] rounded-[8px] px-3"
      />
    </div>
  );
}

export default AddCOIModal;
