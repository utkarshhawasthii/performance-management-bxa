import { useEffect, useState } from "react";
import { getMyReviewApi, submitSelfReviewApi } from "../reviews.api";

const MyReviewPage = () => {
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMyReviewApi().then(res => {
      setReview(res.data);
      setComments(res.data.selfReviewComments || "");
    });
  }, []);

  if (!review) return <p>No active review cycle.</p>;

  const submit = async () => {
    setLoading(true);
    await submitSelfReviewApi(review.id, comments);
    setLoading(false);
    alert("Self review submitted");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">My Review</h1>

      <div className="bg-white p-6 rounded-xl border">
        <h2 className="font-semibold mb-2">Self Review</h2>

        <textarea
          rows={6}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full border rounded p-3"
        />

        <button
          disabled={loading}
          onClick={submit}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Submit Self Review
        </button>
      </div>
    </div>
  );
};

export default MyReviewPage;
