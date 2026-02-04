import { useState } from "react";
import { calibrateRating } from "../ratings.store";

const CalibrateRatingForm = ({ rating }) => {
  const [newScore, setNewScore] = useState(rating.score);
  const [justification, setJustification] = useState("");

  return (
    <div className="space-y-2 mt-3">
      <select
        className="border p-2 w-full"
        value={newScore}
        onChange={(e) => setNewScore(e.target.value)}
      >
        {[1,2,3,4,5].map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <textarea
        rows={3}
        className="border p-2 w-full"
        placeholder="Calibration justification"
        value={justification}
        onChange={(e) => setJustification(e.target.value)}
      />

      <button
        onClick={() =>
          calibrateRating(rating.id, {
            newScore,
            justification
          })
        }
        className="px-3 py-1 bg-purple-600 text-white rounded"
      >
        Calibrate
      </button>
    </div>
  );
};

export default CalibrateRatingForm;
