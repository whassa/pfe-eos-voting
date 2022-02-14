import Modal from "@common/Modal";
import ModalContent from "@common/Modal/ModalContent";
import ModalFooter from "@common/Modal/ModalFooter";
import ModalHeader from "@common/Modal/ModalHeader";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./resolutionMembers.css";

const useStyles = makeStyles(styles);

const propTypes = {
  resolution: PropTypes.object.isRequired,
};

const ResolutionMembers = ({ resolution }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const members = resolution.members.items;
  const fiveFirstMembers = members.slice(0, 5);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const renderList = (list) => (
    <div>
      {list.map(({ member }) => (
        <Grid item key={member.id}>
          <Grid container item direction="row" alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                className={classes.avatar}
                src={member?.user?.pictureThumbUrl || ""}
              />
            </Grid>
            <Grid item>
              <Typography>{member?.user?.displayName || ""}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </div>
  );

  const renderShortMemberList = (
    <Grid
      container
      direction="column"
      spacing={3}
      className={classes.shortList}
    >
      {renderList(fiveFirstMembers)}
      {members.length - fiveFirstMembers.length > 0 && (
        <Grid item>
          <div align="right">
            <Button onClick={handleOpen} className={classes.andManyMore}>
              {t("pages.shareholding.resolutions.andXMore").replace(
                "{0}",
                members.length - fiveFirstMembers.length
              )}
            </Button>
          </div>
        </Grid>
      )}
    </Grid>
  );

  const renderMemberList = (
    <React.Fragment key="MemberList">
      <Modal open={isOpen} size="xs">
        <ModalHeader title={t("pages.shareholding.resolutions.members")} />
        <ModalContent>
          <Grid container direction="column" spacing={3}>
            {renderList(members)}
          </Grid>
        </ModalContent>
        <ModalFooter>
          <Button onClick={handleClose}>{t("utils.close")}</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
  return (
    <React.Fragment key="ResolutionMembers">
      <Paper className={classes.root}>
        <div className={classes.title}>
          {t("pages.shareholding.resolutions.members")}
        </div>
        {renderShortMemberList}
        {renderMemberList}
      </Paper>
    </React.Fragment>
  );
};

ResolutionMembers.propTypes = propTypes;

export default ResolutionMembers;
