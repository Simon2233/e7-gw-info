import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import ArtifactModal from './ArtifactModal';
import { EDITING_TEAM1 } from './Fort';
import HeroInfo from './HeroInfo';
import HeroModal from './HeroModal';

const useStyles = makeStyles({
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: '10px',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`
  },
});

TeamDisplay.propTypes = {
	setEditTeam: PropTypes.func,
	teamInfo: PropTypes.object,
}

export default function TeamDisplay(props) {
	const { setEditTeam, teamInfo } = props;
	const [heroId, setHeroId] = useState(null);
	const [heroModalOpen, setHeroModalOpen] = useState(false);
	const [artifactModalOpen, setArtifactModalOpen] = useState(false);
	const [artifactId, setArtifactId] = useState(null);

	function openHeroModel(heroId) {
		setHeroId(heroId);
		setHeroModalOpen(true);
	}

	function openArtifactModel(artifactId) {
		setArtifactId(artifactId);
		setArtifactModalOpen(true)
	}

  return (
  	<div>
	  	<Box mb={10}>
		  <Button onClick={setEditTeam}>Edit</Button>
		  <Grid container spacing={3}>
			  <HeroInfo
			    characterInfo={teamInfo.character1}
				onOpenHero={(heroId) => openHeroModel(heroId)}
				onOpenArtifact={(artifactId) => openArtifactModel(artifactId)} 
			  />
			  <HeroInfo
			    characterInfo={teamInfo.character2}
				onOpenHero={(heroId) => openHeroModel(heroId)}
				onOpenArtifact={(artifactId) => openArtifactModel(artifactId)} 
			  />
			  <HeroInfo
			    characterInfo={teamInfo.character3}
				onOpenHero={(heroId) => openHeroModel(heroId)}
				onOpenArtifact={(artifactId) => openArtifactModel(artifactId)} 
			  />
		  </Grid>
	  	</Box>
	  	<Box mb={10}>
	  	</Box>
		{heroId &&
			<HeroModal heroId={heroId} open={heroModalOpen} onClose={() => setHeroModalOpen(false)} />
		}
		{artifactId &&
			<ArtifactModal artifactId={artifactId} open={artifactModalOpen} onClose={() => setArtifactModalOpen(false)}  />
		}
		{/* {immunity && 
			<Box>
				<Typography variant="h4">Immunity<img width="25px" style={{marginLeft: '10px'}} src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"/></Typography>
				<p><strong>Description: </strong>This unit is not affected by any debuffs or harmful effects.</p>
			</Box>
		} */}
  	</div>
  );
}