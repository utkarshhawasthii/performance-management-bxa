import { useEffect, useState } from "react";
import { goalsStore, fetchTeamGoals } from "../goals.store";
import GoalsTable from "../components/GoalsTable";
import { GOAL_STATUS } from "../goals.constants";

const TeamGoalsPage = () => {
  const [state, setState] = useState(goalsStore.getState());

  useEffect(() => {
    const unsub = goalsStore.subscribe(setState);
    fetchTeamGoals();
    return unsub;
  }, []);

  // 🔥 FILTER: show only SUBMITTED goals
  const pendingGoals = (state.teamGoals || []).filter(
    (g) => g.status === GOAL_STATUS.SUBMITTED
  );

  return (
    <div className="space-y-6">

      {/* --- Page Header --- */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team Goals</h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of objectives assigned to your direct reports.
        </p>
      </div>

      {/* --- Goals List --- */}
      <GoalsTable goals={pendingGoals} />
    </div>
  );
};

export default TeamGoalsPage;
