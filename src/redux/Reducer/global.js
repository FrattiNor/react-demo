export const delay = ms =>
  new Promise(resolve => setTimeout(() => resolve("123"), ms));

const global = {
  namespace: "global",
  state: {
    number: 1
  },
  reducer: {
    add(state) {
      return { ...state, number: state.number + 1 };
    }
  },
  effect: {
    *delay({ payload }, { call, put }) {
      console.log(payload);
      const res = yield call(delay, 1000);
      yield put({ type: "global/delay2" });
      return res;
    },
    *delay2({ payload }, { call }) {
      console.log("delay29");
      const res = yield call(delay, 1000);
      return res;
    }
  }
};

export default global;
