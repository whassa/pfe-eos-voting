
import Loading  from "@common/Loading";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
//import { useMutation, useQuery } from "@services/graphql/resolutions";
//import { useFormik } from "formik";
//import { loader } from "graphql.macro";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as yup from "yup";

import CreateNewsForm from "./CreateNewsForm";
import useStyles from "./news.css";
import NewsCard from "./NewsCard";

const NEWS_QUERY = loader("./news.gql");
const CREATE_NEWS_MUTATION = loader("./createNews.gql");

const News = () => {
  const classes = useStyles();
  const params = useParams();
  const currentMember = useSelector((state) => state.currentUser.member);

  const { loading, data, refetch } = useQuery(NEWS_QUERY, {
    organizationId: currentMember.organization.id,
    id: params.id,
  });

  const resolution = data?.organization?.resolution;
  const news = resolution?.news?.items || [];

  const [newsCreationFormOpen, setNewsCreationFormOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setIsCreating(false);
  }, [setIsCreating]);

  const [createNews] = useMutation(CREATE_NEWS_MUTATION);

  const handleClose = () => {
    setNewsCreationFormOpen(false);
  };

  const handleReset = (resetForm) => {
    handleClose();
    resetForm();
  };

  const initialValues = () => ({
    title: "",
    content: "",
    url: "",
  });

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
    url: yup.string().url("Must be a valid URL"),
  });

  const handleSubmit = async (values, actions) => {
    setIsCreating(true);
    try {
      const result = await createNews({
        variables: {
          news: {
            resolutionId: resolution.id,
            memberId: currentMember.id,
            title: values.title,
            content: values.content,
            url: values.url,
          },
        },
      });
      setIsCreating(false);
      if (result.data.createNews.news) {
        handleReset(actions.resetForm);
        refetch();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  return loading && !data ? (
    <Loading />
  ) : (
    <React.Fragment>
      <Grid container className={classes.root} spacing={3}>
        {news.map((item, index) => (
          <NewsCard news={item} key={index} />
        ))}
      </Grid>
      <Fab
        size="medium"
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={() => setNewsCreationFormOpen(true)}
      >
        <AddIcon />
      </Fab>
      <CreateNewsForm
        {...formik}
        isCreating={isCreating}
        open={newsCreationFormOpen}
        onCancel={handleReset}
      />
    </React.Fragment>
  );
};

export default News;
