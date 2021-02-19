import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { getMissingDetailsMiddleware, updateTeamInGoogleSheetMiddleware } from "./middleware"
import thunk from 'redux-thunk';

const middlewareEnhancer = applyMiddleware(getMissingDetailsMiddleware, updateTeamInGoogleSheetMiddleware, thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancers(middlewareEnhancer));
