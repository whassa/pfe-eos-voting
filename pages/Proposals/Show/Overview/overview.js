import Loading from "@common/Loading";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/material/styles";
//import { useQuery } from "@services/graphql/resolutions";
//import { loader } from "graphql.macro";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import AuthorCard from "./AuthorCard";
import DescriptionCard from "./DescriptionCard";
import IntegrityCheck from "./IntegrityCheck";
import styles from "./overview.css";
import ProposalDetails from "./ProposalDetails";
import ResolutionMembers from "./ResolutionMembers";
const OVERVIEW_QUERY = loader("./overview.gql");

const useStyles = makeStyles(styles);

const getDetailsFromProposal = ({
  createdAt,
  expireAt,
  customThreshold,
  category,
}) => {
  const createdDate = moment(createdAt).format("YYYY-MM-DD");
  const expiredDate = moment(expireAt).format("YYYY-MM-DD");

  return [
    { name: "Created On", value: createdDate },
    { name: "Expiration Date", value: expiredDate },
    {
      name: "Threshold",
      value: (customThreshold || category?.threshold?.value || 70) + " %",
    },
  ];
};

const Overview = () => {
  const classes = useStyles();
  const params = useParams();
  const { organization } = useSelector((state) => state.currentUser.member);

  const { loading, data } = useQuery(OVERVIEW_QUERY, {
    organizationId: organization.id,
    id: params.id,
  });

  const resolution = data?.organization?.resolution;

  return loading || !data ? (
    <Loading />
  ) : (
    <Grid container spacing={3}>
      <Grid item sm={9}>
        <DescriptionCard description={resolution.content} />
      </Grid>
      <Grid item sm={3} className={classes.info}>
        <AuthorCard
          author={resolution.author}
          accountable={resolution.accountable}
        />
        <ProposalDetails details={getDetailsFromProposal(resolution)} />
        <IntegrityCheck integrity={resolution.integrity} />
        <ResolutionMembers resolution={resolution} />
      </Grid>
    </Grid>
  );
};

export default Overview;
