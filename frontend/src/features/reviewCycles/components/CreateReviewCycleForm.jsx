import { useState } from "react";
import { createReviewCycleApi } from "../reviewCycles.api";

const CreateReviewCycleForm = () => {
  const [form, setForm] = useState({
    name: "",
    selfReviewEnabled: true,
    managerReviewEnabled: true,
    startDate: "",
    endDate: ""
  });

  const submit = async () => {
    await createReviewCycleApi(form);
    alert("Review cycle created");
  };

  return (
    <div className="space-y-3 border p-4 rounded">
      <input
        placeholder="Cycle Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full"
      />

      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={form.selfReviewEnabled}
          onChange={(e) =>
            setForm({ ...form, selfReviewEnabled: e.target.checked })
          }
        />
        Self Review Enabled
      </label>

      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={form.managerReviewEnabled}
          onChange={(e) =>
            setForm({ ...form, managerReviewEnabled: e.target.checked })
          }
        />
        Manager Review Enabled
      </label>

      <input
        type="date"
        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
      />
      <input
        type="date"
        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
      />

      <button
        onClick={submit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Create Review Cycle
      </button>
    </div>
  );
};

export default CreateReviewCycleForm;
