import * as constants from './constants'

export const getInitialCharInfo = () => ({
    heroId: "",
    artifactId: "",
    hp: "",
    cr: "",
    spd: "",
    immunity: "no",
    notes: "",
})
  
  export const getInitialTeamInfo = () => ({
    [constants.YOUR_FASTEST_SPEED]: "",
    [constants.NOTES]: "",
    [constants.NUM_OUTSPED]: "",
    [constants.IMG_SRC]: "",
    [constants.CHAR_1]: getInitialCharInfo(),
    [constants.CHAR_2]: getInitialCharInfo(),
    [constants.CHAR_3]: getInitialCharInfo(),
  })
  
  export const getInitialFort = () => ({
    [constants.PLAYER_NAME]: "",
    [constants.TEAM_1]: getInitialTeamInfo(),
    [constants.TEAM_2]: getInitialTeamInfo(),
  })