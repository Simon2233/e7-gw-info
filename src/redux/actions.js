import * as actionTypes from "./actionTypes";

export const editTeam = (fort, team, teamInfo, name) => ({
  type: actionTypes.EDIT_TEAM,
  payload: {
    name,
    fort,
    team,
    teamInfo,
  }
});

export const editGwInfo = (gwInfo) => ({
  type: actionTypes.EDIT_GW_INFO,
  payload: {
    gwInfo
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

export const initGapi = (gapi) => ({
  type: actionTypes.INIT_GAPI,
  payload: {
    gapi
  }
});