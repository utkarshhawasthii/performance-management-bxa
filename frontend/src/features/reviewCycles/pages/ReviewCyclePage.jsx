import { useEffect, useState } from "react";
import {
  getReviewCyclesApi,
  activateReviewCycleApi,
  closeReviewCycleApi
} from "../reviewCycles.api";
import CreateReviewCycleForm from "../components/CreateReviewCycleForm";

const ReviewCyclePage = () => {
  const [cycles, setCycles] = useState([]);

  useEffect(() => {
    getReviewCyclesApi().then(res => setCycles(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Review Cycles</h2>

      <CreateReviewCycleForm />

      {cycles.map(c => (
        <div key={c.id} className="border p-4 rounded">
          <p><strong>{c.name}</strong> — {c.status}</p>

          {c.status === "DRAFT" && (
            <button
              onClick={() => activateReviewCycleApi(c.id)}
              className="mr-2 px-3 py-1 bg-green-600 text-white rounded"
            >
              Activate
            </button>
          )}

          {c.status === "ACTIVE" && (
            <button
              onClick={() => closeReviewCycleApi(c.id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Close
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewCyclePage;
