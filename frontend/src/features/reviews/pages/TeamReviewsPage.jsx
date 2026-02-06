import { useEffect, useState } from "react";
import { getTeamReviewsApi, submitManagerReviewApi } from "../reviews.api";
import ManagerReviewForm from "../components/ManagerReviewForm";

const TeamReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getTeamReviewsApi().then((res) => {
      setReviews(res.data || []);
    });
  }, []);

  const canManagerReview = (review) =>
    review.status === "SELF_REVIEW_SUBMITTED";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Team Reviews</h1>

      {reviews.length === 0 && (
        <p className="text-slate-500">No reviews assigned.</p>
      )}

      {reviews.map((r) => (
        <div key={r.id} className="bg-white p-5 rounded-xl border space-y-3">

          {/* Header */}
          <div className="flex justify-between items-center">
            <p className="font-semibold">Employee ID: {r.employeeId}</p>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100">
              {r.status}
            </span>
          </div>

          {/* Self review */}
          <div>
            <p className="text-sm text-slate-500">Self Review</p>
            <p className="italic">
              {r.selfReviewComments || "Not submitted yet"}
            </p>
          </div>

          {/* ✅ Manager review submitted message */}
          {r.status === "MANAGER_REVIEW_SUBMITTED" && (
            <p className="text-green-600 font-medium">
              Manager review submitted ✔
            </p>
          )}

          {/* Manager review form */}
          {r.status === "SELF_REVIEW_SUBMITTED" && (
            <ManagerReviewForm review={r} />
          )}

          {/* Locked state */}
          {r.status === "NOT_STARTED" && (
            <p className="text-sm text-slate-400 italic">
              Waiting for employee self-review
            </p>
          )}

        </div>
      ))}

    </div>
  );
};

export default TeamReviewsPage;
