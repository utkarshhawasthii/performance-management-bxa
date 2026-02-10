import { useEffect, useState } from "react";
import { createDepartment, updateDepartment } from "../departments.store";

const DepartmentForm = ({ initialData, onDone }) => {
  const [form, setForm] = useState({
    type: "",
    displayName: "",
    headId: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        type: initialData.type || "",
        displayName: initialData.displayName || "",
        headId: initialData.headId ?? ""
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      type: form.type,
      displayName: form.displayName,
      headId: form.headId === "" ? null : Number(form.headId)
    };

    if (initialData?.id) {
      await updateDepartment(initialData.id, payload);
    } else {
      await createDepartment(payload);
      setForm({ type: "", displayName: "", headId: "" });
    }

    setLoading(false);
    if (onDone) onDone();
  };

  const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition shadow-sm";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-end gap-4">

      <div className="w-full md:w-1/3">
        <label className="block text-xs font-medium text-slate-700 mb-1">Department Type</label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          required
          disabled={Boolean(initialData?.id)}
          className={inputClass}
        >
          <option value="">Select Type...</option>
          <option value="ENGINEERING">Engineering</option>
          <option value="HR">Human Resources</option>
          <option value="SALES">Sales</option>
          <option value="MARKETING">Marketing</option>
          <option value="FINANCE">Finance</option>
        </select>
      </div>

      <div className="w-full md:w-1/3">
        <label className="block text-xs font-medium text-slate-700 mb-1">Display Name</label>
        <input
          placeholder="e.g. Financial Operations"
          value={form.displayName}
          onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          className={inputClass}
          required
        />
      </div>

      <div className="w-full md:w-1/4">
        <label className="block text-xs font-medium text-slate-700 mb-1">Head ID (optional)</label>
        <input
          type="number"
          min="1"
          placeholder="e.g. 12"
          value={form.headId}
          onChange={(e) => setForm({ ...form, headId: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="w-full md:w-auto">
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? "Saving..." : initialData?.id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;
