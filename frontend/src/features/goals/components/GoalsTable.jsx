import { submitGoal, approveGoal, rejectGoal } from "../goals.store";
import { authStore } from "../../../auth/auth.store";
import KeyResultProgress from "./KeyResultProgress";

const GoalsTable = ({ goals }) => {
  const { user } = authStore.getState();
  const role = user?.role;

  // 🔒 Safety: handle empty / undefined goals
  if (!Array.isArray(goals) || goals.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl border border-dashed border-slate-300 text-center text-slate-500">
        <p>No goals found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {goals.map((goal, index) => (
        <div
          key={goal?.id ?? `${goal?.title || "goal"}-${index}`}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
        >
          {/* -------- GOAL HEADER -------- */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {goal?.title || "Untitled goal"}
              </h3>
              {goal?.description && (
                <p className="text-slate-500 text-sm mt-1">
                  {goal?.description}
                </p>
              )}
            </div>

            <span
              className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase
                ${
                  goal?.status === "COMPLETED"
                    ? "bg-green-100 text-green-700"
                    : goal?.status === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : goal?.status === "SUBMITTED"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
            >
              {goal?.status || "UNKNOWN"}
            </span>
          </div>

          {/* -------- KEY RESULTS -------- */}
          <div className="space-y-3">
            {Array.isArray(goal?.keyResults) &&
              goal.keyResults.map((kr) => (
                <KeyResultProgress key={kr.id} kr={kr} />
              ))}
          </div>

          {/* -------- ACTIONS -------- */}
          <div className="flex gap-3 mt-4">
            {/* EMPLOYEE: Submit */}
            {role === "EMPLOYEE" &&
              goal?.status === "DRAFT" && (
                <button
                  onClick={() => submitGoal(goal?.id)}
                  className="px-4 py-1.5 text-sm font-semibold rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              )}

            {/* MANAGER: Approve / Reject */}
            {role === "MANAGER" &&
              goal?.status === "SUBMITTED" && (
                <>
                  <button
                    onClick={() => approveGoal(goal?.id)}
                    className="px-4 py-1.5 text-sm font-semibold rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => {
                      const reason = prompt("Rejection reason:");
                      if (reason) rejectGoal(goal?.id, reason);
                    }}
                    className="px-4 py-1.5 text-sm font-semibold rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Reject
                  </button>
                </>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoalsTable;
