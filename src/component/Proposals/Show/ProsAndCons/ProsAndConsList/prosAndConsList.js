import Backdrop from "@mui/material/Backdrop";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ProAndCon from "../ProAndCon";
import styles from "./prosAndConsList.css";

const propTypes = {
  resolutionAuthorId: PropTypes.string.isRequired,
  pros: PropTypes.arrayOf(PropTypes.object),
  cons: PropTypes.arrayOf(PropTypes.object),
  onVoteUpdate: PropTypes.func.isRequired,
};

const defaultProps = {
  pros: [],
  cons: [],
};

const useStyles = makeStyles(styles);

const ProsAndConsList = ({ resolutionAuthorId, pros, cons, onVoteUpdate }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const renderProAndConItem = (item, index) => (
    <ListItem
      key={index}
      className={classes.item}
      onClick={() => {
        setSelected(item);
        setOpen(true);
      }}
    >
      <ListItemIcon className={classes.icon}>
        {item.pro ? <AddCircleIcon /> : <RemoveCircleIcon />}
      </ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  );

  const renderPros = (proItems) => (
    <List>{proItems.map(renderProAndConItem)}</List>
  );

  const renderCons = (conItems) => (
    <List>{conItems.map(renderProAndConItem)}</List>
  );

  return (
    <React.Fragment>
      <Paper>
        <Grid
          container
          className={classes.root}
          wrap="nowrap"
          spacing={0}
          display="flex"
          direction={isMobile ? "row" : "column"}
        >
          <div className={classes.list}>
            <div>
              {t("pages.shareholding.resolutions.pros")}
              {renderPros(pros)}
            </div>
          </div>
          <Divider
            className={classes.divider}
            orientation={isMobile ? null : "vertical"}
            flexItem={!isMobile}
          />
          <div className={classes.list}>
            <div>
              {t("pages.shareholding.resolutions.cons")}
              {renderCons(cons)}
            </div>
          </div>
        </Grid>
      </Paper>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <ProAndCon
            resolutionAuthorId={resolutionAuthorId}
            proAndCon={selected}
            onVoteUpdate={(argument, voteValue) => {
              onVoteUpdate(argument, voteValue);
              handleClose();
            }}
          />
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

ProsAndConsList.propTypes = propTypes;
ProsAndConsList.defaultProps = defaultProps;

export default ProsAndConsList;
