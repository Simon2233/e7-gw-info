import React from 'react';
import { Checkbox } from '@material-ui/core'
import PropTypes from 'prop-types'

ImmunityButton.propTypes = {
  onSelect: PropTypes.func,
  immunity: PropTypes.bool,
}

export default function ImmunityButton(props) {
  return (
    <div>
      <Checkbox
        value={props.immunity}
        checkedIcon={<img style={{width: "4vh", height: "4vh"}} alt="immunity" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png"/>}
        icon={<img style={{width: "4vh", height: "4vh", opacity: "0.2"}} alt="no immunity" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png"/>}
        inputProps={{ 'aria-label': 'Checkbox A' }}
        onChange={(event) => props.onSelect(event.target.checked)}
      />
    </div>
  );
}