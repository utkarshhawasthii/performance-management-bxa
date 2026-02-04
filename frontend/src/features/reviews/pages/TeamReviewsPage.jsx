import { useEffect, useState } from "react";
import { reviewsStore, fetchManagerReviews } from "../reviews.store";
import ManagerReviewForm from "../components/ManagerReviewForm";

const TeamReviewsPage = () => {
  const [state, setState] = useState(reviewsStore.getState());

  useEffect(() => {
    const unsub = reviewsStore.subscribe(setState);
    fetchManagerReviews();
    return unsub;
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Team Reviews</h2>
      {state.reviews.map(r => (
        <div key={r.id} className="mb-6 p-4 border rounded">
          <p className="text-sm text-slate-600">
            Employee ID: {r.employeeId}
          </p>

          {r.selfReviewComments && (
            <p className="mt-2">
              <strong>Self:</strong> {r.selfReviewComments}
            </p>
          )}

          {!r.managerReviewComments && (
            <ManagerReviewForm review={r} />
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamReviewsPage;
