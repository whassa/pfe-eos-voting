import Loading from "@common/Loading";
import { Card, CardContent } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
//import { useQuery } from "@services/graphql/resolutions";
//import { loader } from "graphql.macro";
import moment from "moment";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useStyles from "./statistics.css";

const STATISTICS_QUERY = loader("./statistics.gql");

function valueOverTime(votesList, voteType) {
  let voteData = {
    x: [],
    y: [],
  };
  let nbrOfVotes = 0;
  votesList.items.forEach((vote) => {
    if (vote.value === voteType) {
      nbrOfVotes++;
      const newVote = {
        x: moment(vote.updatedAt).valueOf(),
        y: nbrOfVotes,
      };
      voteData.x.push(newVote.x);
      voteData.y.push(newVote.y);
    }
  });
  const lastVote = votesList.items[votesList.items.length - 1];
  if (lastVote && lastVote?.value !== voteType) {
    voteData.x.push(moment(lastVote.updatedAt).valueOf());
    voteData.y.push(nbrOfVotes);
  }
  return voteData;
}

const Statistics = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const params = useParams();
  const { organization } = useSelector((state) => state.currentUser.member);

  const [options, setOptions] = useState();
  const [series, setSeries] = useState();
  const [nbOfMembers, setNbOfMembers] = useState(0);

  const { loading, data } = useQuery(
    STATISTICS_QUERY,
    {
      organizationId: organization.id,
      id: params.id,
    },
    {
      onCompleted: (data) => {
        const resolution = data?.organization?.resolution;

        setOptions({
          xaxis: {
            type: "datetime",
            categories: valueOverTime(resolution.votes, true).x,
          },
          stroke: {
            curve: "smooth",
          },
        });

        setSeries([
          {
            name: t("utils.yes"),
            data: valueOverTime(resolution.votes, true).y,
          },
          {
            name: t("utils.no"),
            data: valueOverTime(resolution.votes, false).y,
          },
        ]);

        setNbOfMembers(resolution.members?.totalCount || 0);
      },
    }
  );

  const resolution = data?.organization?.resolution;

  const threshold =
    resolution?.customThreshold || resolution?.category?.threshold?.value || 70;

  const votesInFavor = () => {
    let nbrOfYes = 0;
    resolution.votes.items.forEach((vote) => {
      if (vote.value) {
        nbrOfYes++;
      }
    });
    return nbrOfYes;
  };

  return loading || !data || !options || !series ? (
    <Loading />
  ) : (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4}>
          <Card className={classes.cards}>
            <CardHeader
              title={t("pages.shareholding.resolutions.totalVotes")}
            />
            <CardContent>
              <div>
                <span className={classes.bigNumber}>
                  {resolution.votes.totalCount}
                </span>
                <div className={classes.subNumber}>
                  <div className={classes.voteElement}>
                    <span>{t("utils.yes")}</span>
                    <span className={classes.number}>{votesInFavor()}</span>
                  </div>
                  <div className={classes.voteElement}>
                    <span>{t("utils.no")}</span>
                    <span className={classes.number}>
                      {resolution.votes.totalCount - votesInFavor()}
                    </span>
                  </div>
                  <div className={classes.voteElement}>
                    <span>{t("utils.abstain")}</span>
                    <span className={classes.number}>0</span>{" "}
                    {/*TODO est-ce qu'on a vrm besoin de cette propriété là?*/}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card className={classes.cards}>
            <CardHeader
              title={t("pages.shareholding.resolutions.voteMargin")}
            />
            <CardContent>
              <div>
                <span className={classes.bigNumber}>{threshold + " %"}</span>
                <div className={classes.subNumber}>
                  <span className={classes.numberSentence}>
                    {Math.ceil((threshold / 100) * nbOfMembers)}{" "}
                    {t("pages.shareholding.resolutions.votesToPass")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card className={classes.cards}>
            <CardHeader
              title={t("pages.shareholding.resolutions.remainingDays")}
            />
            <CardContent>
              <div>
                <span className={classes.bigNumber}>
                  {moment(resolution.expireAt).diff(moment(), "days")}
                </span>
                <div className={classes.subNumber}>
                  <span className={classes.numberSentence}>
                    {moment(resolution.expireAt).format("LLL")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={t("pages.shareholding.resolutions.voteTracker")}
            />
            <CardContent>
              <Chart
                options={options}
                series={series}
                type="line"
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Statistics;
