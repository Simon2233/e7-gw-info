import { combineReducers } from "redux";
import gwInfo from './gwInfo'
import gapi from './gapi'
import e7api from './e7api'

export default combineReducers({ gwInfo, gapi, e7api });
