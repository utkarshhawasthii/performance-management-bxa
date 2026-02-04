import {
  createRatingApi,
  submitRatingApi,
  calibrateRatingApi,
  finalizeRatingApi,
  getRatingsForCycleApi
} from "./ratings.api";

const initialState = {
  ratings: [],
  loading: false
};

let state = { ...initialState };
let listeners = [];

export const ratingsStore = {
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

export async function fetchRatings(cycleId) {
  const res = await getRatingsForCycleApi(cycleId);
  setState({ ratings: res.data.content });
}

export async function createRating(payload) {
  await createRatingApi(payload);
}

export async function submitRating(id) {
  await submitRatingApi(id);
}

export async function calibrateRating(id, payload) {
  await calibrateRatingApi(id, payload);
}

export async function finalizeRating(id) {
  await finalizeRatingApi(id);
}
