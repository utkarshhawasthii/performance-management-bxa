import { useEffect, useState } from "react";
import { ratingsStore, fetchRatingsForActiveCycle } from "../ratings.store";
import CalibrateRatingForm from "../components/CalibrateRatingForm";

const TeamRatingsPage = () => {
  const [state, setState] = useState(ratingsStore.getState());

  useEffect(() => {
    const unsub = ratingsStore.subscribe(setState);
    fetchRatingsForActiveCycle(); // or active cycle id later
    return unsub;
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Team Ratings</h1>

      {state.ratings.map((r) => (
        <div key={r.id} className="bg-white p-5 rounded-xl border">
          <p className="font-semibold">Employee ID: {r.employeeId}</p>
          <p>Status: {r.status}</p>
          <p>Score: {r.score}</p>

          {r.status === "MANAGER_SUBMITTED" && (
            <p className="text-green-600 font-medium">
              Submitted ✔
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamRatingsPage;
