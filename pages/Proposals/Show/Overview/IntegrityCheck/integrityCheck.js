import CardContainer from "@common/Cards/CardContainer";
import { makeStyles } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./integrityCheck.css";

const useStyles = makeStyles(styles);

const propTypes = {
  integrity: PropTypes.bool,
};

const defaultProps = {
  integrity: false,
};

const IntegrityCheck = ({ integrity }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <CardContainer title={t("pages.shareholding.resolutions.integrity")}>
      {
        <div>
          {
            integrity ?
              (
                <CheckCircleOutlineIcon className={classes.valid} />
              ) :
              (
                <HighlightOffIcon className={classes.invalid} />
              )
          }
        </div>
      }
    </CardContainer>
  );
};

IntegrityCheck.propTypes = propTypes;
IntegrityCheck.defaultProps = defaultProps;

export default IntegrityCheck;
