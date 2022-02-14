import CardContainer from "@common/Cards/CardContainer";
import { makeStyles } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./descriptionCard.css";

const useStyles = makeStyles(styles);

const propTypes = {
  description: PropTypes.string.isRequired,
};

const defaultProps = {
  description: "",
};

const DescriptionCard = ({ description }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <CardContainer
        title={t(
          `pages.shareholding.resolutions.${
            description ? "description" : "noDescription"
          }`
        )}
      >
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className={classes.description}
        ></div>
      </CardContainer>
    </div>
  );
};

DescriptionCard.propTypes = propTypes;
DescriptionCard.defaultProps = defaultProps;

export default DescriptionCard;
