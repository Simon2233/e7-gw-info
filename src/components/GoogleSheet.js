import React, { useEffect, Fragment } from "react";
import superagent from 'superagent';
import { connect } from 'react-redux';
import {editMain} from '../redux/actions'
import * as constants from '../constants'

function makeCharacter(heroId, artifactId, hp, immunity, cr, notes, maxSpd, minSpd) {
  return {
    heroDetails: {
      _id: heroId
    },
    artifactDetails: {
      _id: artifactId,  
    },
    hp: hp,
    cr: cr,
    spd: {maxSpd: maxSpd, minSpd: minSpd},
    immunity: immunity,
    notes: notes,
  }
}

function speedCalc(fastest, faster, myCr, c2, c3) {
  let maxSpeed;
  let minSpeed;
  if (faster == 0) {
    maxSpeed = ((fastest - 10)*(myCr/100)) + 20;
    console.log("Fastest: " + fastest);
    console.log("Faster: " + faster);
    console.log("CR: " + myCr);
    console.log("Max Speed: " + maxSpeed);
  }
}

function makeTeam(sheetTeam) {
  return {
    [constants.YOUR_FASTEST_SPEED]: sheetTeam[4][1],
    [constants.NOTES]: sheetTeam[3][0],
    [constants.NUM_OUTSPED]: sheetTeam[4][2],
    [constants.IMG_SRC]: sheetTeam[4][0],
    [constants.CHAR_1]: makeCharacter(
      sheetTeam[0][0],
      sheetTeam[0][1],
      sheetTeam[0][2],
      sheetTeam[0][3],
      sheetTeam[0][4],
      sheetTeam[0][5],
      speedCalc(sheetTeam[4][1], sheetTeam[4][2], sheetTeam[0][4], sheetTeam[1][4], sheetTeam[2][4])
    ),
    [constants.CHAR_2]: makeCharacter(
      sheetTeam[1][0],
      sheetTeam[1][1],
      sheetTeam[1][2],
      sheetTeam[1][3],
      sheetTeam[1][4],
      sheetTeam[1][5],
      speedCalc(sheetTeam[4][1], sheetTeam[4][2], sheetTeam[1][4], sheetTeam[0][4], sheetTeam[2][4])
    ),
    [constants.CHAR_3]: makeCharacter(
      sheetTeam[2][0],
      sheetTeam[2][1],
      sheetTeam[2][2],
      sheetTeam[2][3],
      sheetTeam[2][4],
      sheetTeam[2][5],
      speedCalc(sheetTeam[4][1], sheetTeam[4][2], sheetTeam[2][4], sheetTeam[0][4], sheetTeam[1][4])
    ),
  }
}

function makeFort(sheet) {
  return {
    [constants.PLAYER_NAME]: sheet[0][0],
    [constants.TEAM_1]: makeTeam(sheet.slice(1, 6)),
    [constants.TEAM_2]: makeTeam(sheet.slice(6, 11)),
  }
}

function makeMainInfo(sheets) {
  return {
    [constants.LEFT_FORTRESS]: makeFort(sheets[0].values),
    [constants.MIDDLE_FORTRESS]: makeFort(sheets[1].values),
    [constants.RIGHT_FORTRESS]: makeFort(sheets[2].values),
    [constants.STRONGHOLD]: makeFort(sheets[3].values),
  }
}

GoogleSheet.propTypes = {
}

function GoogleSheet(props) {
  const { editMain } = props;

  useEffect(() => {
    async function getMainInfo() {
      const range = "M1:R12";

      try {
        let response = await superagent.get(
          "https://sheets.googleapis.com/v4/spreadsheets/1l_UrwdZxNQfpJ0XwZKe0tYCi1R7TjHGJ1fEFa58h404/values:batchGet?" + 
          `ranges='Left Fortress'!${range}&` +
          `ranges='Middle Fortress'!${range}&` +
          `ranges='Right Fortress'!${range}&` +
          `ranges='Stronghold'!${range}&` +
          "key=AIzaSyDSCzwVhdk1rFP8dG2Uejl9U-7yw5AMhVM"
        )
        const sheets = JSON.parse(response.text).valueRanges;
        
        const mainInfo = makeMainInfo(sheets);
        editMain(mainInfo);

      } catch(err) {
        console.log("Failed sheets request", err)
        throw err
      }
    }
    getMainInfo()
  }, [])
  return (
    <>
      <div></div>
    </>
  );
}

export default connect(null, {editMain})(GoogleSheet);