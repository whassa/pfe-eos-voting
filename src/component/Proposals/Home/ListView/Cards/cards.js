import { Card, CardContent, CardActionArea, CardMedia, Divider, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles';

const VotingCard = styled(Card)(({ theme }) => ({
  diplay: 'flex',
  '& .MuiCardActionArea-root': {
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
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
    paddingLeft: '5px',
  },
}));

const Cards = ({resolution, elevation, isLast, cardOnClick}) => {
  //const classes = useStyles;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  const numberOfComment = resolution.comments.totalCount;

  return (
    <Grid
      item
      xs={12}
      sx={{ width: '100%'}}
    >
      <VotingCard
        elevation={elevation}
      >
        <CardActionArea onClick={()=> {cardOnClick(resolution.id) }}>
          <Box sx={{ display: 'flex' }}>
            {resolution.pictureThumbUrl && (
              <CardMedia
                image={resolution.pictureThumbUrl}
              />
            )}
            <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
              <Typography gutterBottom variant="h5" component="h2">
                {resolution.name}
                {resolution.published === false ? (
                  <em> (Draft)</em>
                ) : null}
              </Typography>
              <Typography variant="subtitle2" component="p">
                  swag life 
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{marginRight: '60px'}}>
            <Typography component="span">
                <span>{resolution.votes.totalCount}</span>
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