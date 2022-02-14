import Loading from "@common/Loading"
import Modal from "@common/Modal";
import {
  Fab,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
//import { useMutation, useQuery } from "@services/graphql/resolutions";
//import { loader } from "graphql.macro";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NewProAndCon from "./NewProAndCon";
import ProAndCon from "./ProAndCon";
import styles from "./prosAndCons.css";
import ProsAndConsList from "./ProsAndConsList";

const ARGUMENTS_QUERY = loader("./arguments.gql");
const CREATE_ARGUMENT_MUTATION = loader("./createArgument.gql");
const CREATE_ARGUMENT_VOTE_MUTATION = loader("./createArgumentVote.gql");
const DESTROY_ARGUMENT_VOTE_MUTATION = loader("./destroyArgumentVote.gql");
const UPDATE_ARGUMENT_VOTE_MUTATION = loader("./updateArgumentVote.gql");

const useStyles = makeStyles(styles);

const ProsAndCons = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const params = useParams();
  const currentMember = useSelector((state) => state.currentUser.member);

  const { loading, data, refetch } = useQuery(ARGUMENTS_QUERY, {
    organizationId: currentMember.organization.id,
    id: params.id,
  });

  const [createArgument] = useMutation(CREATE_ARGUMENT_MUTATION);
  const [createArgumentVote] = useMutation(CREATE_ARGUMENT_VOTE_MUTATION);
  const [destroyArgumentVote] = useMutation(DESTROY_ARGUMENT_VOTE_MUTATION);
  const [updateArgumentVote] = useMutation(UPDATE_ARGUMENT_VOTE_MUTATION);

  const resolution = data?.organization?.resolution;
  const argumentsPro = resolution?.argumentsPro?.items || [];
  const argumentsCon = resolution?.argumentsCon?.items || [];
  const officialsPro = resolution?.officialsPro?.items || [];
  const officialsCon = resolution?.officialsCon?.items || [];

  const [open, setOpen] = useState(false);

  const saveArgument = useCallback(
    async ({ title, pro, content }) => {
      await createArgument({
        variables: {
          argument: {
            resolutionId: resolution.id,
            memberId: currentMember.id,
            title,
            pro,
            content,
          },
        },
      });

      refetch();
    },
    [resolution, createArgument, currentMember, refetch]
  );

  const saveArgumentVote = useCallback(
    ({ argumentId, value, isNew }) => {
      const args = {
        variables: {
          argumentVote: {
            argumentId,
            value,
          },
        },
      };

      if (isNew) {
        createArgumentVote(args);
      } else {
        updateArgumentVote(args);
      }

      refetch();
    },
    [createArgumentVote, updateArgumentVote, refetch]
  );

  const cancelArgumentVote = useCallback(
    async (argumentId) => {
      await destroyArgumentVote({ variables: { argumentId } });

      refetch();
    },
    [destroyArgumentVote, refetch]
  );

  const handleVoteUpdate = useCallback(
    (argument, voteValue) => {
      const currentVote = argument.memberCurrentVote;

      if (currentVote === undefined || currentVote === null) {
        saveArgumentVote({
          argumentId: argument.id,
          value: voteValue,
          isNew: true,
        });
      } else {
        if (currentVote === voteValue) {
          cancelArgumentVote(argument.id);
        } else {
          saveArgumentVote({
            argumentId: argument.id,
            value: voteValue,
            isNew: false,
          });
        }
      }
    },
    [saveArgumentVote, cancelArgumentVote]
  );

  const [radio, setRadio] = useState("all");

  const renderArguments = () => {
    var args;
    switch (radio) {
      case "pro":
        args = argumentsPro;
        break;
      case "con":
        args = argumentsCon;
        break;
      default:
        args = [...argumentsPro, ...argumentsCon].sort((a, b) =>
          a.updatedAt > b.updatedAt ? a : b
        );
        break;
    }

    return args.map((argument, index) => (
      <div key={index} className={classes.paper}>
        <ProAndCon
          resolutionAuthorId={resolution.author.id}
          proAndCon={argument}
          onVoteUpdate={handleVoteUpdate}
        />
      </div>
    ));
  };

  const handleArgumentTypeValueChange = (event) => {
    setRadio(event.target.value);
  };

  const renderRadio = () => (
    <Grid
      className={classes.radio}
      container
      direction="column"
      justify="flex-end"
      alignItems="flex-end"
    >
      <RadioGroup
        row
        defaultValue="all"
        onChange={handleArgumentTypeValueChange}
      >
        <FormControlLabel
          labelPlacement="start"
          value="pro"
          control={<Radio />}
          label={t("pages.shareholding.resolutions.pro")}
        />
        <FormControlLabel
          labelPlacement="start"
          value="con"
          control={<Radio />}
          label={t("pages.shareholding.resolutions.con")}
        />
        <FormControlLabel
          labelPlacement="start"
          value="all"
          control={<Radio />}
          label={t("pages.shareholding.resolutions.all")}
        />
      </RadioGroup>
    </Grid>
  );

  const renderNewProsAndConsButton = () => (
    <Fab
      color="secondary"
      onClick={() => setOpen(!open)}
      className={classes.fab}
    >
      <AddIcon />
    </Fab>
  );

  const handleArgumentPropose = useCallback(
    (newProAndCon) => {
      saveArgument(newProAndCon);
      setOpen(false);
    },
    [saveArgument, setOpen]
  );

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const renderNewProsAndConsModal = () => (
    <Modal open={open} size="sm">
      <NewProAndCon onPropose={handleArgumentPropose} onCancel={handleCancel} />
    </Modal>
  );

  return loading && !data ? (
    <Loading />
  ) : (
    <React.Fragment>
      <div className={classes.container}>
        <ProsAndConsList
          resolutionAuthorId={resolution.author.id}
          pros={officialsPro}
          cons={officialsCon}
          onVoteUpdate={handleVoteUpdate}
        />

        {renderRadio()}
        {renderArguments()}
      </div>
      {renderNewProsAndConsModal()}
      {renderNewProsAndConsButton()}
    </React.Fragment>
  );
};

export default ProsAndCons;
