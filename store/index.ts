import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware, { SagaIterator } from "redux-saga";
import { all } from "redux-saga/effects";
import { cache, cacheSagas, IState as ICoinState } from "./cache";

const reducer = combineReducers<IAppState>({ cache });
const logger = createLogger({
  collapsed: true
});

function* rootSaga(): SagaIterator {
  yield all([...cacheSagas]);
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware /*, logger*/)
);

// then run the saga
sagaMiddleware.run(rootSaga);

// render the application
