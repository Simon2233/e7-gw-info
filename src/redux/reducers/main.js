import * as constants from "../../constants";
import { EDIT_TEAM } from "../actionTypes";

const initialCharInfo = {
  heroDetails: {
    _id: ""
  },
  artifactDetails: {
    _id: "",  
  },
  hp: "",
  cr: "",
  immunity: false,
  notes: "",
}

const initialTeamInfo = {
  [constants.PLAYER_NAME]: "",
  [constants.YOUR_FASTEST_SPEED]: "",
  [constants.NOTES]: "",
  [constants.NUM_OUTSPED]: "",
  [constants.CHAR_1]: initialCharInfo,
  [constants.CHAR_2]: initialCharInfo,
  [constants.CHAR_3]: initialCharInfo,
}

const initialFort = {
  [constants.TEAM_1]: initialTeamInfo,
  [constants.TEAM_2]: initialTeamInfo,
}

const initialState = {
  [constants.LEFT_FORTRESS]: initialFort,
  [constants.MIDDLE_FORTRESS]: initialFort,
  [constants.RIGHT_FORTRESS]: initialFort,
  [constants.STRONGHOLD]: initialFort,
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case EDIT_TEAM: {
      const { fort, team, teamInfo } = action.payload;
      return {
        ...state,
        [fort]: {
          ...state[fort],
          [team]: teamInfo
        }
      };
    }
    default:
      return state;
  }
}
