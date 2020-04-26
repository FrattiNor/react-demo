import { takeEvery, takeLatest } from "redux-saga/effects";
import { call, put, select } from "redux-saga/effects";

const typeofs = val => Object.prototype.toString.call(val);

const switchType = state => {
  switch (typeofs(state)) {
    case "[object Object]":
      return { ...state };

    case "[object Array]":
      return [...state];

    default:
      return state;
  }
};

const getreducer = type => {
  let res = {};
  if (typeofs(type) === "[object String]") {
    const list = type.split("/");
    res.name = list[0];
    res.key = list[1];
  }
  return res;
};

const reduxTool = reducerObj => {
  return (state = switchType(reducerObj.state), action) => {
    const { key, name } = getreducer(action.type);

    if (name === reducerObj.namespace) {
      const reducer = reducerObj.reducer && reducerObj.reducer[key];
      //   const effect = reducerObj.effect && reducerObj.effect[key];

      if (reducer) {
        return switchType(reducer(state, action));
      } else {
        return switchType(state);
      }
    } else {
      return switchType(state);
    }
  };
};

// const SagaTool = sagaList => {
//     const funList = []
//     sagaList.forEach(namespaceEffect => {
//         Object.keys(namespaceEffect).forEach((type) => {
//             funList.push(takeEvery(`namespaceEffect/type`, ))
//         })
//     })
//   return function* rootSaga() {

//     yield takeEvery("CREATE_USER", createUser);
//   };
// };

const sagaUtil = obj => {
  let newObj = {};
  for (let item in obj) {
    let ItemEffect = obj[item].effect || {};
    const { namespace } = obj[item];
    let newEffect = {};
    if (namespace) {
      Object.keys(ItemEffect).forEach(key => {
        newEffect[`${namespace}/${key}`] = ItemEffect[key];
      });
    }
    newObj = {
      ...newObj,
      ...newEffect
    };
  }

  console.log(newObj)

  return function* rootSaga() {
    for (let key in newObj) {
      yield takeEvery(key, action =>
        newObj[key](action, { call, put, select })
      );
    }
  };
};

const reduxUtil = obj => {
  let reducer = {};
  Object.keys(obj).forEach(key => {
    reducer[key] = reduxTool(obj[key]);
  });

  return reducer;
};

export { reduxUtil, sagaUtil };
