import { useEffect, useState } from "react";
import { ratingsStore, fetchRatings } from "../ratings.store";
import RatingCard from "../components/RatingCard";
import { authStore } from "../../../auth/auth.store";

const HrCalibrationPage = () => {
  const [state, setState] = useState(ratingsStore.getState());
  const role = authStore.getState().user.role;

  useEffect(() => {
    const unsub = ratingsStore.subscribe(setState);
    fetchRatings(); // active cycle assumed
    return unsub;
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">HR Calibration</h2>
      {state.ratings.map(r => (
        <RatingCard key={r.id} rating={r} role={role} />
      ))}
    </div>
  );
};

export default HrCalibrationPage;
