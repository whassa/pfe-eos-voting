import { Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./authorCard.css";

const useStyles = makeStyles(styles);

const propTypes = {
  author: PropTypes.object.isRequired,
  accountable: PropTypes.object,
};

const defaultProps = {
  accountable: {},
};

const AuthorCard = ({ author, accountable }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Paper className={classes.root}>
      <Grid container direction="column" spacing={2} justify="flex-start">
        <Grid item>
          <div align="left" className={classes.title}>
            {t("pages.shareholding.resolutions.author")}
          </div>
          <div className={classes.content}>
            <Avatar
              className={classes.avatar}
              src={author.user.pictureThumbUrl}
            />
            <div className={classes.author}>{author.user.displayName}</div>
          </div>
        </Grid>
        <Grid item>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item>
          <div align="left" className={classes.title}>
            {t("pages.shareholding.resolutions.accountable")}
          </div>
          <div className={classes.content}>
            <Avatar
              className={classes.avatar}
              src={accountable?.user?.pictureThumbUrl || ""}
            />
            <div className={classes.author}>
              {accountable?.user?.displayName || ""}
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

AuthorCard.propTypes = propTypes;
AuthorCard.defaultProps = defaultProps;

export default AuthorCard;
