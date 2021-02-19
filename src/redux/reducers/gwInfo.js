import * as constants from "../../constants";
import { ADD_ARTIFACT_DETAILS, ADD_HERO_DETAILS, EDIT_GW_INFO, EDIT_TEAM, INIT_GAPI } from "../actionTypes";

export const initialCharInfo = {
  heroDetails: {
    _id: ""
  },
  artifactDetails: {
    _id: "",  
  },
  hp: "",
  cr: "",
  spd: "",
  immunity: "no",
  notes: "",
}

export const initialTeamInfo = {
  [constants.YOUR_FASTEST_SPEED]: "",
  [constants.NOTES]: "",
  [constants.NUM_OUTSPED]: "",
  [constants.IMG_SRC]: "",
  [constants.CHAR_1]: initialCharInfo,
  [constants.CHAR_2]: initialCharInfo,
  [constants.CHAR_3]: initialCharInfo,
}

export const initialFort = {
  [constants.PLAYER_NAME]: "",
  [constants.TEAM_1]: initialTeamInfo,
  [constants.TEAM_2]: initialTeamInfo,
}

const initialState = {
  [constants.LEFT_FORTRESS]: initialFort,
  [constants.MIDDLE_FORTRESS]: initialFort,
  [constants.RIGHT_FORTRESS]: initialFort,
  [constants.STRONGHOLD]: initialFort,
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
      return extend(true, state, gwInfo)
    }
    case ADD_HERO_DETAILS: {
      const { fort, team, char, heroDetails } = action.payload;
      return {
        ...state,
        [fort]: {
          ...state[fort],
          [team]:  {
            ...state[fort][team],
            [char]: {
              ...state[fort][team][char],
              heroDetails: heroDetails,
            }
          }
        }
      }
    }
    case ADD_ARTIFACT_DETAILS: {
      const { fort, team, char, artifactDetails } = action.payload;
      return {
        ...state,
        [fort]: {
          ...state[fort],
          [team]:  {
            ...state[fort][team],
            [char]: {
              ...state[fort][team][char],
              artifactDetails: artifactDetails,
            }
          }
        }
      }
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