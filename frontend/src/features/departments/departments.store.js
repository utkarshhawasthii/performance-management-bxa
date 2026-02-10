import {
  getDepartmentsApi,
  createDepartmentApi,
  updateDepartmentApi,
  deleteDepartmentApi
} from "./departments.api";

const initialState = {
  departments: [],
  loading: false,
  error: null
};

let state = { ...initialState };
let listeners = [];

export const departmentsStore = {
  getState() {
    return state;
  },
  subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }
};

function setState(newState) {
  state = { ...state, ...newState };
  listeners.forEach((l) => l(state));
}

export async function fetchDepartments() {
  try {
    setState({ loading: true, error: null });

    const res = await getDepartmentsApi();
    setState({
      departments: (res.data || []).filter((d) => d.active !== false),
      loading: false
    });
  } catch {
    setState({ error: "Failed to load departments", loading: false });
  }
}

export async function createDepartment(payload) {
  await createDepartmentApi(payload);
  await fetchDepartments();
}

export async function updateDepartment(id, payload) {
  await updateDepartmentApi(id, payload);
  await fetchDepartments();
}

export async function deleteDepartment(id) {
  await deleteDepartmentApi(id);
  await fetchDepartments();
}
