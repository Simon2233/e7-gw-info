import React, { useEffect, useState, Fragment } from "react";
import superagent from 'superagent';
import PropTypes from 'prop-types';


GoogleSheet.propTypes = {
  fortInfo: PropTypes.object,
  setFortInfo: PropTypes.func,
}

export default function GoogleSheet(props) {
  const { fortInfo, setFortInfo } = props;

  // function makeCharacter(a, b, c) {

  // }

  // function makeTeam(a, b) {

  // }

  useEffect(async () => {
    async function getStronghold() {
      try {
        let response = await superagent.get("https://sheets.googleapis.com/v4/spreadsheets/1l_UrwdZxNQfpJ0XwZKe0tYCi1R7TjHGJ1fEFa58h404/values:batchGet?ranges='Stronghold'!M1:P11&ranges='Left Fortress'!M1:P11&key=AIzaSyDSCzwVhdk1rFP8dG2Uejl9U-7yw5AMhVM")
        console.log(response.text)
        console.log(JSON.parse(response.text).valueRanges[0].values);
        const sheet = JSON.parse(response.text).valueRanges[0].values;
        setFortInfo(prevState => ({
          stronghold: {
            team1: {
              character1: {
                name: sheet[1][0],
                artifact: sheet[1][1],
                hp: sheet[1][2],
                immunity: sheet[1][3]
              },
              character2: {
                name: sheet[2][0],
                artifact: sheet[2][1],
                hp: sheet[2][2],
                immunity: sheet[2][3]
              },
              character3: {
                name: sheet[3][0],
                artifact: sheet[3][1],
                hp: sheet[3][2],
                immunity: sheet[3][3]
              },
              notes: sheet[4][0],
              image: sheet[5][0]
            },
            team2: {
              character1: {
                name: sheet[6][0],
                artifact: sheet[6][1],
                hp: sheet[6][2],
                immunity: sheet[6][3]
              },
              character2: {
                name: sheet[7][0],
                artifact: sheet[7][1],
                hp: sheet[7][2],
                immunity: sheet[7][3]
              },
              character3: {
                name: sheet[8][0],
                artifact: sheet[8][1],
                hp: sheet[8][2],
                immunity: sheet[8][3]
              },
              notes: sheet[9][0],
              image: sheet[10][0]
            }
          }
        }))
        console.log(fortInfo);
      } catch(err) {
        console.log("Failed request for stronghold")
        throw err
      }
    }
    getStronghold()
  }, [])
  


  // console.log(stronghold)
  return (
    <div>
      <h1>data from google sheets</h1>
    </div>
  );
}