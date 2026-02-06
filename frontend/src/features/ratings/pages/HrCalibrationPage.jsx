import { useEffect, useState } from "react";
import {
  ratingsStore,
  fetchRatingsForActiveCycle
} from "../ratings.store";
import CalibrateRatingForm from "../components/CalibrateRatingForm";

const HrCalibrationPage = ({ cycleId }) => {
  const [state, setState] = useState(ratingsStore.getState());

  useEffect(() => {
    const unsub = ratingsStore.subscribe(setState);
    fetchRatings(cycleId);
    return unsub;
  }, [cycleId]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">HR Calibration</h1>

      {state.ratings.map(r => (
        <div key={r.id} className="bg-white p-4 rounded border">
          <p>Employee: {r.employeeId}</p>
          <p>Status: {r.status}</p>
          <p>Score: {r.score}</p>

          <CalibrateRatingForm rating={r} />
        </div>
      ))}
    </div>
  );
};

export default HrCalibrationPage;
