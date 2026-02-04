import { useState } from "react";
import { submitManagerReview } from "../reviews.store";

const ManagerReviewForm = ({ review }) => {
  const [comments, setComments] = useState("");

  return (
    <div className="space-y-3">
      <textarea
        rows={5}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="w-full border rounded p-2"
        placeholder="Write manager feedback..."
      />
      <button
        onClick={() => submitManagerReview(review.id, comments)}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Submit Manager Review
      </button>
    </div>
  );
};

export default ManagerReviewForm;
