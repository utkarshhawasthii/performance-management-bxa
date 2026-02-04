import {
  submitSelfReviewApi,
  submitManagerReviewApi,
  getManagerReviewsApi
} from "./reviews.api";

const initialState = {
  reviews: [],
  loading: false,
  error: null
};

let state = { ...initialState };
let listeners = [];

export const reviewsStore = {
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

// ---------- EMPLOYEE ----------
export async function submitSelfReview(id, comments) {
  await submitSelfReviewApi(id, { comments });
}

// ---------- MANAGER ----------
export async function fetchManagerReviews() {
  try {
    setState({ loading: true });
    const res = await getManagerReviewsApi();
    setState({
      reviews: res.data.content,
      loading: false
    });
  } catch {
    setState({ reviews: [], loading: false });
  }
}

export async function submitManagerReview(id, comments) {
  await submitManagerReviewApi(id, { comments });
  fetchManagerReviews();
}
