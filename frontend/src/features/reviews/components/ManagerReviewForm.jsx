import { useState } from "react";
import { submitManagerReviewApi } from "../reviews.api";

const ManagerReviewForm = ({ review }) => {
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!comments.trim()) return;
    setLoading(true);
    await submitManagerReviewApi(review.id, comments);
    window.location.reload(); // simple refresh (we’ll optimize later)
  };

  return (
    <div className="space-y-2">
      <textarea
        rows={4}
        placeholder="Manager feedback"
        className="w-full border rounded p-2"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Submit Manager Review
      </button>
    </div>
  );
};

export default ManagerReviewForm;
