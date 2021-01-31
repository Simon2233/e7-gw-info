import * as actionTypes from "./actionTypes";

export const editTeam = (fort, team, teamInfo) => ({
  type: actionTypes.EDIT_TEAM,
  payload: {
    fort,
    team,
    teamInfo,
  }
});