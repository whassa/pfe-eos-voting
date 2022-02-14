import { Card, CardContent, CardActionArea, CardMedia, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { useRouter } from 'next/router'

import { styled } from '@mui/material/styles';

const VotingCard = styled(Card)(({ theme }) => ({
  '& .MuiCardMedia-root': {
    height: 200,
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

const Cards = (props) => {
  //const classes = useStyles;

  const theme = useTheme();
  const router = useRouter();

  const summary = (
    <Typography
      variant="body2"
      color="textSecondary"
      component="p"
    >
      {props.resolution.summary}
    </Typography>
  );

  const numberOfComment = props.resolution.comments.totalCount;

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
        elevation={props.elevation}
      >
        <CardActionArea onClick={handleVoteButtonClick}>
          {props.resolution.pictureThumbUrl && (
            <CardMedia
              image={props.resolution.pictureThumbUrl}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.resolution.name}
              {props.resolution.published === false ? (
                <em> (Draft)</em>
              ) : null}
            </Typography>
            <Typography variant="subtitle2" component="p">
                swag life 
            </Typography>
            <Typography sx={{
                display: "flex",
                justifyContent: "flex-end"
            }} component="span">
              <span>{props.resolution.votes.totalCount}</span>
            </Typography>
          </CardContent>
          
        </CardActionArea>
      </VotingCard>
      {props.isLast && props.elevation === 0 && (
        <Divider orientation="horizontal" />
      )}
    </Grid>
  );
};

export default Cards;
