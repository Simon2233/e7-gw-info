import React, { useEffect, useState, Fragment } from "react";
import superagent from 'superagent';


export default function GoogleSheet() {
  const [leftFort, setLeftFort] = useState([]);
  const [rightFort, setRightFort] = useState([]);
  const [midFort, setMidFort] = useState([]);
  const [stronghold, setStronghold] = useState([]);

  useEffect(async () => {
    async function getStronghold() {
      try {
        let response = await superagent.get('https://sheets.googleapis.com/v4/spreadsheets/1l_UrwdZxNQfpJ0XwZKe0tYCi1R7TjHGJ1fEFa58h404/values/Stronghold!B8:G83?key=AIzaSyDSCzwVhdk1rFP8dG2Uejl9U-7yw5AMhVM')
        console.log(response.text)
        setStronghold(JSON.parse(response.text).results)
      } catch(err) {
        console.log("Failed request for stronghold")
        throw err
      }
    }
    getStronghold()
  }, [])

  return (
    <>
      <h1>data from google sheets</h1>
    </>
  );
}