import { LOAD_HERO_MAP, LOAD_ARTIFACT_MAP, ADD_HERO_DETAILS, ADD_ARTIFACT_DETAILS } from "../actionTypes";


const initialState = { heroMap: {}, artifactMap: {} };

export default function gwInfo(state = initialState, action) {
  switch (action.type) {
    case LOAD_HERO_MAP: {
      const { heroMap } = action.payload;
      const newState = {
        heroMap
      }
      return extend(true, state, newState)
    }
    case LOAD_ARTIFACT_MAP: {
      const { artifactMap } = action.payload;
      const newState = {
        artifactMap
      }
      return extend(true, state, newState)
    }
    case ADD_HERO_DETAILS: {
      const { heroDetails } = action.payload;
      const newState = {
        heroMap: {
          [heroDetails._id]: heroDetails
        }
      }

      return extend(true, state, newState)
    }
    case ADD_ARTIFACT_DETAILS: {
      const { artifactDetails } = action.payload;
      const newState = {
        artifactMap: {
          [artifactDetails._id]: artifactDetails
        }
      }
      
      return extend(true, state, newState)
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