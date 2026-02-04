import {
  submitRating,
  finalizeRating
} from "../ratings.store";
import CalibrateRatingForm from "./CalibrateRatingForm";

const RatingCard = ({ rating, role }) => {
  return (
    <div className="border p-4 rounded space-y-2">
      <p>Employee ID: {rating.employeeId}</p>
      <p>Status: {rating.status}</p>
      <p>Score: {rating.score}</p>

      {role === "MANAGER" && rating.status === "DRAFT" && (
        <button
          onClick={() => submitRating(rating.id)}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      )}

      {role === "HR" && rating.status === "MANAGER_SUBMITTED" && (
        <CalibrateRatingForm rating={rating} />
      )}

      {role === "LEADERSHIP" && rating.status === "HR_CALIBRATED" && (
        <button
          onClick={() => finalizeRating(rating.id)}
          className="px-3 py-1 bg-black text-white rounded"
        >
          Finalize
        </button>
      )}
    </div>
  );
};

export default RatingCard;
