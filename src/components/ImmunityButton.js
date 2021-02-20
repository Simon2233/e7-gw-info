import React, { useEffect, useState} from 'react';
import { Checkbox } from '@material-ui/core'
import PropTypes from 'prop-types'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

ImmunityButton.propTypes = {
  onSelect: PropTypes.func,
  immunity: PropTypes.string,
}

export default function ImmunityButton(props) {
  const {immunity, onSelect} = props;

  function getNextValue(immunity) {
    switch (immunity) {
      case "yes": {
        return "no";
      }
      default: {
        return "yes";
      }
    }
  } 


  return (
    <div
      style={{width: "8vh", height: "8vh"}}  
      onClick={() => {
        onSelect(getNextValue(immunity))
      }}
    >
      {
        immunity === "yes" && 
        <img 
          style={{width: "8vh", height: "8vh"}} 
          alt="immunity" 
          src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png"
        />
      }
      {
        immunity === "no" && 
        <img 
          style={{width: "8vh", height: "8vh", opacity: "0.2"}} 
          alt="no immunity" 
          src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png"
        />
      }
    </div>
  );
}