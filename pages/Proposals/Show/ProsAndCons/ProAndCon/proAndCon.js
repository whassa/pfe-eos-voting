import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowDown from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUp from "@mui/icons-material/ArrowUpwardRounded";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./proAndCon.css";

const propTypes = {
  resolutionAuthorId: PropTypes.string.isRequired,
  proAndCon: PropTypes.object.isRequired,
  onVoteUpdate: PropTypes.func.isRequired,
};

const useStyles = makeStyles(styles);

const ProAndCon = React.forwardRef(
  ({ resolutionAuthorId, proAndCon, onVoteUpdate }, ref) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const currentVote = proAndCon.memberCurrentVote;

    const handleUpClick = () => onVoteUpdate(proAndCon, true);
    const handleDownClick = () => onVoteUpdate(proAndCon, false);

    const renderVoteSection = (
      <div>
        <IconButton
          onClick={handleUpClick}
          size="small"
          className={currentVote ? classes.highlightedArrow : null}
        >
          <ArrowUp fontSize="small" className={classes.voteArrows} />
        </IconButton>
        <Typography variant="body1">{proAndCon.score}</Typography>
        <IconButton
          onClick={handleDownClick}
          size="small"
          className={currentVote === false ? classes.highlightedArrow : null}
        >
          <ArrowDown fontSize="small" />
        </IconButton>
      </div>
    );

    const renderIcon = () =>
      proAndCon.pro ? (
        <AddCircleIcon className={classes.icon} />
      ) : (
        <RemoveCircleIcon className={classes.icon} />
      );

    const renderAuthorTag = (
      <div>
        {proAndCon.member && proAndCon.member.id === resolutionAuthorId ? (
          <div className={classes.tagPadding}>
            <div className={classes.authorTag}>
              {t("pages.shareholding.resolutions.author")}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <Grid
            className={classes.root}
            container
            alignItems="center"
            wrap="nowrap"
            spacing={2}
          >
            <Grid item>{renderIcon()}</Grid>
            <Grid item xs={12} container>
              <Grid item xs={12} container direction="column" spacing={1}>
                <Grid item xs container direction="column">
                  <Grid item xs>
                    <Typography variant="h5">{proAndCon.title}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    wrap="nowrap"
                  >
                    <Grid item>{renderAuthorTag}</Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        display="inline"
                        noWrap
                        className={classes.authorName}
                      >
                        {proAndCon.member
                          ? proAndCon.member.user.displayName
                          : t("pages.shareholding.resolutions.anonymous")}
                        {" - "}
                        {moment(proAndCon.createdAt).format("YYYY-MM-DD HH:mm")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Typography variant="body1" display="inline">
                    {proAndCon.content}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.vote}>
              {renderVoteSection}
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }
);

ProAndCon.propTypes = propTypes;

export default ProAndCon;
