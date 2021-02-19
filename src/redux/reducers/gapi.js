import * as constants from "../../constants";
import { INIT_GAPI } from "../actionTypes";

const initialState = null;

export default function gapi(state = initialState, action) {
  switch (action.type) {
    case INIT_GAPI: {
      const { gapi } = action.payload;
      return gapi;
    }
    default:
      return state;
  }
}
