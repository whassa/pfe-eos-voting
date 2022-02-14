import { Avatar, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./cardContainer.css";

const useStyles = makeStyles(styles);

const propTypes = {
  isAuthor: PropTypes.bool,
  isDeleted: PropTypes.bool,
  title: PropTypes.string,
  avatar: PropTypes.string,
  action: PropTypes.node,
  children: PropTypes.node,
};

const defaultProps = {
  isAuthor: false,
  isDeleted: false,
  title: "",
  avatar: "",
  action: null,
  children: "null",
};

const CardContainer = ({
  isAuthor,
  isDeleted,
  title,
  action,
  children,
  avatar,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [displayAvatar, shouldDisplayAvatar] = useState(!!avatar);

  const avatarComponent = (
    <Avatar
      className={classes.avatar}
      src={avatar}
      imgProps={{ onError: () => shouldDisplayAvatar(false) }}
    />
  );

  const renderAuthorTag = (
    <div>
      {isAuthor ? (
        <div className={classes.authorTag}>
          {t("pages.shareholding.resolutions.author")}
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  return (
    <div>
      {!isDeleted ? (
        <Card className={classes.root}>
          <CardHeader
            title={
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <div align="left" className={classes.title}>
                    {title}
                  </div>
                </Grid>
                <Grid item>
                  <div align="left" className={classes.title}>
                    {renderAuthorTag}
                  </div>
                </Grid>
              </Grid>
            }
            avatar={displayAvatar ? avatarComponent : null}
            action={action ? action : null}
          />
          <CardContent className={classes.content}>{children}</CardContent>
        </Card>
      ) : (
        <Card className={classes.root}>
          <CardHeader
            title={
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <div align="left" className={classes.deletedTitle}>
                    {t("pages.shareholding.resolutions.deleted")}
                  </div>
                </Grid>
              </Grid>
            }
            action={action ? action : null}
          />
          <CardContent className={classes.content}>{children}</CardContent>
        </Card>
      )}
    </div>
  );
};

CardContainer.propTypes = propTypes;
CardContainer.defaultProps = defaultProps;

export default CardContainer;
