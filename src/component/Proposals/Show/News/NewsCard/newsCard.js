import { Card, CardContent } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import moment from "moment";
import React from "react";
import { ReactTinyLink } from "react-tiny-link";

import useStyles from "./newsCard.css";

const NewsCard = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title={props.news.title}
          subheader={moment(props.news.updatedAt).format("MM-DD-YYYY")}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.cardDescription}
            dangerouslySetInnerHTML={{ __html: props.news.content }}
          />
          {props.news.url && props.news.url !== "" ? (
            <ReactTinyLink
              cardSize="small"
              showGraphic={true}
              maxLine={2}
              minLine={1}
              url={props.news.url.toString()}
            />
          ) : null}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NewsCard;
