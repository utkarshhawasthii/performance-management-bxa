import { useState } from "react";
import { createRating } from "../ratings.store";

const CreateRatingForm = () => {
  const [form, setForm] = useState({
    employeeId: "",
    score: "",
    managerJustification: ""
  });

  return (
    <div className="border p-4 rounded space-y-3">
      <input
        placeholder="Employee ID"
        className="border p-2 w-full"
        value={form.employeeId}
        onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
      />

      <select
        className="border p-2 w-full"
        value={form.score}
        onChange={(e) => setForm({ ...form, score: e.target.value })}
      >
        <option value="">Select Score</option>
        <option value="1">1 – Unsatisfactory</option>
        <option value="2">2 – Needs Improvement</option>
        <option value="3">3 – Meets Expectations</option>
        <option value="4">4 – Exceeds Expectations</option>
        <option value="5">5 – Outstanding</option>
      </select>

      <textarea
        rows={3}
        className="border p-2 w-full"
        placeholder="Manager justification"
        value={form.managerJustification}
        onChange={(e) =>
          setForm({ ...form, managerJustification: e.target.value })
        }
      />

      <button
        onClick={() => createRating(form)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Create Rating
      </button>
    </div>
  );
};

export default CreateRatingForm;
