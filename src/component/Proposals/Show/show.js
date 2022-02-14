import Loading from "@common/Loading";
import SnackbarAlert from "@common/SnackbarAlert";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from 'next/router'
//import { useMutation, useQuery } from "@services/graphql/resolutions";
//import { loader } from "graphql.macro";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory, useParams } from "react-router-dom";

import Comments from "./Comments";
import News from "./News";
import NewVote from "./NewVote";
import Overview from "./Overview";
import ProsAndCons from "./ProsAndCons";
import styles from "./Show.css";
import Statistics from "./Statistics";
import TabsNavigation from "./TabsNavigation";

const RESOLUTION_QUERY = loader("./resolution.gql");
const CANCEL_MUTATION = loader("./cancel.gql");
const CLOSE_MUTATION = loader("./close.gql");

const useStyles = makeStyles(styles);

const Show = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const params = useParams();
  const currentMember = useSelector((state) => state.currentUser.member);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [displayErrorSnackBar, setDisplayErrorSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const [cancelResolution] = useMutation(CANCEL_MUTATION);
  const [closeResolution] = useMutation(CLOSE_MUTATION);

  const [openVoteModal, setOpenVoteModal] = useState(false);

  const { loading, data, refetch } = useQuery(RESOLUTION_QUERY, {
    organizationId: currentMember.organization.id,
    resolutionId: params.id,
  });

  const displayError = (message) => {
    setErrorMessage(message);
    setDisplayErrorSnackBar(true);
  };

  const resolution = data?.organization?.resolution;

  const handleVoteButtonClick = () => {
    setOpenVoteModal(true);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleVoteSend = () => {
    refetch();
  };

  const redirect = () => {
    history.push(r.shareholding.resolutions.index());
  };

  const handleCloseResolution = async () => {
    const { data } = await closeResolution({
      variables: { id: resolution.id },
    });

    if (data) {
      if (data.closeResolution.errors) {
        displayError(data.closeResolution.errors[0].message);
      } else {
        redirect();
      }
    }
  };

  const handleCancelResolution = async () => {
    const { data } = await cancelResolution({
      variables: { id: resolution.id },
    });

    if (data) {
      if (data.cancelResolution.errors) {
        displayError(data.cancelResolution.errors[0].message);
      } else {
        redirect();
      }
    }
  };

  const moreButton = (
    <>
      <IconButton size="small" onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseResolution}>
          {t("pages.shareholding.resolutions.closeResolution")}
        </MenuItem>
        <MenuItem onClick={handleCancelResolution}>
          {t("pages.shareholding.resolutions.cancelResolution")}
        </MenuItem>
      </Menu>
    </>
  );

  return loading || !data ? (
    <Loading />
  ) : resolution ? (
    <React.Fragment>
      <Card className={classes.infoCard} elevation={0}>
        {resolution.pictureThumbUrl && (
          <CardMedia
            className={classes.media}
            image={resolution.pictureThumbUrl}
          />
        )}
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h3" variant="h3">
              {resolution.name}
            </Typography>
            <Typography component="h4">
              {resolution.author.user.displayName}
            </Typography>
          </CardContent>
        </div>
        {resolution.status.name === "Open" && (
          <div className={classes.buttonContainer}>
            <Button
              className={classes.voteButton}
              variant="contained"
              color="secondary"
              onClick={handleVoteButtonClick}
            >
              {t("pages.shareholding.resolutions.voteForResolution")}
            </Button>
            {resolution.author.id === currentMember.id && moreButton}
          </div>
        )}
      </Card>

      <div className={classes.tabs}>
        <TabsNavigation />
      </div>
      <Switch>
        <Route exact path={r.shareholding.resolutions.show.overview.path}>
          <Overview />
        </Route>
        <Route path={r.shareholding.resolutions.show.args.path}>
          <ProsAndCons />
        </Route>
        <Route path={r.shareholding.resolutions.show.statistics.path}>
          <Statistics />
        </Route>
        <Route path={r.shareholding.resolutions.show.news.path}>
          <News />
        </Route>
        <Route path={r.shareholding.resolutions.show.comments.path}>
          <Comments />
        </Route>
      </Switch>
      {openVoteModal && (
        <NewVote
          onVote={handleVoteSend}
          onExit={() => setOpenVoteModal(false)}
          resolutionName={resolution.name}
          resolutionId={resolution.id}
        />
      )}
      <SnackbarAlert
        severity="error"
        open={displayErrorSnackBar}
        onClose={() => setDisplayErrorSnackBar(false)}
        message={errorMessage}
      />
    </React.Fragment>
  ) : (
    <Loading />
  );
};

export default Show;
