import { useEffect, useState } from "react";
import {
  ratingsStore,
  fetchRatingsForActiveCycle
} from "../ratings.store";
import CalibrateRatingForm from "../components/CalibrateRatingForm";

const HrCalibrationPage = () => {
  const [state, setState] = useState(ratingsStore.getState());

  useEffect(() => {
    const unsub = ratingsStore.subscribe(setState);
    fetchRatingsForActiveCycle();
    return unsub;
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">HR Calibration</h1>

      {state.ratings.map((r) => (
        <div key={r.id} className="bg-white p-4 rounded border">
          <p>Employee: {r.employeeId}</p>
          <p>Status: {r.status}</p>
          <p>Score: {r.score}</p>

          <CalibrateRatingForm
            rating={r}
            onDone={fetchRatingsForActiveCycle}
          />
        </div>
      ))}
    </div>
  );
};

export default HrCalibrationPage;
