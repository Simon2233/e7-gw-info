import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { getMissingDetailsMiddleware } from "./middleware"

const middlewareEnhancer = applyMiddleware(getMissingDetailsMiddleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancers(middlewareEnhancer));
