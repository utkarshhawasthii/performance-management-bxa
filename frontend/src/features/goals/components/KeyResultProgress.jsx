import { updateKeyResultProgress } from "../goals.store";
import { authStore } from "../../../auth/auth.store";
import { useState, useEffect } from "react";

const KeyResultProgress = ({ kr }) => {
  // 🔒 Guard: prevents crash during initial renders
  if (!kr) return null;

  const { user } = authStore.getState();

  // 🔁 Keep local state in sync with backend updates
  const [value, setValue] = useState(kr.currentValue ?? 0);

  useEffect(() => {
    setValue(kr.currentValue ?? 0);
  }, [kr.currentValue]);

  const progress =
    kr.targetValue > 0
      ? Math.min(
          100,
          Math.round((kr.currentValue / kr.targetValue) * 100)
        )
      : 0;

  const canEdit = user?.role === "EMPLOYEE";

  return (
    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium text-slate-700">
          {kr.metric}
        </span>
        <span className="text-slate-500 text-xs">
          {kr.currentValue} /{" "}
          <span className="text-slate-900 font-semibold">
            {kr.targetValue}
          </span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Employee-only edit */}
      {canEdit && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            min="0"
            max={kr.targetValue}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-20 px-2 py-1 border rounded text-sm"
          />
          <button
            onClick={() =>
              updateKeyResultProgress(kr.id, value)
            }
            className="px-3 py-1 text-xs font-semibold rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default KeyResultProgress;
