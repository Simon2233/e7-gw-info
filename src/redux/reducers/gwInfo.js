import * as constants from "../../constants";
import {getInitialFort} from "../../structs"
import { ADD_ARTIFACT_DETAILS, ADD_HERO_DETAILS, EDIT_GW_INFO, EDIT_TEAM } from "../actionTypes";


const initialState = {
  [constants.LEFT_FORTRESS]:  getInitialFort(),
  [constants.MIDDLE_FORTRESS]: getInitialFort(),
  [constants.RIGHT_FORTRESS]: getInitialFort(),
  [constants.STRONGHOLD]: getInitialFort(),
};

export default function gwInfo(state = initialState, action) {
  switch (action.type) {
    case EDIT_TEAM: {
      const { fort, team, teamInfo, name } = action.payload;
      return {
        ...state,
        [fort]: {
          ...state[fort],
          [team]: teamInfo,
          [constants.PLAYER_NAME]: name,
        }
      };
    }
    case EDIT_GW_INFO: {
      const {gwInfo} = action.payload;
      return extend(true, state, gwInfo);
    }
    default:
      return state;
  }
}

function extend() {

	// Variables
	var extended = {};
	var deep = false;
	var i = 0;
	var length = arguments.length;

	// Check if a deep merge
	if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
		deep = arguments[0];
		i++;
	}

	// Merge the object into the extended object
	var merge = function (obj) {
		for ( var prop in obj ) {
			if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
				// If deep merge and property is an object, merge properties
				if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
					extended[prop] = extend( true, extended[prop], obj[prop] );
				} else {
					extended[prop] = obj[prop];
				}
			}
		}
	};

	// Loop through each object and conduct a merge
	for ( ; i < length; i++ ) {
		var obj = arguments[i];
		merge(obj);
	}

	return extended;

};