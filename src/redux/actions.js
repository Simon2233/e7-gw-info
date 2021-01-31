import * as actionTypes from "./actionTypes";

export const editTeam = (fort, team, teamInfo) => ({
  type: actionTypes.EDIT_TEAM,
  payload: {
    fort,
    team,
    teamInfo,
  }
});

export const editMain = (mainInfo) => ({
  type: actionTypes.EDIT_MAIN,
  payload: {
    mainInfo
  }
});

export const addHeroDetails = (fort, team, char, heroDetails) => ({
  type: actionTypes.ADD_HERO_DETAILS,
  payload: {
    fort, team, char, heroDetails
  }
});

export const addArtifactDetails = (fort, team, char, artifactDetails) => ({
  type: actionTypes.ADD_ARTIFACT_DETAILS,
  payload: {
    fort, team, char, artifactDetails
  }
});