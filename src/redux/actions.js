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

export const addHeroDetails = (heroDetails) => ({
  type: actionTypes.ADD_HERO_DETAILS,
  payload: {
    heroDetails
  }
});

export const addArtifactDetails = (artifactDetails) => ({
  type: actionTypes.ADD_ARTIFACT_DETAILS,
  payload: {
    artifactDetails
  }
});

export const initGapi = (gapi) => ({
  type: actionTypes.INIT_GAPI,
  payload: {
    gapi
  }
});

export const loadHeroMap = (heroMap) => ({
  type: actionTypes.LOAD_HERO_MAP,
  payload: {
    heroMap
  }
});

export const loadArtifactMap = (artifactMap) => ({
  type: actionTypes.LOAD_ARTIFACT_MAP,
  payload: {
    artifactMap
  }
});