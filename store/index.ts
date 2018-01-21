import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { cache, IState as ICoinState } from "./cache";

// import mySaga from './sagas'

const reducer = combineReducers({ cache });

export interface IAppState {
  coins: ICoinState;
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// then run the saga
// sagaMiddleware.run(mySaga)

// render the application
