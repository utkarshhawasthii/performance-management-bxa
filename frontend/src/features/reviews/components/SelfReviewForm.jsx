import { useState } from "react";
import { submitSelfReview } from "../reviews.store";

const SelfReviewForm = ({ review }) => {
  const [comments, setComments] = useState("");

  return (
    <div className="space-y-3">
      <textarea
        rows={5}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="w-full border rounded p-2"
        placeholder="Write your self review..."
      />
      <button
        onClick={() => submitSelfReview(review.id, comments)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit Self Review
      </button>
    </div>
  );
};

export default SelfReviewForm;
