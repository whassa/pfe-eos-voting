import { Card, CardContent, Divider } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useTranslation } from "react-i18next";

import { alpha, styled } from '@mui/material/styles';

const VotingCard = styled(Card)(({ theme }) => ({
  width: '100%',
  '& .MuiCardActionArea-root': {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "left",
  },
  '& .MuiCardMedia-root': {
    height: 200,
    width: 200,
    flexBasis: 200,
    flexGrow: 0,
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      flexBasis: 150,
    },
  },
  '& .MuiCardContent-root': {
    marginLeft: '5px',
  },
  cardDescription: {
    marginTop: 30,
  }
}));


const Cards = (props) => {
  //const classes = useStyles;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


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

  return (
    <Grid
      item
      xs={12}
    >
      <VotingCard
        elevation={props.elevation}
      >
        <CardActionArea>
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
            {isMobile ? null : summary}
          </CardContent>
          <div>
            <span>{props.resolution.votes.totalCount}</span>
          </div>
        </CardActionArea>
      </VotingCard>
      {props.isLast && props.elevation === 0 && (
        <Divider orientation="horizontal" />
      )}
    </Grid>
  );
};

export default Cards;
