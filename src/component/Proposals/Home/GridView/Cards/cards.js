import { Card, CardContent, CardActionArea, CardMedia, Divider, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { useRouter } from 'next/router'

import { styled } from '@mui/material/styles';

const VotingCard = styled(Card)(({ theme }) => ({
  '& .MuiCardMedia-root': {
    height: 300,
    flexBasis: 200,
    flexGrow: 0,
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      flexBasis: 150,
    },
  },
  '& .MuiCardContent-root': {
    paddingLeft: '5px',
  },
  '& .totalVote': {

  }
}));

const Cards = ({resolution, elevation, isLast, cardOnClick}) => {
  //const classes = useStyles;

  const theme = useTheme();
  const router = useRouter();

  const summary = (
    <Typography
      variant="body2"
      color="textSecondary"
      component="p"
    >
      {resolution.summary}
    </Typography>
  );


  const handleVoteButtonClick = (e) => {
    //TODO changer pour push vers le show.js en passant la resolution qui contient tout
    router.push("/Proposals/Show/show");
  }

  return (
    <Grid
      item
      xs={4}
      sx={{ width: '100%'}}
    >
      <VotingCard
        elevation={elevation}
      >
        <CardActionArea onClick={() => { cardOnClick(resolution.primaryKey)}}>
          <CardMedia
            image={'/DataSources/EOSIO_logo.png'}
          />
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
             <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {resolution.title}
                {resolution.published === false ? (
                  <em> (Draft)</em>
                ) : null}
              </Typography>
              <Typography variant="subtitle1" component="p">
                  {resolution.category} - {resolution.author} 
              </Typography>
              <Typography variant="subtitle2" component="p">
                  {resolution.summary} 
              </Typography>
            </CardContent>
            <Typography sx={{
                  display: "flex",
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginRight: '15px',
              }} component="span">
              <span>{resolution.votes.actualVote}</span>
            </Typography>
          </Box>
         
          
        </CardActionArea>
      </VotingCard>
      {isLast && elevation === 0 && (
        <Divider orientation="horizontal" />
      )}
    </Grid>
  );
};

export default Cards;
