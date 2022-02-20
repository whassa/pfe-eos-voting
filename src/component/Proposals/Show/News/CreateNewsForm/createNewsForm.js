import Modal  from "@common/Modal";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactTrixRTEInput } from "react-trix-rte";

import styles from "./createNewsForm.css";

const useStyles = makeStyles(styles);

const CreateNewsForm = (props) => {
  const {
    onCancel,
    handleSubmit,
    values,
    setFieldValue,
    resetForm,
    errors,
    isCreating,
  } = props;

  const { t } = useTranslation();
  const classes = useStyles();

  const handleTrixChange = (event, newValue) => {
    setFieldValue("content", newValue);
  };

  const renderInfoFields = () => (
    <React.Fragment>
      <Grid item xs={12}>
        <TextField
          id="standard-title"
          label={t("pages.shareholding.resolutions.title")}
          value={values.title}
          fullWidth
          variant="outlined"
          autoComplete="off"
          error={Boolean(errors.title)}
          helperText={errors.title}
          onChange={(e) => {
            setFieldValue("title", e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl error={Boolean(errors.content)} className={classes.trix}>
          <FormLabel className={classes.contentLabel}>
            {t("pages.shareholding.resolutions.content")}
          </FormLabel>
          <ReactTrixRTEInput
            defaultValue={values.content}
            placeholder={t("pages.shareholding.resolutions.content")}
            onChange={handleTrixChange}
          />
          {Boolean(errors.content) && (
            <FormHelperText>{errors.content}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="standard-title"
          label={t("pages.shareholding.resolutions.url")}
          value={values.url}
          fullWidth
          variant="outlined"
          autoComplete="off"
          error={Boolean(errors.url)}
          helperText={errors.url}
          onChange={(e) => {
            setFieldValue("url", e.target.value);
          }}
        />
      </Grid>
    </React.Fragment>
  );
  return (
    <Modal
      className={classes.root}
      open={props.open}
      size="md"
      keepMounted={false}
    >
      <Modal.Header
        title={t("pages.shareholding.resolutions.newsCreationFormTitle")}
      />
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <Grid container spacing={3}>
            {renderInfoFields()}
          </Grid>
        </Modal.Content>
        <Modal.Footer>
          <Button onClick={() => onCancel(resetForm)}>
            {t("utils.cancel")}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isCreating}
          >
            {isCreating ? <CircularProgress size="24px" /> : t("utils.create")}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateNewsForm;
