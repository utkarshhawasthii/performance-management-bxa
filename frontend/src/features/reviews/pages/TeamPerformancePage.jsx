import { useEffect, useMemo, useState } from "react";
import { getTeamReviewsApi } from "../reviews.api";
import ManagerReviewForm from "../components/ManagerReviewForm";

const TEAM_REVIEW_STATUSES = [
  "ALL",
  "NOT_STARTED",
  "SELF_REVIEW_SUBMITTED",
  "MANAGER_REVIEW_SUBMITTED"
];

const TeamPerformancePage = () => {
  const [reviews, setReviews] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    getTeamReviewsApi().then((res) => {
      setReviews(res.data || []);
    });
  }, []);

  const summary = useMemo(() => {
    const total = reviews.length;
    const awaitingSelf = reviews.filter((review) => review.status === "NOT_STARTED").length;
    const awaitingManager = reviews.filter((review) => review.status === "SELF_REVIEW_SUBMITTED").length;
    const completed = reviews.filter((review) => review.status === "MANAGER_REVIEW_SUBMITTED").length;

    return {
      total,
      awaitingSelf,
      awaitingManager,
      completed
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (statusFilter === "ALL") {
      return reviews;
    }

    return reviews.filter((review) => review.status === statusFilter);
  }, [reviews, statusFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team Performance</h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor your team through the active review cycle and submit manager evaluations.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Team Members</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.total}</p>
        </div>
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-yellow-700">Awaiting Self Review</p>
          <p className="mt-1 text-2xl font-semibold text-yellow-800">{summary.awaitingSelf}</p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-blue-700">Need Manager Review</p>
          <p className="mt-1 text-2xl font-semibold text-blue-800">{summary.awaitingManager}</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-green-700">Manager Submitted</p>
          <p className="mt-1 text-2xl font-semibold text-green-800">{summary.completed}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Review Progress
          </h2>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            {TEAM_REVIEW_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status === "ALL" ? "All statuses" : status}
              </option>
            ))}
          </select>
        </div>

        {filteredReviews.length === 0 && (
          <p className="text-slate-500">No reviews found for the selected status.</p>
        )}

        {filteredReviews.map((review) => (
          <div key={review.id} className="rounded-xl border border-slate-200 p-5 space-y-3">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-slate-900">Employee ID: {review.employeeId}</p>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-700">
                {review.status}
              </span>
            </div>

            <div>
              <p className="text-sm text-slate-500">Self Review</p>
              <p className="italic text-slate-700">
                {review.selfReviewComments || "Not submitted yet"}
              </p>
            </div>

            {review.status === "MANAGER_REVIEW_SUBMITTED" && (
              <p className="text-green-600 font-medium">Manager review submitted ✔</p>
            )}

            {review.status === "SELF_REVIEW_SUBMITTED" && (
              <ManagerReviewForm review={review} />
            )}

            {review.status === "NOT_STARTED" && (
              <p className="text-sm text-slate-400 italic">Waiting for employee self-review</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPerformancePage;
