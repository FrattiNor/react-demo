export const delay = ms =>
  new Promise(resolve => setTimeout(() => resolve("123"), ms));

const app = {
  namespace: "app",
  state: {
    number: 1
  },
  reducer: {
    add(state) {
      return { ...state, number: state.number + 1 };
    }
  },
  effect: {
    *delay3({ payload }, { call }) {
      const res = yield call(delay, 1000);
      return res;
    }
  }
};

export default app;
