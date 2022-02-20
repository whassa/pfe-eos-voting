import Modal from "@common/Modal";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { makeStyles } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./newProAndCon.css";

const useStyles = makeStyles(styles);

const NewProAndCon = ({ onPropose, onCancel }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [newProAndCon, setNewProAndCon] = React.useState({
    title: "",
    content: "",
    pro: true,
  });

  const handleArgumentTitleTextChange = (event) => {
    setNewProAndCon({ ...newProAndCon, title: event.target.value });
  };

  const handleArgumentContentTextChange = (event) => {
    setNewProAndCon({ ...newProAndCon, content: event.target.value });
  };

  const handleArgumentTypeValueChange = (event) => {
    const radioValue = event.target.value;
    setNewProAndCon({
      ...newProAndCon,
      pro: radioValue === "true" ? true : false,
    });
  };

  return (
    <React.Fragment>
      <Modal.Header
        title={t("pages.shareholding.resolutions.newArgumentModalTitle")}
        subtitle={t("pages.shareholding.resolutions.newArgumentModalSubtitle")}
      />
      <Modal.Content>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="new_argument_title"
              fullWidth={true}
              multiline={false}
              label={t("pages.shareholding.resolutions.argumentTitle")}
              onChange={handleArgumentTitleTextChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="new_argument_text"
              fullWidth={true}
              multiline={true}
              rows={10}
              label={t("pages.shareholding.resolutions.argumentContent")}
              onChange={handleArgumentContentTextChange}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <FormControl component="fieldset">
              <RadioGroup
                row
                defaultValue="true"
                onChange={handleArgumentTypeValueChange}
              >
                <FormControlLabel
                  labelPlacement="start"
                  value={"true"}
                  control={<Radio />}
                  label={t("pages.shareholding.resolutions.pro")}
                />
                <FormControlLabel
                  labelPlacement="start"
                  value="false"
                  control={<Radio />}
                  label={t("pages.shareholding.resolutions.con")}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Modal.Content>
      <Modal.Footer>
        <Button className={classes.button} onClick={onCancel}>
          {t("utils.cancel")}
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => onPropose(newProAndCon)}
        >
          {t("pages.shareholding.resolutions.propose")}
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
};

export default NewProAndCon;
