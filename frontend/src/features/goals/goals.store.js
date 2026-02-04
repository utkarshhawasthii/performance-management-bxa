import {
  getMyGoalsApi,
  createGoalApi,
  submitGoalApi,
  approveGoalApi,
  rejectGoalApi,
  getTeamGoalsApi,   // API function
  updateKeyResultProgressApi
} from "./goals.api";


const initialState = {
  goals: [],
  page: 0,
  totalPages: 0,
  loading: false,
  error: null
};


let state = { ...initialState };
let listeners = [];

export const goalsStore = {
  getState: () => state,
  subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }
};

function setState(newState) {
  state = { ...state, ...newState };
  listeners.forEach(l => l(state));
}

export async function fetchMyGoals(page = 0) {
  try {
    setState({ loading: true });

    const res = await getMyGoalsApi(page);

    console.log("Goals API response:", res.data); //  ADD THIS

    setState({
      goals: res.data.content || [],   //  IMPORTANT
      page: res.data.number,
      totalPages: res.data.totalPages,
      loading: false
    });
  } catch (e) {
    console.error("Fetch goals failed", e);
    setState({
      goals: [],
      loading: false
    });
  }
}

export async function createGoal(payload) {
  await createGoalApi(payload);
  fetchMyGoals();
}

export async function submitGoal(id) {
  await submitGoalApi(id);
  fetchMyGoals();
}

export async function approveGoal(id) {
  await approveGoalApi(id);
  fetchTeamGoals();
}


export async function rejectGoal(id, reason) {
  await rejectGoalApi(id, reason);
  fetchTeamGoals(); // refresh manager view
}

export async function fetchTeamGoals(page = 0) {
  try {
    setState({ loading: true });
    const res = await getTeamGoalsApi(page);
    setState({
      goals: res.data.content || [],
      page: res.data.number,
      totalPages: res.data.totalPages,
      loading: false
    });
  } catch {
    setState({ goals: [], loading: false });
  }
}

export async function updateKeyResultProgress(keyResultId, value) {
  try {
    await updateKeyResultProgressApi(keyResultId, value);

    // 🔥 Optimistic update in store
    setState({
      myGoals: state.myGoals.map(goal => ({
        ...goal,
        keyResults: goal.keyResults.map(kr =>
          kr.id === keyResultId
            ? { ...kr, currentValue: value }
            : kr
        )
      })),
      teamGoals: state.teamGoals.map(goal => ({
        ...goal,
        keyResults: goal.keyResults.map(kr =>
          kr.id === keyResultId
            ? { ...kr, currentValue: value }
            : kr
        )
      }))
    });
  } catch (e) {
    alert("Failed to update progress");
  }
}




