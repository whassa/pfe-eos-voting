import CardContainer from "@common/Cards/CardContainer";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./ProposalTransactionId.css";

const useStyles = makeStyles(styles);

const propTypes = {
  transactionId: PropTypes.string.isRequired,
};

const ProposalTransactionId = ({ transactionId }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <CardContainer title={t("pages.shareholding.resolutions.transactionId")}>
      <div className={classes.id}>{transactionId}</div>
    </CardContainer>
  );
};

ProposalTransactionId.propTypes = propTypes;

export default ProposalTransactionId;
