import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./newComment.css";

const useStyles = makeStyles(styles);

const propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

const NewComment = ({ onSave, onCancel }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [newComment, setNewComment] = useState();

  return (
    <div className={classes.root}>
      <TextField
        className={classes.comment}
        fullWidth
        multiline={true}
        name="NewComment"
        label={t("pages.shareholding.resolutions.leaveAComment")}
        variant="standard"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        color="secondary"
      />
      {newComment && (
        <div className={classes.buttons}>
          <Button
            className={classes.button}
            onClick={() => {
              setNewComment("");
              onCancel && onCancel();
            }}
          >
            {t("utils.cancel")}
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              onSave(newComment);
              setNewComment("");
            }}
          >
            {t("pages.shareholding.resolutions.comment")}
          </Button>
        </div>
      )}
    </div>
  );
};

NewComment.propTypes = propTypes;

export default NewComment;
