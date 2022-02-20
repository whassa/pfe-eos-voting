import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
//import { useMutation } from "@services/graphql/resolutions";
//import { loader } from "graphql.macro";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import styles from "./newVote.css";
const CREATE_VOTE_MUTATION = loader("./createVote.gql");

const useStyles = makeStyles(styles);

const propTypes = {
  resolutionName: PropTypes.string.isRequired,
  resolutionId: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired,
};

const NewVote = ({ resolutionName, resolutionId, onVote, onExit }) => {
  const classes = useStyles();
  const currentMember = useSelector((state) => state.currentUser.member);

  const [createVote] = useMutation(CREATE_VOTE_MUTATION);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [isError, setIsError] = useState(false);
  const { t } = useTranslation();

  const handleVote = (vote) => {
    setIsLoading(true);
    createVote({
      variables: {
        vote: {
          resolutionId,
          memberId: currentMember.id,
          value: vote,
        },
      },
    })
      .then((result) => {
        setIsLoading(false);
        if (result?.data?.createVote?.errors) {
          setIsError(true);
        } else {
          setIsVoted(true);
          onVote();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.error(error);
      });
  };

  const voteForm = (
    <div className={classes.voteContainer}>
      <Typography variant={"h6"} className={classes.secondaryText}>
        {t("pages.shareholding.resolutions.answer").toUpperCase()}
      </Typography>
      <div className={classes.voteTable}>
        <div className={classes.voteRow} onClick={() => handleVote(true)}>
          <Typography variant={"h6"}>{t("utils.approve")}</Typography>
        </div>
        <div className={classes.voteRow} onClick={() => handleVote(false)}>
          <Typography variant={"h6"}>{t("utils.refuse")}</Typography>
        </div>
        <div className={classes.voteRow} onClick={() => handleVote(null)}>
          <Typography variant={"h6"}>{t("utils.abstain")}</Typography>
        </div>
      </div>
    </div>
  );

  const errorBody = (
    <div className={classes.voteMessageContainer}>
      <ErrorIcon className={classes.voteMessageIcon} />
      <Typography variant={"body1"}>
        {t("pages.shareholding.resolutions.errorSendingVote")}
      </Typography>
      <Typography
        variant={"body2"}
        className={classes.underlined}
        onClick={onExit}
      >
        {t("utils.close")}
      </Typography>
    </div>
  );

  const confirmBody = (
    <div className={classes.voteMessageContainer}>
      <CheckCircleIcon
        className={`${classes.voteMessageIcon} ${classes.confirmColor}`}
      />
      <Typography variant={"body1"}>
        {t("pages.shareholding.resolutions.confirm")}
      </Typography>
      <Typography
        variant={"body2"}
        className={classes.underlined}
        onClick={onExit}
      >
        {t("utils.close")}
      </Typography>
    </div>
  );

  const loadingBody = (
    <div className={classes.voteContainer}>
      <CircularProgress color="secondary" />
    </div>
  );

  return (
    <div onClick={onExit} className={classes.modalContainer}>
      <div className={classes.closeIcon}>
        <CloseIcon color={"inherit"} onClick={onExit} />
      </div>
      <div
        className={classes.modalBody}
        onClick={(event) => event.stopPropagation()}
      >
        <Typography variant={"h6"} className={classes.secondaryText}>
          {t("pages.shareholding.resolutions.voteFor").toUpperCase()}
        </Typography>
        <Typography variant={"h2"}>{resolutionName}</Typography>
        {isError
          ? errorBody
          : isLoading
          ? loadingBody
          : isVoted
          ? confirmBody
          : voteForm}
      </div>
    </div>
  );
};
NewVote.propTypes = propTypes;

export default NewVote;
